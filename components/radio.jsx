import { Field } from 'formik';

export default function Radio({value, name, label}) {
    return <div className="radio">
        <label className="radio__label">
            <div className="radio__area">
                <Field type="radio" value={value} name={name} />
                <div className="radio__checked"></div>
            </div>
            <span>{label}</span>
        </label>
    </div>
}
