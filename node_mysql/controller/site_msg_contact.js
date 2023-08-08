var express = require('express');
var router = express.Router();

const yup = require('yup');

const { eAdmin } = require('../middlewares/auth');

const MsgContact = require('../models/MsgContact');

router.get('/list-msg-contact/:page', async (req, res) => {
    const { page = 1 } = req.params;
    const limit = 40;
    var lastPage = 1;

    const countMsgContact = await MsgContact.count();
    if (countMsgContact === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhuma mensagem de contato encontrada!"
        });
    } else {
        lastPage = Math.ceil(countMsgContact / limit);
    }

    await MsgContact.findAll({
        attributes: ['id', 'name', 'email', 'subject'],
        order: [['id', 'DESC']],
        offset: Number((page * limit) - limit),
        limit: limit
    })
        .then((msgContacts) => {
            return res.json({
                erro: false,
                msgContacts,
                countMsgContact,
                lastPage
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhuma mensagem de contato encontrada!"
            });
        });
});

router.get("/msg-contact/:id", eAdmin, async (req, res) => {
    const { id } = req.params;

    await MsgContact.findByPk(id)
        .then((msgContact) => {
            return res.json({
                erro: false,
                msgContact
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhuma mensagem de contato encontrada!"
            });
        });
});

router.post('/add-msg-contact', async (req, res) => {

    const schema = yup.object().shape({
        content: yup.string("Erro: Necessário preencher o campo conteúdo!")
            .required("Erro: Necessário preencher o campo conteúdo!"),
        subject: yup.string("Erro: Necessário preencher o campo assunto!")
            .required("Erro: Necessário preencher o campo assunto!"),
        email: yup.string("Erro: Necessário preencher o campo e-mail!")
            .required("Erro: Necessário preencher o campo e-mail!")
            .email("Erro: Necessário preencher o campo com e-mail válido!"),
        name: yup.string("Erro: Necessário preencher o campo nome!")
            .required("Erro: Necessário preencher o campo nome!")
    });

    try {
        await schema.validate(req.body);
    } catch (err) {
        return res.status(400).json({
            erro: true,
            mensagem: err.errors
        })
    }

    await MsgContact.create(req.body)
        .then((msgContact) => {
            return res.json({
                id: msgContact.id,
                erro: false,
                mensagem: "Mensagem de contato enviando com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Mensagem de contato não enviando com sucesso!"
            });
        });
});

router.put("/edit-msg-contact", eAdmin, async (req, res) => {
    const { id } = req.body;

    const schema = yup.object().shape({
        content: yup.string("Erro: Necessário preencher o campo conteúdo!")
            .required("Erro: Necessário preencher o campo conteúdo!"),
        subject: yup.string("Erro: Necessário preencher o campo assunto!")
            .required("Erro: Necessário preencher o campo assunto!"),
        email: yup.string("Erro: Necessário preencher o campo e-mail!")
            .required("Erro: Necessário preencher o campo e-mail!")
            .email("Erro: Necessário preencher o campo com e-mail válido!"),
        name: yup.string("Erro: Necessário preencher o campo nome!")
            .required("Erro: Necessário preencher o campo nome!")
    });

    try {
        await schema.validate(req.body);
    } catch (err) {
        return res.status(400).json({
            erro: true,
            mensagem: err.errors
        });
    }

    await MsgContact.update(req.body, { where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Mensagem de contato editado com sucesso!"
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Mensagem de contato não editado com sucesso!"
            });
        });
});

router.delete("/msg-contact/:id", eAdmin, async (req, res) => {
    const { id } = req.params;

    await MsgContact.destroy({ where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Mensagem de contato apagado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Mensagem de contato não apagado com sucesso!"
            });
        });
});

module.exports = router;