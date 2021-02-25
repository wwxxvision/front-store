import {  Field} from 'formik';

export default function CheckBox({value, label, onChange, isActive = false, name, simple = false}) {
    return <div className="checkbox">
        <label className="checkbox__label">
            <div className="checkbox__area">
                {!simple && <input onChange={onChange} name={name} checked={isActive ? true: false} value={value} type="checkbox"/>}
                {simple && <Field name={name}  type="checkbox"/>}
                <div className="checkbox__checked"></div>
            </div>
            <span>{label}</span>
        </label>
    </div>
}
