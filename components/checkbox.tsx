export default function CheckBox({value, label}) {
    return <div className="checkbox">
        <label className="checkbox__label">
            <div className="checkbox__area">
                <input value={value} type="checkbox"/>
                <div className="checkbox__checked"></div>
            </div>
            <span>{label}</span>
        </label>
    </div>
}
