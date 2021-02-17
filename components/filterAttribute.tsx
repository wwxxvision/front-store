import {CheckBox} from "./index";


export default function FilterAttribute({attribute}) {
    const typeAttribute = attribute.attribute.type;

    return <div className="filter-attribute">
        <div className="filter-attribute__title">{attribute.attribute.name}</div>
        {typeAttribute === 'select' &&
        <ul className="filter-attribute__list">
            {attribute.terms.map(term => (
                <li key={term.attributeTerm.id} className="filter-attribute__item">
                    <CheckBox label={term.attributeTerm.name + ` (${term.attributeTerm.count})`} value={term.attributeTerm.id} />
                </li>
            ))}
        </ul>
        }
    </div>
}
