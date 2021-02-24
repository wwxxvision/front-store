
export default function Footer() {
    return <footer className="footer">
        <div className="footer__logo">
            ff
        </div>
        <nav className="footer__nav">
            <ul className="menu">
                <li className="menu__item">
                    <a href="#" className="menu__link">Главная</a>
                </li>

                <li className="menu__item">
                    <a href="#" className="menu__link">Мужское</a>
                </li>

                <li className="menu__item">
                    <a href="#" className="menu__link">Женское</a>
                </li>

                <li className="menu__item">
                    <a href="#" className="menu__link">Новости</a>
                </li>

                <li className="menu__item">
                    <a href="#" className="menu__link">Контакты</a>
                </li>
            </ul>
        </nav>
        <div className="footer_socials">
            <a href="#" className="social__link">VK</a>
            <a href="#" className="social__link">Instagram</a>
        </div>
    </footer>
}
