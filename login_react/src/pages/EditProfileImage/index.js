import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';

import api from '../../config/configApi';

export const EditProfileImage = () => {

    const [image, setImage] = useState('');
    const [endImg, setEndImg] = useState('');
    //const [endImg, setEndImg] = useState(localStorage.getItem('image'));    

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const editUser = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.put("/profile/edit-profile-image", formData, headers)
            .then((response) => {
                localStorage.setItem('image', response.data.image);
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
        const getUser = async () => {

            const headers = {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/profile/view-profile", headers)
                .then((response) => {
                    if (response.data.user) {
                        setEndImg(response.data.endImage);
                    } else {
                        setStatus({
                            type: 'redWarning',
                            mensagem: "Erro: Usuário não encontrado!"
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

        getUser();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="profile" />

                <div className="wrapper">
                    <div className="row">
                        <div className="top-content-adm">
                            <span className="title-content">Editar a Foto</span>
                            <div className="top-content-adm-right">
                                <Link to="/view-profile">
                                    <button type="button" className="btn-primary">Perfil</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redSuccess' ? <Redirect to={{
                                pathname: '/view-profile',
                                state: {
                                    type: "success",
                                    mensagem: status.mensagem
                                }
                            }} /> : ""}
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                        </div>

                        <div className="content-adm">
                            <form onSubmit={editUser} className="form-adm">

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Imagem</label>
                                        <input type="file" name="image" id="image" className="input-adm" placeholder="Senha para acessar o sistema" onChange={e => setImage(e.target.files[0])} />
                                    </div>

                                    <div className="column">
                                        {image ? <img src={URL.createObjectURL(image)} alt="Imagem do usuário" width="150" height="150" /> : <img src={endImg} alt="Imagem do usuário" width="150" height="150" />}
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