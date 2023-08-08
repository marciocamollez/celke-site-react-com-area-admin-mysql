const Footer = (props) => (
    <div>
        <footer>
            <span>{props.data.footer_desc} <a href={props.data.footer_link}>{props.data.footer_text_link}</a></span>
        </footer>
    </div>
);

export default Footer;