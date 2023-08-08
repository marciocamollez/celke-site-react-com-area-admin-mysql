import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';

import { servDeleteMsgContact } from '../../services/servDeleteMsgContact';
import api from '../../config/configApi';

export const ViewSiteMsgContact = (props) => {

    const { state } = useLocation();

    const [data, setData] = useState('');
    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    useEffect(() => {
        const getMsgContact = async () => {

            const headers = {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/site-msg-contact/msg-contact/" + id, headers)
                .then((response) => {
                    if (response.data.msgContact) {
                        setData(response.data.msgContact);
                    } else {
                        setStatus({
                            type: 'redError',
                            mensagem: "Erro: Mensagem de contato não encontrado!"
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

        getMsgContact();
    }, [id]);

    const deleteMsgContact = async (idMsgContact) => {
        const response = await servDeleteMsgContact(idMsgContact);

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
                <Sidebar active="site-msg-contact" />

                <div className="wrapper">
                    <div className="row">

                        <div className="top-content-adm">
                            <span className="title-content">Visualizar Mensagem</span>
                            <div className="top-content-adm-right">
                                <Link to="/list-site-msg-contact">
                                    <button type="button" className="btn-info">Listar</button>
                                </Link>{" "}

                                <Link to={"/edit-site-msg-contact/" + data.id}>
                                    <button type="button" className="btn-warning">Editar</button>
                                </Link>{" "}

                                <Link to={"#"}>
                                    <button type="button" onClick={() => deleteMsgContact(data.id)} className="btn-danger">Apagar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redSuccess' ?
                                <Redirect to={{
                                    pathname: '/list-site-msg-contact',
                                    state: {
                                        type: "success",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}

                            {status.type === 'redError' ?
                                <Redirect to={{
                                    pathname: '/list-site-msg-contact',
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
                                <span className="view-adm-title">ID: </span>
                                <span className="view-adm-info">{data.id}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Nome: </span>
                                <span className="view-adm-info">{data.name}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">E-mail: </span>
                                <span className="view-adm-info">{data.email}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Assunto: </span>
                                <span className="view-adm-info">{data.subject}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Conteúdo: </span>
                                <span className="view-adm-info">{data.content}</span>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}