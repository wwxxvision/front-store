import Link from 'next/link';

export default function Footer() {
    return <footer className="footer">
        <div className="footer__logo">
            ff
        </div>
        <nav className="footer__nav">
            <ul className="menu">
                <li className="menu__item">
                    <Link href="/">
                        <a className="menu__link">Главная</a>
                    </Link>
                </li>

                <li className="menu__item">
                    <Link href={{pathname: '/catalog', query: {slug: "men"}}} as="/catalog/men">
                        <a href="#" className="menu__link">Мужское</a>
                    </Link>
                </li>

                <li className="menu__item">
                    <Link href={{pathname: '/catalog', query: {slug: "women"}}} as="/catalog/women">
                        <a href="#" className="menu__link">Женское</a>
                    </Link>
                </li>

                <li className="menu__item">
                    <Link href="order-status">
                        <a className="menu__link">Статус заказ</a>
                    </Link>

                </li>

                <li className="menu__item">
                    <Link href="contacts">
                        <a href="#" className="menu__link">Контакты</a>
                    </Link>
                </li>
            </ul>
        </nav>
        <div className="footer_socials">
            <a href="#" className="social__link">VK</a>
            <a href="#" className="social__link">Instagram</a>
        </div>
    </footer>
}
