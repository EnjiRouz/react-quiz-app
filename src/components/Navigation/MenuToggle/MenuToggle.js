import React from "react";
import classes from "./MenuToggle.module.css";

const MenuToggle = props => {
    const classNames = [
        classes.MenuToggle,
        "fa"
    ];

    if (props.isMenuOpen) {
        classNames.push("fa-times");
        classNames.push(classes.open);
    } else
        classNames.push("fa-bars");

    return (
        <i
            className={classNames.join(" ")}
            onClick={props.onToggle}
        />
    )
};

export default MenuToggle;