import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';

import api from '../../config/configApi';

export const ViewSiteHome = () => {

    const { state } = useLocation();

    const [urlImage, setUrlImage] = useState('');
    const [dataHome, setDataHome] = useState('');

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

            await api.get("/site-home/view-home-adm", headers)
                .then((response) => {
                    //console.log(response.data);
                    setDataHome(response.data.dataHome);
                    setUrlImage(response.data.urlImage);
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
                <Sidebar active="site-home" />

                <div className="wrapper">
                    <div className="row">

                        <div className="top-content-adm">
                            <span className="title-content">Página Home</span>
                            <div className="top-content-adm-right">

                                <Link to={"/edit-site-home"}>
                                    <button type="button" className="btn-warning">Editar</button>
                                </Link>{" "}

                                <Link to={"/edit-site-home-image-top"}>
                                    <button type="button" className="btn-warning">Imagem do Topo</button>
                                </Link>{" "}
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                            {status.type === 'success' ? <p className="alert-success">{status.mensagem}</p> : ""}
                        </div>

                        <div className="content-adm">
                            <div className="view-det-adm">
                                <span className="view-adm-title">Imagem: </span>
                                <span className="view-adm-info">{<img src={urlImage + dataHome.image_top} alt="Imagem do Usuário" width="150" />}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">ID: </span>
                                <span className="view-adm-info">{dataHome.id}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Título um: </span>
                                <span className="view-adm-info">{dataHome.title_top_one}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Título dois: </span>
                                <span className="view-adm-info">{dataHome.title_top_two}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Título três: </span>
                                <span className="view-adm-info">{dataHome.title_top_three}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Texto do botão: </span>
                                <span className="view-adm-info">{dataHome.btn_text_top}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Link do botão: </span>
                                <span className="view-adm-info">{dataHome.btn_link_top}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Título dos serviços: </span>
                                <span className="view-adm-info">{dataHome.ser_title}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Serviço um: </span>
                                <span className="view-adm-info">{dataHome.ser_title_one}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Descrição: </span>
                                <span className="view-adm-info">{dataHome.ser_desc_one}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Ícone: </span>
                                <span className="view-adm-info">{dataHome.ser_icon_one}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Serviço dois: </span>
                                <span className="view-adm-info">{dataHome.ser_title_two}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Descrição: </span>
                                <span className="view-adm-info">{dataHome.ser_desc_two}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Ícone: </span>
                                <span className="view-adm-info">{dataHome.ser_icon_two}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Serviço três: </span>
                                <span className="view-adm-info">{dataHome.ser_title_three}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Descrição: </span>
                                <span className="view-adm-info">{dataHome.ser_desc_three}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Ícone: </span>
                                <span className="view-adm-info">{dataHome.ser_icon_three}</span>
                            </div>
                            <div className="view-det-adm">
                                <span className="view-adm-title">Serviço premium: </span>
                                <span className="view-adm-info">{dataHome.title_ser_prem}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Subtítulo: </span>
                                <span className="view-adm-info">{dataHome.subtitle_ser_prem}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Descrição: </span>
                                <span className="view-adm-info">{dataHome.desc_ser_prem}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Texto do botão: </span>
                                <span className="view-adm-info">{dataHome.btn_text_ser_prem}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Link do botão: </span>
                                <span className="view-adm-info">{dataHome.btn_link_ser_prem}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Imagem: </span>
                                <span className="view-adm-info">{<img src={urlImage + dataHome.image_ser_prem} alt="Imagem do Usuário" width="150" />}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}