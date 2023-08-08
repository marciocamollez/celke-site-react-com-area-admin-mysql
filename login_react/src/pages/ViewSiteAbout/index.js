import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';

import { servDeleteAbout } from '../../services/servDeleteAbout';
import api from '../../config/configApi';

export const ViewSiteAbout = (props) => {

    const { state } = useLocation();

    const [data, setData] = useState('');
    const [id] = useState(props.match.params.id);
    const [endImg, setEndImg] = useState('');

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    useEffect(() => {
        const getAbout = async () => {

            const headers = {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/site-about/about-adm/" + id, headers)
                .then((response) => {
                    if (response.data.about) {
                        setEndImg(response.data.endImage);
                        setData(response.data.about);
                    } else {
                        setStatus({
                            type: 'redError',
                            mensagem: "Erro: Nenhum registro sobre empresa encontrado!"
                        });
                    }

                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: 'redError',
                            mensagem: err.response.data.mensagem
                        });
                    } else {
                        setStatus({
                            type: 'redError',
                            mensagem: "Erro: Tente mais tarde!"
                        });
                    }
                })
        }

        getAbout();
    }, [id]);

    const deleteAbout = async (idAbout) => {
        const response = await servDeleteAbout(idAbout);

        if (response) {
            if (response.type === "success") {
                setStatus({
                    type: "redSuccess",
                    mensagem: response.mensagem
                });
            } else {
                setStatus({
                    type: response.type,
                    mensagem: response.mensagem
                });
            }
        } else {
            setStatus({
                type: "redError",
                mensagem: "Erro: Tente mais tarde!"
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
                            <span className="title-content">Visualizar Sobre Empresa</span>
                            <div className="top-content-adm-right">
                                <Link to="/list-site-about">
                                    <button type="button" className="btn-info">Listar</button>
                                </Link>{" "}

                                <Link to={"/edit-site-about/" + data.id}>
                                    <button type="button" className="btn-warning">Editar</button>
                                </Link>{" "}

                                <Link to={"/edit-site-about/" + data.id}>
                                    <button type="button" className="btn-warning">Editar Imagem</button>
                                </Link>{" "}

                                <Link to={"#"}>
                                    <button type="button" onClick={() => deleteAbout(data.id)} className="btn-danger">Apagar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redSuccess' ?
                                <Redirect to={{
                                    pathname: '/list-site-about',
                                    state: {
                                        type: "success",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}

                            {status.type === 'redError' ?
                                <Redirect to={{
                                    pathname: '/list-site-about',
                                    state: {
                                        type: "error",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                            {status.type === 'success' ? <p className="alert-success">{status.mensagem}</p> : ""}
                        </div>

                        <div className="content-adm">
                            <div className="view-det-adm">
                                <span className="view-adm-title">Imagem: </span>
                                <span className="view-adm-info">{<img src={endImg} alt="Imagem sobre empresa" width="150" height="150" />}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">ID: </span>
                                <span className="view-adm-info">{data.id}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Título: </span>
                                <span className="view-adm-info">{data.title_about}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Descrição: </span>
                                <span className="view-adm-info">{data.desc_about}</span>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}