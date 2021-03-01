import {Empty} from "../client/utils";
import {SubscribeWithStore} from "../client/subscribe";

import Link from 'next/link';
import {DropDown, SearchInput} from "../components";
import Image from  'next/image';
import {getTopCategoryChildren} from "../client/shop/functions";



export default function Header({topCategories, childTopCategoriesList}) {
    const AppStore = SubscribeWithStore();
    const hasItemInCart = !Empty(AppStore.state.cart);

    return <header className="header">
        <div className="header__tab-menu">
            <div onClick={() => AppStore.dispatch({type: 'TOGGLE_MENU', toggleMenu: true})} className="burger"><Image src="/icons/burger.svg" width="15" height="7" objectFit="cover"/></div>
        </div>
        <div className="header__nav">
            <ul className="menu">
                {topCategories.map(topCategory => {
                    const childCategories = getTopCategoryChildren(childTopCategoriesList, topCategory.id);
                    const link = `/catalog/${topCategory.slug}`;
                    return (
                        <li
                            key={topCategory.id} className="menu__item">
                            <Link   href={{
                                pathname: '/catalog/[slug]',
                                query: { slug: topCategory.slug },
                            }}>
                                <a className="menu__link menu__link_state-active">
                                    {topCategory.name}
                                </a>
                            </Link>
                            {!Empty(childCategories) &&
                            <DropDown childTopCategoriesList={childCategories}/>
                            }
                        </li>
                    )

                })}
            </ul>
        </div>

        <div className="header__logo">
            ff
        </div>

        <div className="header__user-interface">
            <ul className="interface-list">
                <li className="interface-list__item">
                    <SearchInput title="Поиск товаров" />
                </li>

                {/*<li className="interface-list__item">*/}
                {/*    <a href="#" className="interface__link">*/}
                {/*        <img height="14" width="13" alt="Личный кабинет пользователя" src="/icons/profile.svg"/>*/}
                {/*    </a>*/}
                {/*</li>*/}

                {/*<li className="interface-list__item">*/}
                {/*    <a href="#" className="interface__link">*/}
                {/*        <img height="14" width="13" alt="Избранное" src="/icons/likes.svg"/>*/}
                {/*        <div className="dot"></div>*/}
                {/*    </a>*/}
                {/*</li>*/}

                <li className="interface-list__item">
                    <Link href="/cart" as="/cart">
                        <a className="interface__link">
                            <img height="14" width="13" alt="Корзина" src="/icons/cart.svg"/>
                            {hasItemInCart && <div className="dot"></div>}
                        </a>
                    </Link>
                </li>

            </ul>
        </div>
    </header>
}
