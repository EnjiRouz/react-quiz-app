import React from "react";
import classes from "./Input.module.css";

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched;
}

const Input = props => {
    const inputType = props.type || "text";
    const classNames = [classes.Input];
    const htmlFor = `${inputType}-${Math.random()}`;
    const errorOccurred = isInvalid(props);

    if (errorOccurred)
        classNames.push(classes.invalid);

    return (
        <div className={classNames.join(" ")}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />

            {
                errorOccurred
                    ? <span>{props.errorMessage || "Enter valid data"}</span>
                    : null
            }
        </div>
    );
};

export default Input;