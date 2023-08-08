import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { servDeleteAbout } from '../../services/servDeleteAbout';

import useDropdownList from '../../hooks/useDropdownList';

import api from '../../config/configApi';

export const ListSiteAbout = () => {

    const { actionDropdown, closeDropdownAction } = useDropdownList();

    const { state } = useLocation();

    const [data, setData] = useState([]);
    const [page, setPage] = useState("");
    const [lastPage, setLastPage] = useState("");

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    const getAbouts = async (page) => {

        if (page === undefined) {
            page = 1;
        }
        setPage(page);

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        await api.get("/site-about/list-about-adm/" + page, headers)
            .then((response) => {
                setData(response.data.abouts);
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
        getAbouts();
    }, []);

    const deleteAbout = async (idUser) => {
        const response = await servDeleteAbout(idUser);

        if (response) {
            setStatus({ type: response.type, mensagem: response.mensagem });
            getAbouts();
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
                <Sidebar active="site-about" />

                <div className="wrapper">
                    <div className="row">
                        <div className="top-content-adm">
                            <span className="title-content">Sobre Empresa</span>
                            <div className="top-content-adm-right">
                                <Link to="/add-site-about">
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
                                    <th className="list-head-content">Título</th>
                                    <th className="list-head-content">Ações</th>
                                </tr>
                            </thead>

                            <tbody className="list-body">
                                {data.map(about => (
                                    <tr key={about.id}>
                                        <td className="list-body-content">{about.id}</td>
                                        <td className="list-body-content">{about.title_about}</td>
                                        <td className="list-body-content">
                                            <div className="dropdown-action">
                                                <button onClick={() => { closeDropdownAction(); actionDropdown(about.id) }} className="dropdown-btn-action">Ações</button>
                                                <div id={"actionDropdown" + about.id} className="dropdown-action-item">
                                                    <Link to={"/view-site-about/" + about.id}>Visualizar</Link>
                                                    <Link to={"/edit-site-about/" + about.id}>Editar</Link>
                                                    <Link to={"#"} onClick={() => deleteAbout(about.id)}>Apagar</Link>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="content-pagination">
                            <div className="pagination">
                                <Link to="#" onClick={() => getAbouts(1)}><i className="fas fa-angle-double-left"></i></Link>

                                {page !== 1 ? <Link to="#" onClick={() => getAbouts(page - 1)}>{page - 1}</Link> : ""}

                                <Link to="#" className="active">{page}</Link>

                                {page + 1 <= lastPage ? <Link to="#" onClick={() => getAbouts(page + 1)}>{page + 1}</Link> : ""}

                                <Link to="#" onClick={() => getAbouts(lastPage)}><i className="fas fa-angle-double-right"></i></Link>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}