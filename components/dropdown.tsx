import Link from 'next/link';

export default function DropDown({childTopCategoriesList}) {
    return <div className="dropdown">
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
