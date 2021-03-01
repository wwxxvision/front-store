import Image from 'next/image';
import Link from 'next/link';
import {DropDown} from "./index";

import {CONFIG} from "../client/config";
import {getTopCategoryChildren} from "../client/shop/functions";
import { useState} from "react";
import {SubscribeWithStore} from "../client/subscribe";
import {Router} from "next/router";

const classNames = require('classnames');


export default function Menu() {
    const [idToggleDropDown, toggleDropDown] = useState(false);
    const AppStore = SubscribeWithStore();

    Router.events.on('routeChangeComplete', (url) => {
        if (AppStore.state.toggleMenu) {
            AppStore.dispatch({type: 'TOGGLE_MENU', toggleMenu: false});
        }
    });

    return <div className="menu-sidebar">
        <div className="menu-sidebar__background"></div>

        <aside className="menu-sidebar__panel">
            <div className="menu-sidebar__close">
                <Image onClick={() => AppStore.dispatch({type: 'TOGGLE_MENU', toggleMenu: false})} src="/icons/close.svg" height={15} width={15}/>
            </div>
            <div className="menu-sidebar__row">
                <Link href="/">
                    <a>Главная</a>
                </Link>
            </div>

            {CONFIG.TOP_CATEGORIES.map(cat => (
                <div onMouseEnter={() => toggleDropDown(cat.id)}
                     className={classNames(['menu-sidebar__row', {'menu-sidebar__row_state-active': idToggleDropDown === cat.id}])}>
                    {cat.name}
                </div>
            ))}



            <div className="menu-sidebar__row">
                <Link href="/">
                    <a>Покупателю</a>
                </Link>
            </div>

            <div className="menu-sidebar__row">
                <Link href="/">
                    <a>Контакты</a>
                </Link>
            </div>
        </aside>

        <div className="categories">
            {idToggleDropDown && <DropDown fromMenu={true}
                                           childTopCategoriesList={getTopCategoryChildren(CONFIG.CATEGORIES, idToggleDropDown)}/>}
        </div>
    </div>
}
