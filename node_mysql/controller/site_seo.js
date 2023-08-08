var express = require('express');
var router = express.Router();

const Seo = require('../models/Seo');

router.get('/list-seo', async (req, res) => {

    await Seo.findAll({
        order: [['id', 'DESC']]
    })
        .then((seos) => {
            return res.json({
                erro: false,
                seos
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum valor encontrado para o seo das páginas!"
            });
        })
});

router.post('/add-seo', async (req, res) => {
    await Seo.create(req.body)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Dados para o seo da página cadastrado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Dados para o seo da página cadastrado com sucesso!"
            });
        });
});

module.exports = router;