const classNames = require("classnames");

export default  function Button({title, state, clickAction, id}) {
    return <div onClick={clickAction} id={id} className={classNames({"button": true, "button_state-active": state === 'active', "button_state-disable": state === 'disable'})}>{title}</div>
}
