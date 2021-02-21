import InputMask from 'react-input-mask';

export default  function Input({label, value, onChange, onBlur, type, name}) {
    return <div className="input">
        <label className="input__label">
            {type === "tel" &&
                <InputMask mask="+7(999)-999-99-99" value={value} onBlur={onBlur} onChange={onChange}  name={name}  placeholder={label} type={type} />
            }
            {type === 'text' && <input name={name} onBlur={onBlur} onChange={onChange} value={value} placeholder={label} type={type} />}
            <span>{label}</span>
        </label>
    </div>
}
