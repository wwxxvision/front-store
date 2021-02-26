const classNames = require("classnames");

export default  function Button({title, state, clickAction}) {
    return <div onClick={clickAction}  className={classNames({"button": true, "button_state-active": state === 'active', "button_state-disable": state === 'disable'})}>{title}</div>
}
