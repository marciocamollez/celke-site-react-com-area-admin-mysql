import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';

import api from '../../config/configApi';
import { servDeleteUser } from '../../services/servDeleteUser';

export const EditUserPassword = (props) => {

    //const [name, setName] = useState('');
    //const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const editUser = async e => {
        e.preventDefault();

        if (!(await validate())) return;

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.put("/user/user-senha", { id, password }, headers)
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
        const getUser = async () => {

            const headers = {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/user/user/" + id, headers)
                .then((response) => {
                    if (response.data.user) {
                        //setName(response.data.user.name);
                        //setEmail(response.data.user.email);
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
    }, [id]);

    async function validate() {
        let schema = yup.object().shape({
            password: yup.string("Erro: Necessário preencher o campo senha!")
                .required("Erro: Necessário preencher o campo senha!")
                .min(6, "Erro: A senha deve ter no mínimo 6 caracteres!"),
        });

        try {
            await schema.validate({ password, });
            return true;
        } catch (err) {
            setStatus({ type: 'error', mensagem: err.errors });
            return false;
        }
    }

    const deleteUser = async (idUser) => {
        const response = await servDeleteUser(idUser);
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
                <Sidebar active="users" />

                <div className="wrapper">
                    <div className="row">
                        <div className="top-content-adm">
                            <span className="title-content">Editar Senha</span>
                            <div className="top-content-adm-right">
                                <Link to="/users">
                                    <button type="button" className="btn-info">Listar</button>
                                </Link>{" "}
                                <Link to={"/view-user/" + id}>
                                    <button type="button" className="btn-primary">Visualizar</button>
                                </Link>{" "}
                                <Link to="#">
                                    <button type="button" className="btn-danger" onClick={() => deleteUser(id)}>Apagar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redWarning' ?
                                <Redirect to={{
                                    pathname: '/users',
                                    state: {
                                        type: "error",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}
                            {status.type === 'redSuccess' ? <Redirect to={{
                                pathname: '/users',
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
                                        <label className="title-input">Senha</label>
                                        <input type="password" name="password" id="password" className="input-adm" placeholder="Senha para acessar o sistema" autoComplete="on" onChange={text => setPassword(text.target.value)} />
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