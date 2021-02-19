import Link from 'next/link';
import {DropDown} from "../components";
import {useState} from "react";
import {Empty} from "../client/utils";

function getTopCategoryChildren(childTopCategoriesList, parentID) {
    return childTopCategoriesList.filter(childTopCategory => childTopCategory.parent == parentID);
}

export default function Header({topCategories, childTopCategoriesList}) {
    const [isShownDropDown, showDropDown] = useState(false);

    return <header className="header">
        <div className="header__tab-menu">
            <div className="burger"></div>
            <div className="title">Меню</div>
        </div>
        <div className="header__nav">
            <ul className="menu">
                {topCategories.map(topCategory => {
                    const childCategories = getTopCategoryChildren(childTopCategoriesList, topCategory.id);
                    const link = `/catalog/${topCategory.slug}`;
                    return (
                        <li onMouseEnter={() => !isShownDropDown && !Empty(childCategories) && showDropDown(true)}
                            key={topCategory.id} className="menu__item">
                            <Link href={{pathname: '/catalog', query: {slug: topCategory.slug}}} as={link}>
                                <a className="menu__link menu__link_state-active">
                                    {topCategory.name}
                                </a>
                            </Link>
                            {!Empty(childCategories) && isShownDropDown &&
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
                    <img height="14" width="13" alt="Поиск по сайту" src="/icons/union.svg"/>
                </li>

                <li className="interface-list__item">
                    <a href="#" className="interface__link">
                        <img height="14" width="13" alt="Личный кабинет пользователя" src="/icons/profile.svg"/>
                    </a>
                </li>

                <li className="interface-list__item">
                    <a href="#" className="interface__link">
                        <img height="14" width="13" alt="Избранное" src="/icons/likes.svg"/>
                        <div className="dot"></div>
                    </a>
                </li>

                <li className="interface-list__item">
                    <a href="#" className="interface__link">
                        <img height="14" width="13" alt="Корзина" src="/icons/cart.svg"/>
                    </a>
                </li>

            </ul>
        </div>
    </header>
}
