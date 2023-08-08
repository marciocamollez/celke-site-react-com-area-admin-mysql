import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';

import api from '../../config/configApi';

export const ViewSiteContContact = () => {

    const { state } = useLocation();

    const [data, setData] = useState('');

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    useEffect(() => {
        const getSiteHome = async () => {

            const headers = {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/site-cont-contact/view-cont-contact-adm", headers)
                .then((response) => {
                    //console.log(response.data);
                    setData(response.data.dataContact);
                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: "error",
                            mensagem: err.response.data.mensagem
                        });
                    } else {
                        setStatus({
                            type: "error",
                            mensagem: "Erro: Tente mais tarde!"
                        });
                    }
                })
        }
        getSiteHome();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="site-cont-contact" />

                <div className="wrapper">
                    <div className="row">

                        <div className="top-content-adm">
                            <span className="title-content">Página Contato</span>
                            <div className="top-content-adm-right">

                                <Link to={"/edit-site-cont-contact"}>
                                    <button type="button" className="btn-warning">Editar</button>
                                </Link>{" "}
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                            {status.type === 'success' ? <p className="alert-success">{status.mensagem}</p> : ""}
                        </div>

                        <div class="content-adm">
                            <div class="view-det-adm">
                                <span class="view-adm-title">ID: </span>
                                <span class="view-adm-info">{data.id}</span>
                            </div>

                            <div class="view-det-adm">
                                <span class="view-adm-title">Título: </span>
                                <span class="view-adm-info">{data.title_contact}</span>
                            </div>

                            <div class="view-det-adm">
                                <span class="view-adm-title">Descrição: </span>
                                <span class="view-adm-info">{data.desc_contact}</span>
                            </div>

                            <div class="view-det-adm">
                                <span class="view-adm-title">Título da Empresa: </span>
                                <span class="view-adm-info">{data.title_company}</span>
                            </div>

                            <div class="view-det-adm">
                                <span class="view-adm-title">Ícone: </span>
                                <span class="view-adm-info">{data.icon_company}</span>
                            </div>

                            <div class="view-det-adm">
                                <span class="view-adm-title">Descrição: </span>
                                <span class="view-adm-info">{data.desc_company}</span>
                            </div>

                            <div class="view-det-adm">
                                <span class="view-adm-title">Título do Endereço: </span>
                                <span class="view-adm-info">{data.title_address}</span>
                            </div>

                            <div class="view-det-adm">
                                <span class="view-adm-title">Ícone: </span>
                                <span class="view-adm-info">{data.icon_address}</span>
                            </div>

                            <div class="view-det-adm">
                                <span class="view-adm-title">Descrição: </span>
                                <span class="view-adm-info">{data.desc_address}</span>
                            </div>

                            <div class="view-det-adm">
                                <span class="view-adm-title">Título do E-mail: </span>
                                <span class="view-adm-info">{data.title_email}</span>
                            </div>

                            <div class="view-det-adm">
                                <span class="view-adm-title">Ícone: </span>
                                <span class="view-adm-info">{data.icon_email}</span>
                            </div>

                            <div class="view-det-adm">
                                <span class="view-adm-title">Descrição: </span>
                                <span class="view-adm-info">{data.desc_email}</span>
                            </div>

                            <div class="view-det-adm">
                                <span class="view-adm-title">Título do Formulário: </span>
                                <span class="view-adm-info">{data.title_form}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}