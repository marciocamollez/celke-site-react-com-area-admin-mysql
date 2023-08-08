import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import api from '../../config/configApi';

export const AddUser = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const valueInput = e => setUser({ ...user, [e.target.name]: e.target.value });

    const addUser = async e => {
        e.preventDefault();

        if (!(await validate())) return;

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        await api.post('/user/user', user, headers)
            .then((response) => {
                setStatus({
                    type: 'success',
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
                        mensagem: "Erro: Tente novamente!"
                    });
                }
            });
    }

    async function validate() {
        let schema = yup.object().shape({
            password: yup.string("Erro: Necessário preencher o campo senha!")
                .required("Erro: Necessário preencher o campo senha!")
                .min(6, "Erro: A senha deve ter no mínimo 6 caracteres!"),
            email: yup.string("Erro: Necessário preencher o campo e-mail!")
                .email("Erro: Necessário preencher o campo e-mail!")
                .required("Erro: Necessário preencher o campo e-mail!"),
            name: yup.string("Erro: Necessário preencher o campo nome!")
                .required("Erro: Necessário preencher o campo nome!")
        });

        try {
            await schema.validate({
                name: user.name,
                email: user.email,
                password: user.password,
            });
            return true;
        } catch (err) {
            setStatus({
                type: 'error',
                mensagem: err.errors
            });
            return false;
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
                            <span className="title-content">Cadastrar Usuário</span>
                            <div className="top-content-adm-right">
                                <Link to="/users">
                                    <button type="button" className="btn-info">Listar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}

                            {status.type === 'success' ?
                                <Redirect to={{
                                    pathname: '/users',
                                    state: {
                                        type: "success",
                                        mensagem: status.mensagem
                                    }
                                }} />
                                : ""}
                        </div>

                        <div className="content-adm">
                            <form onSubmit={addUser} className="form-adm">

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Nome</label>
                                        <input type="text" name="name" id="name" className="input-adm" placeholder="Nome completo do usuário" onChange={valueInput} />
                                    </div>
                                </div>

                                <div className="row-input">

                                    <div className="column">
                                        <label className="title-input">E-mail</label>
                                        <input type="email" name="email" id="email" className="input-adm" placeholder="Melhor e-mail do usuário" onChange={valueInput} />
                                    </div>
                                    
                                    <div className="column">
                                        <label className="title-input">Senha</label>
                                        <input type="password" name="password" id="password" className="input-adm" placeholder="Senha para acessar o sistema" autoComplete="on" onChange={valueInput} />
                                    </div>
                                </div>

                                <button type="submit" className="btn-success">Cadastrar</button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};