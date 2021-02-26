export default  function TextArea({label, value, onChange, onBlur, type, name}) {
    return <div className="input input-textarea">
        <label className="input__label">
            <textarea name={name} onBlur={onBlur} onChange={onChange} value={value} placeholder={label} type={type} />
            <span>{label}</span>
        </label>
    </div>
}
