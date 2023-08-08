import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import api from '../../config/configApi';

export const EditSiteHome = () => {

    const [titleTopOne, setTitleTopOne] = useState('');
    const [titleTopTwo, setTitleTopTwo] = useState('');
    const [titleTopThree, setTitleTopThree] = useState('');
    const [btnTextTop, setBtnTextTop] = useState('');
    const [btnLinkTop, setBtnLinkTop] = useState('');

    const [serTitle, setSerTitle] = useState('');
    const [serIconOne, setSerIconOne] = useState('');
    const [serTitleOne, setSerTitleOne] = useState('');
    const [serDescOne, setSerDescOne] = useState('');
    const [serIconTwo, setSerIconTwo] = useState('');
    const [serTitleTwo, setSerTitleTwo] = useState('');
    const [serDescTwo, setSerDescTwo] = useState('');
    const [serIconThree, setSerIconThree] = useState('');
    const [serTitleThree, setSerTitleThree] = useState('');
    const [serDescThree, setSerDescThree] = useState('');

    const [titleSerPrem, setTitleSerPrem] = useState('');
    const [subtitleSerPrem, setSubtitleSerPrem] = useState('');
    const [descSerPrem, setDescSerPrem] = useState('');
    const [btnTextSerPrem, setbtnTextSerPrem] = useState('');
    const [btnLinkSerPrem, setBtnLinkSerPrem] = useState('');

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const editHome = async e => {
        e.preventDefault();

        if (!(await validate())) return;

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.put("/site-home/edit-home", {title_top_one: titleTopOne, title_top_two: titleTopTwo, title_top_three:titleTopThree, btn_text_top:btnTextTop, btn_link_top:btnLinkTop, ser_title:serTitle, ser_title_one:serTitleOne, ser_icon_one:serIconOne, ser_desc_one:serDescOne, ser_title_two:serTitleTwo, ser_icon_two:serIconTwo, ser_desc_two:serDescTwo, ser_title_three:serTitleThree, ser_icon_three:serIconThree, ser_desc_three:serDescThree, title_ser_prem:titleSerPrem, subtitle_ser_prem:subtitleSerPrem, desc_ser_prem:descSerPrem, btn_text_ser_prem:btnTextSerPrem, btn_link_ser_prem:btnLinkSerPrem}, headers)
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
            titleTopOne: yup.string("Erro: Necessário preencher o campo título um!")
                .required("Erro: Necessário preencher o campo título um!"),
            titleTopTwo: yup.string("Erro: Necessário preencher o campo título dois!")
                .required("Erro: Necessário preencher o campo título dois!"),
            titleTopThree: yup.string("Erro: Necessário preencher o campo título três!")
                .required("Erro: Necessário preencher o campo título três!"),
            btnTextTop: yup.string("Erro: Necessário preencher o campo texto do botão do topo!")
                .required("Erro: Necessário preencher o campo texto do botão do topo!"),
            btnLinkTop: yup.string("Erro: Necessário preencher o campo link do botão do topo!")
                .required("Erro: Necessário preencher o campo link do botão do topo!"),
            serTitle: yup.string("Erro: Necessário preencher o campo título dos serviços!")
                .required("Erro: Necessário preencher o campo título dos serviços!"),
            serTitleOne: yup.string("Erro: Necessário preencher o campo título do serviço um!")
                .required("Erro: Necessário preencher o campo título do serviço um!"),
            serIconOne: yup.string("Erro: Necessário preencher o campo ícone do serviço um!")
                .required("Erro: Necessário preencher o campo ícone do serviço um!"),
            serDescOne: yup.string("Erro: Necessário preencher o campo descrição do serviço um!")
                .required("Erro: Necessário preencher o campo descrição do serviço um!"),
            serTitleTwo: yup.string("Erro: Necessário preencher o campo título do serviço dois!")
                .required("Erro: Necessário preencher o campo título do serviço dois!"),
            serIconTwo: yup.string("Erro: Necessário preencher o campo ícone do serviço dois!")
                .required("Erro: Necessário preencher o campo ícone do serviço dois!"),
            serDescTwo: yup.string("Erro: Necessário preencher o campo descrição do serviço dois!")
                .required("Erro: Necessário preencher o campo descrição do serviço dois!"),
            serTitleThree: yup.string("Erro: Necessário preencher o campo título do serviço três!")
                .required("Erro: Necessário preencher o campo título do serviço três!"),
            serIconThree: yup.string("Erro: Necessário preencher o campo ícone do serviço três!")
                .required("Erro: Necessário preencher o campo ícone do serviço três!"),
            serDescThree: yup.string("Erro: Necessário preencher o campo descrição do serviço três!")
                .required("Erro: Necessário preencher o campo descrição do serviço três!"),
            titleSerPrem: yup.string("Erro: Necessário preencher o campo título do serviço premium!")
                .required("Erro: Necessário preencher o campo título do serviço premium!"),
            subtitleSerPrem: yup.string("Erro: Necessário preencher o campo subtítulo do serviço premium!")
                .required("Erro: Necessário preencher o campo subtítulo do serviço premium!"),
            descSerPrem: yup.string("Erro: Necessário preencher o campo descrição do serviço premium!")
                .required("Erro: Necessário preencher o campo descrição do serviço premium!"),
            btnTextSerPrem: yup.string("Erro: Necessário preencher o campo texto do botão do serviço premium!")
                .required("Erro: Necessário preencher o campo texto do botão do serviço premium!"),
            btnLinkSerPrem: yup.string("Erro: Necessário preencher o campo link do botão do serviço premium!")
                .required("Erro: Necessário preencher o campo link do botão do serviço premium!")
        });

        try {
            await schema.validate({ titleTopOne, titleTopTwo, titleTopThree, btnTextTop, btnLinkTop, serTitle, serTitleOne, serIconOne, serDescOne, serTitleTwo, serIconTwo, serDescTwo, serTitleThree, serIconThree, serDescThree, titleSerPrem, subtitleSerPrem, descSerPrem, btnTextSerPrem, btnLinkSerPrem });
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

            await api.get("/site-home/view-home-adm/", headers)
                .then((response) => {
                    if (response.data.dataHome) {
                        setTitleTopOne(response.data.dataHome.title_top_one);
                        setTitleTopTwo(response.data.dataHome.title_top_two);
                        setTitleTopThree(response.data.dataHome.title_top_three);
                        setBtnTextTop(response.data.dataHome.btn_text_top);
                        setBtnLinkTop(response.data.dataHome.btn_link_top);

                        setSerTitle(response.data.dataHome.ser_title);
                        setSerIconOne(response.data.dataHome.ser_icon_one);
                        setSerTitleOne(response.data.dataHome.ser_title_one);
                        setSerDescOne(response.data.dataHome.ser_desc_one);
                        setSerIconTwo(response.data.dataHome.ser_icon_two);
                        setSerTitleTwo(response.data.dataHome.ser_title_two);
                        setSerDescTwo(response.data.dataHome.ser_desc_two);
                        setSerIconThree(response.data.dataHome.ser_icon_three);
                        setSerTitleThree(response.data.dataHome.ser_title_three);
                        setSerDescThree(response.data.dataHome.ser_desc_three);

                        setTitleSerPrem(response.data.dataHome.title_ser_prem);
                        setSubtitleSerPrem(response.data.dataHome.subtitle_ser_prem);
                        setDescSerPrem(response.data.dataHome.desc_ser_prem);
                        setbtnTextSerPrem(response.data.dataHome.btn_text_ser_prem);
                        setBtnLinkSerPrem(response.data.dataHome.btn_link_ser_prem);

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
                <Sidebar active="site-home" />

                <div className="wrapper">
                    <div className="row">

                        <div className="top-content-adm">
                            <span className="title-content">Editar Home</span>
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
                            <form onSubmit={editHome} className="form-adm">

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Título Um</label>
                                        <input type="text" name="titleTopOne" id="titleTopOne" className="input-adm" placeholder="Título um do topo" value={titleTopOne} onChange={text => setTitleTopOne(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Título Dois</label>
                                        <input type="text" name="titleTopTwo" id="titleTopTwo" className="input-adm" placeholder="Título dois do topo" value={titleTopTwo} onChange={text => setTitleTopTwo(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Título Três</label>
                                        <input type="text" name="titleTopThree" id="titleTopThree" className="input-adm" placeholder="Título três do topo" value={titleTopThree} onChange={text => setTitleTopThree(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Texto do Botão</label>
                                        <input type="text" name="btnTextTop" id="btnTextTop" className="input-adm" placeholder="Texto do botão do topo" value={btnTextTop} onChange={text => setBtnTextTop(text.target.value)} />
                                    </div>
                                    <div className="column">
                                        <label className="title-input">Link do Botão</label>
                                        <input type="text" name="btnTextTop" id="btnTextTop" className="input-adm" placeholder="Link do botão do topo" value={btnLinkTop} onChange={text => setBtnLinkTop(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Título dos Serviços</label>
                                        <input type="text" name="serTitle" id="serTitle" className="input-adm" placeholder="Título da área serviço" value={serTitle} onChange={text => setSerTitle(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Serviços Um</label>
                                        <input type="text" name="serTitleOne" id="serTitleOne" className="input-adm" placeholder="Título do serviço um" value={serTitleOne} onChange={text => setSerTitleOne(text.target.value)} />
                                    </div>
                                    <div className="column">
                                        <label className="title-input">Ícone</label>
                                        <input type="text" name="serIconOne" id="serIconOne" className="input-adm" placeholder="Ícone do serviço um" value={serIconOne} onChange={text => setSerIconOne(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Descrição</label>
                                        <input type="text" name="serDescOne" id="serDescOne" className="input-adm" placeholder="Ícone do serviço um" value={serDescOne} onChange={text => setSerDescOne(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Serviços Dois</label>
                                        <input type="text" name="serTitleTwo" id="serTitleTwo" className="input-adm" placeholder="Título do serviço dois" value={serTitleTwo} onChange={text => setSerTitleTwo(text.target.value)} />
                                    </div>
                                    <div className="column">
                                        <label className="title-input">Ícone</label>
                                        <input type="text" name="serIconTwo" id="serIconTwo" className="input-adm" placeholder="Ícone do serviço dois" value={serIconTwo} onChange={text => setSerIconTwo(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Descrição</label>
                                        <input type="text" name="serDescTwo" id="serDescTwo" className="input-adm" placeholder="Ícone do serviço dois" value={serDescTwo} onChange={text => setSerDescTwo(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Serviços Três</label>
                                        <input type="text" name="serTitleThree" id="serTitleThree" className="input-adm" placeholder="Título do serviço três" value={serTitleThree} onChange={text => setSerTitleThree(text.target.value)} />
                                    </div>
                                    <div className="column">
                                        <label className="title-input">Ícone</label>
                                        <input type="text" name="serIconThree" id="serIconThree" className="input-adm" placeholder="Ícone do serviço três" value={serIconThree} onChange={text => setSerIconThree(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Descrição</label>
                                        <input type="text" name="serDescThree" id="serDescThree" className="input-adm" placeholder="Ícone do serviço três" value={serDescThree} onChange={text => setSerDescThree(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Título Serviço Premium</label>
                                        <input type="text" name="titleSerPrem" id="titleSerPrem" className="input-adm" placeholder="Título do serviço premium" value={titleSerPrem} onChange={text => setTitleSerPrem(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Subtítulo Serviço Premium</label>
                                        <input type="text" name="subtitleSerPrem" id="subtitleSerPrem" className="input-adm" placeholder="Subtítulo do serviço premium" value={subtitleSerPrem} onChange={text => setSubtitleSerPrem(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Descrição Serviço Premium</label>
                                        <input type="text" name="descSerPrem" id="descSerPrem" className="input-adm" placeholder="Descrição do serviço premium" value={descSerPrem} onChange={text => setDescSerPrem(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Texto do Botão</label>
                                        <input type="text" name="btnTextSerPrem" id="btnTextSerPrem" className="input-adm" placeholder="Texto do botão do serviço premium" value={btnTextSerPrem} onChange={text => setbtnTextSerPrem(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Link do Botão</label>
                                        <input type="text" name="btnLinkSerPrem" id="btnLinkSerPrem" className="input-adm" placeholder="Texto do botão do serviço premium" value={btnLinkSerPrem} onChange={text => setBtnLinkSerPrem(text.target.value)} />
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