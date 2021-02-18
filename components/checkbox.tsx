export default function CheckBox({value, label, onChange}) {
    return <div className="checkbox">
        <label className="checkbox__label">
            <div className="checkbox__area">
                <input onChange={onChange} value={value} type="checkbox"/>
                <div className="checkbox__checked"></div>
            </div>
            <span>{label}</span>
        </label>
    </div>
}
