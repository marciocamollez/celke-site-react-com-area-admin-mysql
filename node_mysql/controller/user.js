const express = require("express");
var router = express.Router();

const yup = require('yup');
const { Op } = require("sequelize");

const bcrypt = require('bcryptjs');
const fs = require('fs');

const { eAdmin } = require('../middlewares/auth');

const User = require('../models/User');

const upload = require('../middlewares/uploadImgProfile');

router.get("/users/:page", eAdmin, async (req, res) => {
    const { page = 1 } = req.params;
    const limit = 40;
    var lastPage = 1;

    const countUser = await User.count();
    if (countUser === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhum usuário encontrado!"
        });
    } else {
        lastPage = Math.ceil(countUser / limit);
    }

    await User.findAll({
        attributes: ['id', 'name', 'email'],
        order: [['id', 'DESC']],
        offset: Number((page * limit) - limit),
        limit: limit
    })
        .then((users) => {
            return res.json({
                erro: false,
                users,
                countUser,
                lastPage
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum usuário encontrado!"
            });
        });
});

router.get("/user/:id", eAdmin, async (req, res) => {
    const { id } = req.params;

    //await User.findAll({ where: { id: id } })
    await User.findByPk(id)
        .then((user) => {
            if(user.image){
                var endImage = process.env.URL_IMG + "/files/users/" + user.image;
            }else{
                var endImage = process.env.URL_IMG + "/files/users/icone_usuario.png";
            }
            return res.json({
                erro: false,
                user: user,
                endImage
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum usuário encontrado!"
            });
        });
});

router.post("/user", eAdmin, async (req, res) => {
    var dados = req.body;

    const schema = yup.object().shape({
        password: yup.string("Erro: Necessário preencher o campo senha!")
            .required("Erro: Necessário preencher o campo senha!")
            .min(6, "Erro: A senha deve ter no mínimo 6 caracteres!"),
        email: yup.string("Erro: Necessário preencher o campo e-mail!")
            .email("Erro: Necessário preencher o campo e-mail!")
            .required("Erro: Necessário preencher o campo e-mail!"),
        name: yup.string("Erro: Necessário preencher o campo nome!")
            .required("Erro: Necessário preencher o campo nome!")
    });

    try {
        await schema.validate(dados);
    } catch (err) {
        return res.status(400).json({
            erro: true,
            mensagem: err.errors
        });
    }

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if (user) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Este e-mail já está cadastrado!"
        });
    }

    dados.password = await bcrypt.hash(dados.password, 8);

    await User.create(dados)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Usuário cadastrado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuário não cadastrado com sucesso!"
            });
        });
});

router.put("/user", eAdmin, async (req, res) => {
    const { id } = req.body;

    const schema = yup.object().shape({
        /*password: yup.string("Erro: Necessário preencher o campo senha!")
            .required("Erro: Necessário preencher o campo senha!")
            .min(6, "Erro: A senha deve ter no mínimo 6 caracteres!"),*/
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
                mensagem: "Usuário editado com sucesso!"
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuário não editado com sucesso!"
            });
        });
});

router.put("/user-senha", eAdmin, async (req, res) => {
    const { id, password } = req.body;

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

router.delete("/user/:id", eAdmin, async (req, res) => {
    const { id } = req.params;

    await User.destroy({ where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Usuário apagado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuário não apagado com sucesso!"
            });
        });
});

router.put('/edit-user-image/:id', eAdmin, upload.single('image'), async (req, res) => {
    if(req.file){
        const { id } = req.params;

        await User.findByPk(id)
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
                mensagem: "Erro: Usuário não encontrado!"
            });
        });

        await User.update({image: req.file.filename}, { where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Imagem do usuário editado com sucesso!",
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Imagem do usuário não editado com sucesso!"
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