var express = require('express');
var router = express.Router();

const yup = require('yup');
const { Op } = require("sequelize");

const bcrypt = require('bcryptjs');
const fs = require('fs');

const { eAdmin } = require('../middlewares/auth');

const User = require('../models/User');

const upload = require('../middlewares/uploadImgProfile');

router.get("/view-profile", eAdmin, async (req, res) => {
    const id = req.userId;

    await User.findByPk(id)
        .then((user) => {

            if(user.image){
                var endImage = process.env.URL_IMG + "/files/users/" + user.image;
            }else{
                var endImage = process.env.URL_IMG + "/files/users/icone_usuario.png";
            }
            

            return res.json({
                erro: false,
                user,
                endImage
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum usuário encontrado!"
            });
        });
});

router.put("/edit-profile", eAdmin, async (req, res) => {
    const id = req.userId;

    const schema = yup.object().shape({
        email: yup.string("Erro: Necessário preencher o campo e-mail!")
            .email("Erro: Necessário preencher o campo e-mail!")
            .required("Erro: Necessário preencher o campo e-mail!"),
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

    const user = await User.findOne({
        where: {
            email: req.body.email,
            id: {
                [Op.ne]: id
            }
        }
    });

    if (user) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Este e-mail já está cadastrado!"
        });
    }

    await User.update(req.body, { where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Perfil editado com sucesso!"
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Perfil não editado com sucesso!"
            });
        });
});

router.put("/edit-profile-password", eAdmin, async (req, res) => {
    const id = req.userId;
    const { password } = req.body;

    const schema = yup.object().shape({
        password: yup.string("Erro: Necessário preencher o campo senha!")
            .required("Erro: Necessário preencher o campo senha!")
            .min(6, "Erro: A senha deve ter no mínimo 6 caracteres!"),
    });

    try {
        await schema.validate(req.body);
    } catch (err) {
        return res.status(400).json({
            erro: true,
            mensagem: err.errors
        });
    }

    var senhaCrypt = await bcrypt.hash(password, 8);

    await User.update({ password: senhaCrypt }, { where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Senha editada com sucesso!"
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Senha não editada com sucesso!"
            });
        });
});



router.put('/edit-profile-image', eAdmin, upload.single('image'), async (req, res) => {
    if(req.file){

        await User.findByPk(req.userId)
        .then(user => {
            const imgOld = "./public/upload/users/" + user.dataValues.image;

            fs.access(imgOld, (err) => {
                if(!err){
                    fs.unlink(imgOld, () => {});
                }
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Perfil não encontrado!"
            });
        });

        await User.update({image: req.file.filename}, { where: { id: req.userId } })
        .then(() => {
            return res.json({ 
                erro: false,
                mensagem: "Imagem do perfil editado com sucesso!",
                image: process.env.URL_IMG + "/files/users/" + req.file.filename
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Imagem do perfil não editado com sucesso!"
            });
        });
    }else{
        return res.status(400).json({
            erro: false,
            mensagem: "Erro: Selecione uma imagem válida JPEG ou PNG!"
        });
    }
    
});

module.exports = router;