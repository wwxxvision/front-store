import {CheckBox} from "./index";
import {colorToName} from "../client/shop/functions";


export default function FilterAttribute({attribute, onChange}) {
    const typeAttribute = attribute.type;

    return <div className="filter-attribute">
        <div className="filter-attribute__title">{attribute.name}</div>
        {typeAttribute === 'select' &&
        <ul className="filter-attribute__list">
            {attribute.terms.map(term => (
                <li key={term.id} className="filter-attribute__item">
                    <CheckBox
                        isActive={term.active}
                        onChange={() => onChange(attribute.slug, term.id)} label={attribute.name !== 'Цвет' ? term.name : colorToName(term.name)}
                    value={term.id}/>
                </li>
                ))}
        </ul>
        }
    </div>
}
