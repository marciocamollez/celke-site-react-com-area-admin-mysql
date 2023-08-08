import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';

import api from '../../config/configApi';

export const EditSiteHomeImageTop = () => {

    const [image, setImage] = useState('');
    const [endImg, setEndImg] = useState('');

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const editSiteHomeImageTop = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.put("/site-home/edit-home-image-top", formData, headers)
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
        const getSiteHomeImageTop = async () => {

            const headers = {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/site-home/view-home-img-adm", headers)
                .then((response) => {
                    if (response.data.dataHome) {
                        setEndImg(response.data.endImage);
                    } else {
                        setStatus({
                            type: 'redWarning',
                            mensagem: "Erro: Imagem do topo da página home não encontrado!"
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

        getSiteHomeImageTop();
    }, []);


    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="users" />

                <div className="wrapper">
                    <div className="row">
                        <div className="top-content-adm">
                            <span className="title-content">Editar Imagem</span>
                            <div className="top-content-adm-right">
                                <Link to={"/view-site-home"}>
                                    <button type="button" className="btn-primary">Visualizar</button>
                                </Link>{" "}
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redWarning' ?
                                <Redirect to={{
                                    pathname: '/view-site-home',
                                    state: {
                                        type: "error",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}
                            {status.type === 'redSuccess' ? <Redirect to={{
                                pathname: '/view-site-home',
                                state: {
                                    type: "success",
                                    mensagem: status.mensagem
                                }
                            }} /> : ""}
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                        </div>

                        <div className="content-adm">
                            <form onSubmit={editSiteHomeImageTop} className="form-adm">

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Imagem</label>
                                        <input type="file" name="image" id="image" className="input-adm"  onChange={e => setImage(e.target.files[0])} />
                                    </div>

                                    <div className="column">
                                        {image ? <img src={URL.createObjectURL(image)} alt="Imagem do usuário" height="150" /> : <img src={endImg} alt="Imagem do usuário" height="150" />}
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