import Link from "next/link";
import {isLastIndex} from "../client/utils";

const classNames = require('classnames');

export default function BreadCrumb({breadcrumb}) {
    return <div className="breadcrumb">
        {breadcrumb.map((crumb, index) => (
            <div
                key={crumb.title}
                className={classNames('breadcrumb__item', {['breadcrumb__item_state-active']: isLastIndex(index, breadcrumb.length)})}>
                <Link {...crumb.link}>
                    <a>{crumb.title} {!isLastIndex(index, breadcrumb.length) && '/'}</a>
                </Link>
            </div>))}
    </div>
}
