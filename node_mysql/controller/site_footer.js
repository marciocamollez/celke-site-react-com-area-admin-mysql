var express = require('express');
var router = express.Router();

const Footer = require('../models/Footer');

router.get('/view-footer', async (req, res) => {
    await Footer.findOne()
        .then((dataFooter) => {
            return res.json({
                erro: false,
                dataFooter
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum valor encontrado para o rodapé!"
            });
        })
});

router.post('/add-footer', async (req, res) => {

    const dataFooter = await Footer.findOne();

    if (dataFooter) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Não cadastrado com sucesso, o rodapé possui um registro!"
        });
    }

    await Footer.create(req.body)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Dados para o rodapé cadastrado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Dados para o rodapé não cadastrado com sucesso!!"
            });
        });
});

module.exports = router;