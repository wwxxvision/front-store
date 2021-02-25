export default function Overlay({children}) {
    return <div className="overlay">
        <div className="overlay__background"></div>
        <div className="overlay__body">
            {children}
        </div>
    </div>
}
