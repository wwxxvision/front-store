import Link from 'next/link';
const classNames = require('classnames');

export default function DropDown({childTopCategoriesList, fromMenu = false}) {
    return <div className={classNames('dropdown', {'dropdown-from-menu': fromMenu} )}>
        <div className="dropdown__wrapper">
            <div className="dropdown__group">
                <div className="title">
                    Категории
                </div>

                <ul className="dropdown__list">
                    {childTopCategoriesList.map(childTopCategory => (
                        <li key={childTopCategory.id} className="dropdown__item">
                            <Link  href={`/catalog/${childTopCategory.slug}`}>
                                <a className="dropdown__link">{childTopCategory.name}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
}
