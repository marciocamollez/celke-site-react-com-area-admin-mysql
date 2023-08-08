import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import api from '../../config/configApi';

export const AddSiteMsgContact = () => {

    const [id, setId] = useState("");
    const [siteMsgContact, setSiteMsgContact] = useState({
        name: '',
        email: '',
        subject: '',
        content: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const valueInput = e => setSiteMsgContact({ ...siteMsgContact, [e.target.name]: e.target.value });

    const addSiteMsgContact = async e => {
        e.preventDefault();

        if (!(await validate())) return;

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        await api.post('/site-msg-contact/add-msg-contact', siteMsgContact, headers)
            .then((response) => {
                setId(response.data.id);
                //console.log(response.data.id);
                setStatus({
                    type: 'redSuccess',
                    mensagem: response.data.mensagem
                });
            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.mensagem
                    });
                } else {
                    setStatus({
                        type: 'error',
                        mensagem: "Erro: Tente novamente!"
                    });
                }
            });
    }

    async function validate() {
        let schema = yup.object().shape({
            name: yup.string("Erro: Necessário preencher o campo nome!")
                .required("Erro: Necessário preencher o campo nome!"),
            email: yup.string("Erro: Necessário preencher o campo e-mail!")
                .required("Erro: Necessário preencher o campo e-mail!"),
            subject: yup.string("Erro: Necessário preencher o campo assunto!")
                .required("Erro: Necessário preencher o campo assunto!"),
            content: yup.string("Erro: Necessário preencher o campo conteúdo!")
                .required("Erro: Necessário preencher o campo conteúdo!")
        });

        try {
            await schema.validate({
                name: siteMsgContact.name,
                email: siteMsgContact.email,
                subject: siteMsgContact.subject,
                content: siteMsgContact.content
            });
            return true;
        } catch (err) {
            setStatus({
                type: 'error',
                mensagem: err.errors
            });
            return false;
        }
    }

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="site-msg-contact" />


                <div className="wrapper">
                    <div className="row">

                        <div className="top-content-adm">
                            <span className="title-content">Cadastrar Mensagem</span>
                            <div className="top-content-adm-right">
                                <Link to="/list-site-msg-contact">
                                    <button type="button" className="btn-info">Listar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}

                            {status.type === 'redSuccess' ?
                                <Redirect to={{
                                    pathname: '/view-site-msg-contact/' + id,
                                    state: {
                                        type: "success",
                                        mensagem: status.mensagem
                                    }
                                }} />
                                : ""}
                        </div>

                        <div className="content-adm">
                            <form onSubmit={addSiteMsgContact} className="form-adm">

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Nome</label>
                                        <input type="text" name="name" id="name" className="input-adm" placeholder="Nome do cliente" onChange={valueInput} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">E-mail</label>
                                        <input type="email" name="email" id="email" className="input-adm" placeholder="E-mail do cliente" onChange={valueInput} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Assunto</label>
                                        <input type="text" name="subject" id="nasubjectme" className="input-adm" placeholder="Assunto da mensagem" onChange={valueInput} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Conteúdo</label>
                                        <input type="text" name="content" id="content" className="input-adm" placeholder="Conteúdo da mensagem" onChange={valueInput} />
                                    </div>
                                </div>

                                <button type="submit" className="btn-success">Cadastrar</button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};