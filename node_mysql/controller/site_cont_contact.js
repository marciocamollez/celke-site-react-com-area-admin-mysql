var express = require('express');
var router = express.Router();

const yup = require('yup');

const { eAdmin } = require('../middlewares/auth');

const ContentContact = require('../models/ContentContact');
const Footer = require('../models/Footer');
const Seo = require('../models/Seo');

router.get('/view-content-contact', async (req, res) => {

    const dataSeo = await Seo.findOne({
        attributes: ['description', 'title'],
        where: { page: "contato" }
    });

    const dataFooter = await Footer.findOne({
        attributes: ['footer_desc', 'footer_text_link', 'footer_link']
    });

    await ContentContact.findOne()
        .then((dataContact) => {
            return res.json({
                erro: false,
                dataContact,
                dataFooter,
                dataSeo
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum valor encontrado para a página contato!"
            });
        })
});

router.get('/view-cont-contact-adm', async (req, res) => {

    await ContentContact.findOne()
        .then((dataContact) => {
            return res.json({
                erro: false,
                dataContact
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum valor encontrado para a página contato!"
            });
        })
});

router.post('/add-content-contact', async (req, res) => {
    await ContentContact.create(req.body)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Dados para página contato cadastrado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Dados para página contato não cadastrado com sucesso!"
            });
        });
});

router.put("/edit-content-contact", eAdmin, async (req, res) => {

    const schema = yup.object().shape({
        title_contact: yup.string("Erro: Necessário preencher o campo título!")
            .required("Erro: Necessário preencher o campo título!"),
        desc_contact: yup.string("Erro: Necessário preencher o campo descrição!")
            .required("Erro: Necessário preencher o campo descrição!"),
        icon_company: yup.string("Erro: Necessário preencher o campo ícone da empresa!")
            .required("Erro: Necessário preencher o campo ícone da empresa!"),
        title_company: yup.string("Erro: Necessário preencher o campo título da empresa!")
            .required("Erro: Necessário preencher o campo título da empresa!"),
        desc_company: yup.string("Erro: Necessário preencher o campo descrição da empresa!")
            .required("Erro: Necessário preencher o campo descrição da empresa!"),
        icon_address: yup.string("Erro: Necessário preencher o campo ícone do endereço!")
            .required("Erro: Necessário preencher o campo ícone do endereço!"),
        title_address: yup.string("Erro: Necessário preencher o campo título do endereço!")
            .required("Erro: Necessário preencher o campo título do endereço!"),
        desc_address: yup.string("Erro: Necessário preencher o campo descrição do endereço!")
            .required("Erro: Necessário preencher o campo descrição do endereço!"),
        icon_email: yup.string("Erro: Necessário preencher o campo ícone do e-mail!")
            .required("Erro: Necessário preencher o campo ícone do e-mail!"),
        title_email: yup.string("Erro: Necessário preencher o campo título do e-mail!")
            .required("Erro: Necessário preencher o campo título do e-mail!"),
        desc_email: yup.string("Erro: Necessário preencher o campo descrição do e-mail!")
            .required("Erro: Necessário preencher o campo descrição do e-mail!"),
        title_form: yup.string("Erro: Necessário preencher o campo título do formulário!")
            .required("Erro: Necessário preencher o campo título do formulário!")
    });

    try {
        await schema.validate(req.body);
    } catch (err) {
        return res.status(400).json({
            erro: true,
            mensagem: err.errors
        });
    }

    const contentContact = await ContentContact.findOne({
        attributes: ['id']
    });

    if (!(contentContact)) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhum registro encontrado!"
        });
    }

    await ContentContact.update(req.body, { where: { id: contentContact.id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Dados da página de contato editado com sucesso!"
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Dados da página de contato não editado com sucesso!"
            });
        });
});

module.exports = router;