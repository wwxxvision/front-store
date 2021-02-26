export default function Select({options, onChange}) {
    return <div className="select-wrapper">
        <div className="select-arrow"></div>
        <select
            onChange={(e) => onChange(e.target.value)}
            className="select">
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
}
