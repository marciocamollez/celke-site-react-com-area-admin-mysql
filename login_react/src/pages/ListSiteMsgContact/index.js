import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { servDeleteMsgContact } from '../../services/servDeleteMsgContact';

import useDropdownList from '../../hooks/useDropdownList';

import api from '../../config/configApi';

export const ListSiteMsgContact = () => {

    const { actionDropdown, closeDropdownAction } = useDropdownList();

    const { state } = useLocation();

    const [data, setData] = useState([]);
    const [page, setPage] = useState("");
    const [lastPage, setLastPage] = useState("");

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    const getMsgContacts = async (page) => {

        if (page === undefined) {
            page = 1;
        }
        setPage(page);

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        await api.get("/site-msg-contact/list-msg-contact/" + page, headers)
            .then((response) => {
                setData(response.data.msgContacts);
                setLastPage(response.data.lastPage);
            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.mensagem
                    });
                } else {
                    setStatus({
                        type: 'error',
                        mensagem: "Erro: Tente mais tarde!"
                    });
                }
            });
    }

    useEffect(() => {
        getMsgContacts();
    }, []);

    const deleteMsgContact = async (idMsgContact) => {
        const response = await servDeleteMsgContact(idMsgContact);

        if (response) {
            setStatus({ type: response.type, mensagem: response.mensagem });
            getMsgContacts();
        } else {
            setStatus({
                type: "error",
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
                            <span className="title-content">Listar Mensagens</span>
                            <div className="top-content-adm-right">
                                <Link to="/add-site-msg-contact">
                                    <button type="button" className="btn-success">Cadastrar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                            {status.type === 'success' ? <p className="alert-success">{status.mensagem}</p> : ""}
                        </div>

                        <table className="table-list">
                            <thead className="list-head">
                                <tr>
                                    <th className="list-head-content">ID</th>
                                    <th className="list-head-content">Nome</th>
                                    <th className="list-head-content table-sm-none">E-mail</th>
                                    <th className="list-head-content table-md-none">Assunto</th>
                                    <th className="list-head-content">Ações</th>
                                </tr>
                            </thead>

                            <tbody className="list-body">
                                {data.map(msgContact => (
                                    <tr key={msgContact.id}>
                                        <td className="list-body-content">{msgContact.id}</td>
                                        <td className="list-body-content">{msgContact.name}</td>
                                        <td className="list-body-content table-sm-none">{msgContact.email}</td>
                                        <td className="list-body-content table-md-none">{msgContact.subject}</td>
                                        <td className="list-body-content">
                                            <div className="dropdown-action">
                                                <button onClick={() => { closeDropdownAction(); actionDropdown(msgContact.id) }} className="dropdown-btn-action">Ações</button>
                                                <div id={"actionDropdown" + msgContact.id} className="dropdown-action-item">
                                                    <Link to={"/view-site-msg-contact/" + msgContact.id}>Visualizar</Link>
                                                    <Link to={"/edit-site-msg-contact/" + msgContact.id}>Editar</Link>
                                                    <Link to={"#"} onClick={() => deleteMsgContact(msgContact.id)}>Apagar</Link>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="content-pagination">
                            <div className="pagination">
                                <Link to="#" onClick={() => getMsgContacts(1)}><i className="fas fa-angle-double-left"></i></Link>

                                {page !== 1 ? <Link to="#" onClick={() => getMsgContacts(page - 1)}>{page - 1}</Link> : ""}

                                <Link to="#" className="active">{page}</Link>

                                {page + 1 <= lastPage ? <Link to="#" onClick={() => getMsgContacts(page + 1)}>{page + 1}</Link> : ""}

                                <Link to="#" onClick={() => getMsgContacts(lastPage)}><i className="fas fa-angle-double-right"></i></Link>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}