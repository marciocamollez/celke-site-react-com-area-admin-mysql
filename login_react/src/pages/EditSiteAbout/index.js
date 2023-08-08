import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { servDeleteAbout } from '../../services/servDeleteAbout';

import api from '../../config/configApi';

export const EditSiteAbout = (props) => {

    const [titleAbout, setTitleAbout] = useState('');
    const [descAbout, setDescAbout] = useState('');
    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const editSiteAbout = async e => {
        e.preventDefault();

        if (!(await validate())) return;

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.put("/site-about/edit-about", { id, title_about: titleAbout, desc_about: descAbout }, headers)
            .then((response) => {
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
                        mensagem: 'Erro: Tente mais tarde!'
                    });
                }
            });
    }

    useEffect(() => {
        const getSiteAbout = async () => {

            const headers = {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/site-about/about-adm/" + id, headers)
                .then((response) => {
                    if (response.data.about) {
                        setTitleAbout(response.data.about.title_about);
                        setDescAbout(response.data.about.desc_about);
                    } else {
                        setStatus({
                            type: 'redWarning',
                            mensagem: "Erro: Sobre não encontrado!"
                        });
                    }

                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: 'redWarning',
                            mensagem: err.response.data.mensagem
                        });
                    } else {
                        setStatus({
                            type: 'redWarning',
                            mensagem: "Erro: Tente mais tarde!"
                        });
                    }
                })
        }

        getSiteAbout();
    }, [id]);

    async function validate() {
        let schema = yup.object().shape({
            titleAbout: yup.string("Erro: Necessário preencher o campo título!")
                .required("Erro: Necessário preencher o campo título!"),
            descAbout: yup.string("Erro: Necessário preencher o campo descrição!")
                .required("Erro: Necessário preencher o campo descrição!")
        });

        try {
            await schema.validate({ titleAbout, descAbout });
            return true;
        } catch (err) {
            setStatus({ type: 'error', mensagem: err.errors });
            return false;
        }
    }

    const deleteAbout = async (idUser) => {
        const response = await servDeleteAbout(idUser);
        if (response) {
            if (response.type === "success") {
                setStatus({
                    type: 'redSuccess',
                    mensagem: response.mensagem
                });
            } else {
                setStatus({
                    type: "error",
                    mensagem: response.mensagem
                });
            }
        } else {
            setStatus({
                type: 'error',
                mensagem: 'Erro: Tente mais tarde!'
            });
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
                            <span className="title-content">Editar Sobre Empresa</span>
                            <div className="top-content-adm-right">
                                <Link to="/list-site-about">
                                    <button type="button" className="btn-info">Listar</button>
                                </Link>{" "}
                                <Link to={"/view-site-about/" + id}>
                                    <button type="button" className="btn-primary">Visualizar</button>
                                </Link>{" "}
                                <Link to="#">
                                    <button type="button" className="btn-danger" onClick={() => deleteAbout(id)}>Apagar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redWarning' ?
                                <Redirect to={{
                                    pathname: '/view-site-about/' + id,
                                    state: {
                                        type: "error",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}
                            {status.type === 'redSuccess' ? <Redirect to={{
                                pathname: '/view-site-about/' + id,
                                state: {
                                    type: "success",
                                    mensagem: status.mensagem
                                }
                            }} /> : ""}
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                        </div>

                        <div className="content-adm">
                            <form onSubmit={editSiteAbout} className="form-adm">

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Título</label>
                                        <input type="text" name="titleAbout" id="titleAbout" className="input-adm" placeholder="Título sobre empresa" value={titleAbout} onChange={text => setTitleAbout(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Descrição</label>
                                        <input type="text" name="descAbout" id="descAbout" className="input-adm" placeholder="Descrição sobre empresa" value={descAbout} onChange={text => setDescAbout(text.target.value)} />
                                    </div>

                                </div>

                                <button type="submit" className="btn-warning">Salvar</button>

                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}