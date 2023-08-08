import React, { useContext } from 'react';
import { Context } from '../../Context/AuthContext';

import { Link } from 'react-router-dom';

export const Sidebar = (props) => {

    const { handleLogout } = useContext(Context);

    return (
        <div id="barsSidebar" className="sidebar">

            <Link to="/dashboard" className={props.active === "dashboard" ? "sidebar-nav active" : "sidebar-nav"} ><i className="icon fas fa-tachometer-alt"></i><span> Dashboard</span></Link>

            <Link to="/users" className={props.active === "users" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fas fa-users"></i><span>Usuários</span></Link>

            <Link to="/view-site-home" className={props.active === "site-home" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fas fa-home"></i><span>Home</span></Link>

            <Link to="/list-site-about" className={props.active === "site-about" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fas fa-building"></i><span>Sobre</span></Link>

            <Link to="/view-site-cont-contact" className={props.active === "site-cont-contact" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fas fa-phone-alt"></i><span>Contato</span></Link>

            <Link to="/list-site-msg-contact" className={props.active === "site-msg-contact" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fas fa-comment-dots"></i><span>Mensagens</span></Link>

            <Link to="#" onClick={handleLogout} className="sidebar-nav"><i className="icon fas fa-sign-out-alt"></i><span>Sair</span></Link>
        </div>
    )
}