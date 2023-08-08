import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import api from '../../config/configApi';

export const EditSiteContContact = () => {

    const [titleContact, setTitleContact] = useState('');
    const [descContact, setDescContact] = useState('');
    const [iconCompany, setIconCompany] = useState('');
    const [titleCompany, setTitleCompany] = useState('');
    const [descCompany, setDescCompany] = useState('');
    const [iconAddress, setIconAddress] = useState('');
    const [titleAddress, setTitleAddress] = useState('');
    const [descAddresse, setDescAddresse] = useState('');
    const [iconEmail, setIconEmail] = useState('');
    const [titleEmail, setTitleEmail] = useState('');
    const [descEmail, setDescEmail] = useState('');
    const [titleForm, setTitleForm] = useState('');

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const editContContact = async e => {
        e.preventDefault();

        if (!(await validate())) return;

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.put("/site-cont-contact/edit-content-contact", {
            title_contact: titleContact,
            desc_contact: descContact,
            icon_company: iconCompany,
            title_company: titleCompany,
            desc_company: descCompany,
            icon_address: iconAddress,
            title_address: titleAddress,
            desc_address: descAddresse,
            icon_email: iconEmail,
            title_email: titleEmail,
            desc_email: descEmail,
            title_form: titleForm
        },
            headers)
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
            })

    }

    async function validate() {
        let schema = yup.object().shape({
            titleContact: yup.string("Erro: Necessário preencher o campo título!")
                .required("Erro: Necessário preencher o campo título!"),
            descContact: yup.string("Erro: Necessário preencher o campo descrição!")
                .required("Erro: Necessário preencher o campo descrição!"),
            iconCompany: yup.string("Erro: Necessário preencher o campo ícone da empresa!")
                .required("Erro: Necessário preencher o campo ícone da empresa!"),
            titleCompany: yup.string("Erro: Necessário preencher o campo título da empresa!")
                .required("Erro: Necessário preencher o campo título da empresa!"),
            descCompany: yup.string("Erro: Necessário preencher o campo descrição da empresa!")
                .required("Erro: Necessário preencher o campo descrição da empresa!"),
            iconAddress: yup.string("Erro: Necessário preencher o campo ícone do endereço!")
                .required("Erro: Necessário preencher o campo ícone do endereço!"),
            titleAddress: yup.string("Erro: Necessário preencher o campo título do endereço!")
                .required("Erro: Necessário preencher o campo título do endereço!"),
            descAddresse: yup.string("Erro: Necessário preencher o campo descrição do endereço!")
                .required("Erro: Necessário preencher o campo descrição do endereço!"),
            iconEmail: yup.string("Erro: Necessário preencher o campo ícone do e-mail!")
                .required("Erro: Necessário preencher o campo ícone do e-mail!"),
            titleEmail: yup.string("Erro: Necessário preencher o campo título do e-mail!")
                .required("Erro: Necessário preencher o campo título do e-mail!"),
            descEmail: yup.string("Erro: Necessário preencher o campo descrição do e-mail!")
                .required("Erro: Necessário preencher o campo descrição do e-mail!"),
            titleForm: yup.string("Erro: Necessário preencher o campo título do formulário!")
                .required("Erro: Necessário preencher o campo título do formulário!")
        });

        try {
            await schema.validate({
                titleContact,
                descContact,
                iconCompany,
                titleCompany,
                descCompany,
                iconAddress,
                titleAddress,
                descAddresse,
                iconEmail,
                titleEmail,
                descEmail,
                titleForm
            });
            return true;
        } catch (err) {
            setStatus({ type: 'error', mensagem: err.errors });
            return false;
        }
    }

    useEffect(() => {
        const getHome = async () => {

            const headers = {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/site-cont-contact/view-cont-contact-adm", headers)
                .then((response) => {
                    if (response.data.dataContact) {
                        setTitleContact(response.data.dataContact.title_contact);
                        setDescContact(response.data.dataContact.desc_contact);
                        setIconCompany(response.data.dataContact.icon_company);
                        setTitleCompany(response.data.dataContact.title_company);
                        setDescCompany(response.data.dataContact.desc_company);
                        setIconAddress(response.data.dataContact.icon_address);
                        setTitleAddress(response.data.dataContact.title_address);
                        setDescAddresse(response.data.dataContact.desc_address);
                        setIconEmail(response.data.dataContact.icon_email);
                        setTitleEmail(response.data.dataContact.title_email);
                        setDescEmail(response.data.dataContact.desc_email);
                        setTitleForm(response.data.dataContact.title_form);

                    } else {
                        setStatus({
                            type: 'redWarning',
                            mensagem: "Erro: Conteúdo da página home não encontrado!"
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

        getHome();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="site-cont-contact" />

                <div className="wrapper">
                    <div className="row">

                        <div className="top-content-adm">
                            <span className="title-content">Editar</span>
                            <div className="top-content-adm-right">
                                <Link to={"/view-site-cont-contact"}>
                                    <button type="button" className="btn-primary">Visualizar</button>
                                </Link>{" "}
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redWarning' ?
                                <Redirect to={{
                                    pathname: '/view-site-cont-contact',
                                    state: {
                                        type: "error",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}
                            {status.type === 'redSuccess' ? <Redirect to={{
                                pathname: '/view-site-cont-contact',
                                state: {
                                    type: "success",
                                    mensagem: status.mensagem
                                }
                            }} /> : ""}
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                        </div>

                        <div className="content-adm">
                            <form onSubmit={editContContact} className="form-adm">

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Título</label>
                                        <input type="text" name="titleContact" id="titleContact" className="input-adm" placeholder="Título da página de contato" value={titleContact} onChange={text => setTitleContact(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Descrição</label>
                                        <input type="text" name="descContact" id="descContact" className="input-adm" placeholder="Descrição da página de contato" value={descContact} onChange={text => setDescContact(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Título Sobre Empresa</label>
                                        <input type="text" name="titleCompany" id="titleCompany" className="input-adm" placeholder="Título sobre empresa" value={titleCompany} onChange={text => setTitleCompany(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Ícone</label>
                                        <input type="text" name="iconCompany" id="iconCompany" className="input-adm" placeholder="Ícone sobre empresa" value={iconCompany} onChange={text => setIconCompany(text.target.value)} />
                                    </div>

                                    <div className="column">
                                        <label className="title-input">Descrição</label>
                                        <input type="text" name="descCompany" id="descCompany" className="input-adm" placeholder="Descrição sobre empresa" value={descCompany} onChange={text => setDescCompany(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Título do Endereço</label>
                                        <input type="text" name="titleAddress" id="titleAddress" className="input-adm" placeholder="Título do endereço" value={titleAddress} onChange={text => setTitleAddress(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Ícone</label>
                                        <input type="text" name="iconAddress" id="iconAddress" className="input-adm" placeholder="Ícone sobre empresa" value={iconAddress} onChange={text => setIconAddress(text.target.value)} />
                                    </div>
                                    <div className="column">
                                        <label className="title-input">Descrição</label>
                                        <input type="text" name="descAddresse" id="descAddresse" className="input-adm" placeholder="Descrição sobre empresa" value={descAddresse} onChange={text => setDescAddresse(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Título do E-mail</label>
                                        <input type="text" name="titleEmail" id="titleEmail" className="input-adm" placeholder="Título do e-mail" value={titleEmail} onChange={text => setTitleEmail(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Ícone</label>
                                        <input type="text" name="iconEmail" id="iconEmail" className="input-adm" placeholder="Ícone  do e-mail" value={iconEmail} onChange={text => setIconEmail(text.target.value)} />
                                    </div>
                                    <div className="column">
                                        <label className="title-input">Descrição</label>
                                        <input type="text" name="descEmail" id="descEmail" className="input-adm" placeholder="Descrição do e-mail" value={descEmail} onChange={text => setDescEmail(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Título do Formulário</label>
                                        <input type="text" name="titleForm" id="titleForm" className="input-adm" placeholder="Título do formulário de contato" value={titleForm} onChange={text => setTitleForm(text.target.value)} />
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