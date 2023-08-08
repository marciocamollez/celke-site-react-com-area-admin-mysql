const Menu = () => (
    <div>
        <nav className="navbar">
            <div className="max-width">
                <div className="logo"><a href="/">Celke</a></div>
                <ul className="menu">
                    <li><a href="/" className="menu-btn">Home</a></li>
                    <li><a href="/sobre-empresa" className="menu-btn">Sobre Empresa</a></li>
                    <li><a href="/contato" className="menu-btn">Contato</a></li>
                </ul>
                <div className="menu-btn">
                    <i className="fas fa-bars"></i>
                </div>
            </div>
        </nav>
        {/*<Link href="/">
            <a className="menu">Home</a>
        </Link>

        <Link href="/sobre-empresa">
            <a className="menu">Sobre Empresa</a>
        </Link>

        <Link href="/contato">
            <a className="menu">Contato</a>
</Link> */}
    </div>
);

export default Menu;