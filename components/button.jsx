const classNames = require("classnames");

export default  function Button({title, state, clickAction, rounded = false}) {
    return <div onClick={clickAction}  className={classNames({"button": true, "button_state-active": state === 'active', "button_state-disable": state === 'disable', 'button_style-rounded': rounded})}>{title}</div>
}
