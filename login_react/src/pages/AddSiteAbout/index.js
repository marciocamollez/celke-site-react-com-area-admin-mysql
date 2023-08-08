import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import api from '../../config/configApi';

export const AddSiteAbout = () => {

    const [id, setId] = useState("");
    const [siteAbout, setSiteAbout] = useState({
        title_about: '',
        desc_about: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const valueInput = e => setSiteAbout({ ...siteAbout, [e.target.name]: e.target.value });

    const addSiteAbout = async e => {
        e.preventDefault();

        if (!(await validate())) return;

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        await api.post('/site-about/add-about', siteAbout, headers)
            .then((response) => {
                setId(response.data.id);
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
            title_about: yup.string("Erro: Necessário preencher o campo título!")
                .required("Erro: Necessário preencher o campo título!"),
            desc_about: yup.string("Erro: Necessário preencher o campo descrição!")
                .required("Erro: Necessário preencher o campo descrição!")
        });

        try {
            await schema.validate({
                title_about: siteAbout.title_about,
                desc_about: siteAbout.desc_about
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
                <Sidebar active="site-about" />


                <div className="wrapper">
                    <div className="row">

                        <div className="top-content-adm">
                            <span className="title-content">Cadastrar Sobre Empresa</span>
                            <div className="top-content-adm-right">
                                <Link to="/list-site-about">
                                    <button type="button" className="btn-info">Listar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}

                            {status.type === 'redSuccess' ?
                                <Redirect to={{
                                    pathname: '/view-site-about/' + id,
                                    state: {
                                        type: "success",
                                        mensagem: status.mensagem
                                    }
                                }} />
                                : ""}
                        </div>

                        <div className="content-adm">
                            <form onSubmit={addSiteAbout} className="form-adm">

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Título</label>
                                        <input type="text" name="title_about" id="title_about" className="input-adm" placeholder="Título sobre empresa" onChange={valueInput} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Descrição</label>
                                        <input type="text" name="desc_about" id="desc_about" className="input-adm" placeholder="Descrição sobre empresa" onChange={valueInput} />
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