var express = require('express');
var router = express.Router();

const yup = require('yup');
const fs = require('fs');

const { eAdmin } = require('../middlewares/auth');

const Home = require('../models/Home');
const Footer = require('../models/Footer');
const Seo = require('../models/Seo');

const upload = require('../middlewares/uploadImgHomeTop');

router.get('/view-home', async (req, res) => {

    const dataSeo = await Seo.findOne({
        attributes: ['description', 'title'],
        where: { page: "home" }
    });

    const dataFooter = await Footer.findOne({
        attributes: ['footer_desc', 'footer_text_link', 'footer_link']
    });

    await Home.findOne()
        .then((dataHome) => {
            return res.json({
                erro: false,
                dataHome,
                dataFooter,
                dataSeo,
                urlImage: "http://localhost:8080/files/home/"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum valor encontrado para a página home!"
            });
        })
});

router.get('/view-home-adm', eAdmin, async (req, res) => {

    await Home.findOne()
        .then((dataHome) => {
            return res.json({
                erro: false,
                dataHome,
                urlImage: "http://localhost:8080/files/home/"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum valor encontrado para a página home!"
            });
        })
});

router.get('/view-home-img-adm', eAdmin, async (req, res) => {

    await Home.findOne()
        .then((dataHome) => {
            if (dataHome.image_top) {
                var endImage = process.env.URL_IMG + "/files/home/" + dataHome.image_top;
            } else {
                var endImage = process.env.URL_IMG + "/files/home/default_top_home.jpg";
            }

            return res.json({
                erro: false,
                endImage,
                dataHome
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum valor encontrado para a página home!"
            });
        })
});

router.post('/add-home', async (req, res) => {

    const dataHome = await Home.findOne();

    if (dataHome) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Não cadastrado com sucesso, a página home possui um registro!"
        });
    }

    await Home.create(req.body)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Dados para página home cadastrado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Dados para página home não cadastrado com sucesso!"
            });
        });
});

router.put("/edit-home", eAdmin, async (req, res) => {

    const schema = yup.object().shape({
        title_top_one: yup.string("Erro: Necessário preencher o campo título um!")
            .required("Erro: Necessário preencher o campo título um!"),
        title_top_two: yup.string("Erro: Necessário preencher o campo título dois!")
            .required("Erro: Necessário preencher o campo título dois!"),
        title_top_three: yup.string("Erro: Necessário preencher o campo título três!")
            .required("Erro: Necessário preencher o campo título três!"),
        btn_text_top: yup.string("Erro: Necessário preencher o campo texto do botão do topo!")
            .required("Erro: Necessário preencher o campo texto do botão do topo!"),
        btn_link_top: yup.string("Erro: Necessário preencher o campo link do botão do topo!")
            .required("Erro: Necessário preencher o campo link do botão do topo!"),
        ser_title: yup.string("Erro: Necessário preencher o campo título dos serviços!")
            .required("Erro: Necessário preencher o campo título dos serviços!"),
        ser_title_one: yup.string("Erro: Necessário preencher o campo título do serviço um!")
            .required("Erro: Necessário preencher o campo título do serviço um!"),
        ser_icon_one: yup.string("Erro: Necessário preencher o campo ícone do serviço um!")
            .required("Erro: Necessário preencher o campo ícone do serviço um!"),
        ser_desc_one: yup.string("Erro: Necessário preencher o campo descrição do serviço um!")
            .required("Erro: Necessário preencher o campo descrição do serviço um!"),
        ser_title_two: yup.string("Erro: Necessário preencher o campo título do serviço dois!")
            .required("Erro: Necessário preencher o campo título do serviço dois!"),
        ser_icon_two: yup.string("Erro: Necessário preencher o campo ícone do serviço dois!")
            .required("Erro: Necessário preencher o campo ícone do serviço dois!"),
        ser_desc_two: yup.string("Erro: Necessário preencher o campo descrição do serviço dois!")
            .required("Erro: Necessário preencher o campo descrição do serviço dois!"),
        ser_title_three: yup.string("Erro: Necessário preencher o campo título do serviço três!")
            .required("Erro: Necessário preencher o campo título do serviço três!"),
        ser_icon_three: yup.string("Erro: Necessário preencher o campo ícone do serviço três!")
            .required("Erro: Necessário preencher o campo ícone do serviço três!"),
        ser_desc_three: yup.string("Erro: Necessário preencher o campo descrição do serviço três!")
            .required("Erro: Necessário preencher o campo descrição do serviço três!"),
        title_ser_prem: yup.string("Erro: Necessário preencher o campo título do serviço premium!")
            .required("Erro: Necessário preencher o campo título do serviço premium!"),
        subtitle_ser_prem: yup.string("Erro: Necessário preencher o campo subtítulo do serviço premium!")
            .required("Erro: Necessário preencher o campo subtítulo do serviço premium!"),
        desc_ser_prem: yup.string("Erro: Necessário preencher o campo descrição do serviço premium!")
            .required("Erro: Necessário preencher o campo descrição do serviço premium!"),
        btn_text_ser_prem: yup.string("Erro: Necessário preencher o campo texto do botão do serviço premium!")
            .required("Erro: Necessário preencher o campo texto do botão do serviço premium!"),
        btn_link_ser_prem: yup.string("Erro: Necessário preencher o campo link do botão do serviço premium!")
            .required("Erro: Necessário preencher o campo link do botão do serviço premium!")
    });

    try {
        await schema.validate(req.body);
    } catch (err) {
        return res.status(400).json({
            erro: true,
            mensagem: err.errors
        });
    }

    const home = await Home.findOne({
        attributes: ['id']
    });

    if (!(home)) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhum registro encontrado!"
        });
    }

    await Home.update(req.body, { where: { id: home.id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Dados da página home editado com sucesso!"
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Dados da página home não editado com sucesso!"
            });
        });
});



router.put('/edit-home-image-top', eAdmin, upload.single('image'), async (req, res) => {
    if (req.file) {
        const home = await Home.findOne({
            attributes: ['id', 'image_top']
        });

        if ((home)) {
            const imgOld = "./public/upload/home/" + home.image_top;

            fs.access(imgOld, (err) => {
                if (!err) {
                    fs.unlink(imgOld, () => { });
                }
            });
        }

        await Home.update({ image_top: req.file.filename }, { where: { id: home.id } } )
            .then(() => {
                return res.json({
                    erro: false,
                    mensagem: "Imagem do topo da página home editado com sucesso!",
                });

            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Imagem do topo da página home não editado com sucesso!"
                });
            });
    } else {
        return res.status(400).json({
            erro: false,
            mensagem: "Erro: Selecione uma imagem válida JPEG ou PNG!"
        });
    }

});

module.exports = router;