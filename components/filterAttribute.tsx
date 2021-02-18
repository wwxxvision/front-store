import {CheckBox} from "./index";


export default function FilterAttribute({attribute, onChange}) {
    const typeAttribute = attribute.type;

    return <div className="filter-attribute">
        <div className="filter-attribute__title">{attribute.name}</div>
        {typeAttribute === 'select' &&
        <ul className="filter-attribute__list">
            {attribute.terms.map(term => (
                <li key={term.id} className="filter-attribute__item">
                    <CheckBox
                        onChange={() => onChange(attribute.slug, term.id)} label={term.name + ` (${term.count})`}
                    value={term.id}/>
                </li>
                ))}
        </ul>
        }
    </div>
}
