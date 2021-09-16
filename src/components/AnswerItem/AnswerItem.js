import React from "react";
import classes from "./AnswerItem.module.css"

const AnswerItem = props => {
    const classNames = [classes.AnswerItem];
    if (props.answerState)
        classNames.push(classes[props.answerState]);

    return (
        <li className={classNames.join(" ")}
            onClick={() => props.onAnswerClick(props.answer.id)}>
            {props.answer.text}
        </li>
    );
};

export default AnswerItem;