var express = require('express');
var router = express.Router();

const yup = require('yup');
const { eAdmin } = require('../middlewares/auth');

const About = require('../models/About');
const Footer = require('../models/Footer');
const Seo = require('../models/Seo');


router.get('/list-about', async (req, res) => {

    const dataSeo = await Seo.findOne({
        attributes: ['description', 'title'],
        where: { page: "sobre-empresa" }
    });

    const dataFooter = await Footer.findOne({
        attributes: ['footer_desc', 'footer_text_link', 'footer_link']
    });

    await About.findAll({
        attributes: ['id', 'title_about', 'desc_about', 'image_about'],
        order: [['id', 'DESC']]
    })
        .then((abouts) => {
            return res.json({
                erro: false,
                abouts,
                dataFooter,
                dataSeo,
                urlImage: "http://localhost:8080/files/home/"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum valor encontrado para a página sobre empresa!"
            });
        })
});

router.get('/list-about-adm/:page', async (req, res) => {
    const { page = 1 } = req.params;
    const limit = 40;
    var lastPage = 1;

    const countAbout = await About.count();
    if (countAbout === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhum registro sobre empresa encontrado!"
        });
    } else {
        lastPage = Math.ceil(countAbout / limit);
    }

    await About.findAll({
        attributes: ['id', 'title_about'],
        order: [['id', 'DESC']],
        offset: Number((page * limit) - limit),
        limit: limit
    })
        .then((abouts) => {
            return res.json({
                erro: false,
                abouts,
                countAbout,
                lastPage
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum registro sobre empresa encontrado!"
            });
        });
});

router.get("/about-adm/:id", eAdmin, async (req, res) => {
    const { id } = req.params;

    //await User.findAll({ where: { id: id } })
    await About.findByPk(id)
        .then((about) => {
            if (about.image_about) {
                var endImage = process.env.URL_IMG + "/files/about/" + about.image_about;
            } else {
                var endImage = process.env.URL_IMG + "/files/about/icon_about_company.jpg";
            }
            return res.json({
                erro: false,
                about,
                endImage
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum registro sobre empresa encontrado!"
            });
        });
});

router.post('/add-about', async (req, res) => {
    await About.create(req.body)
        .then((about) => {
            return res.json({
                id: about.id,
                erro: false,
                mensagem: "Dados para página sobre empresa cadastrado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Dados para página sobre empresa não cadastrado com sucesso!"
            });
        });
});

router.put("/edit-about", eAdmin, async (req, res) => {
    const { id } = req.body;

    const schema = yup.object().shape({
        title_about: yup.string("Erro: Necessário preencher o campo título!")
            .required("Erro: Necessário preencher o campo título!"),
        desc_about: yup.string("Erro: Necessário preencher o campo descrição!")
            .required("Erro: Necessário preencher o campo descrição!")
    });

    try {
        await schema.validate(req.body);
    } catch (err) {
        return res.status(400).json({
            erro: true,
            mensagem: err.errors
        });
    }

    await About.update(req.body, { where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Sobre empresa editado com sucesso!"
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Sobre empresa não editado com sucesso!"
            });
        });
});

router.delete("/about/:id", eAdmin, async (req, res) => {
    const { id } = req.params;

    await About.destroy({ where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Sobre empresa apagado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Sobre empresa não apagado com sucesso!"
            });
        });
});

module.exports = router;