import React, {Component} from "react";
import axios from "../../axios/axios-quiz";
import classes from "./QuizCreator.module.css";
import {createControl, isFromValid, isValueValid} from "../../form/formFramework";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";

function createFormControls() {
    return {
        question: createControl({
            label: "Question",
            errorMessage: "Question text is Empty"
        }, {required: true}),

        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    };
}

function createOptionControl(optionNumber) {
    return createControl({
        id: optionNumber,
        label: `Answer #${optionNumber}`,
        errorMessage: "Answer text is Empty"
    }, {required: true})
}

class QuizCreator extends Component {

    state = {
        rightAnswerId: 1,
        quiz: [],
        formControls: createFormControls(),
        isFormValid: false
    };

    submitHandler = event => {
        event.preventDefault();
    };

    addQuestionHandler = event => {
        const quiz = this.state.quiz.concat();
        const quizId = quiz.length + 1;

        const {question, option1, option2, option3, option4} = this.state.formControls;
        const quizItem = {
            question: question.value,
            id: quizId,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        };

        quiz.push(quizItem);
        this.setState({
            quiz,
            rightAnswerId: 1,
            formControls: createFormControls(),
            isFormValid: false
        })
    };

    createQuizHandler = async event => {
        try {
            await axios.post("quizList.json", this.state.quiz);
            this.setState({
                quiz: [],
                rightAnswerId: 1,
                formControls: createFormControls(),
                isFormValid: false
            })
        } catch (error) {
            console.log(error);
        }
    };

    onChangeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const formControl = {...formControls[controlName]};

        formControl.value = value;
        formControl.touched = true;
        formControl.valid = isValueValid(formControl.value, formControl.validation);

        formControls[controlName] = formControl;
        this.setState({
            formControls: formControls,
            isFormValid: isFromValid(formControls)
        })
    };

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: Number(event.target.value)
        });
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((formControlName, index) => {
            const formControl = this.state.formControls[formControlName];
            return (
                <Auxiliary key={formControlName + index}>
                    <Input
                        type={formControl.type}
                        value={formControl.value}
                        label={formControl.label}
                        errorMessage={formControl.errorMessage}
                        valid={formControl.valid}
                        touched={formControl.touched}
                        shouldValidate={Boolean(formControl.validation)}
                        onChange={event => this.onChangeHandler(event.target.value, formControlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </Auxiliary>
            );
        });
    };

    render() {
        const select = <Select
            label="Right Answer Number"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: "1", value: 1},
                {text: "2", value: 2},
                {text: "3", value: 3},
                {text: "4", value: 4}
            ]}
        />;

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Create a Quiz</h1>
                    <form onSubmit={this.submitHandler}>

                        {this.renderInputs()}

                        {select}

                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Add Quiz Question &nbsp;&nbsp;<i className="fa fa-plus-circle"/>
                        </Button>

                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={this.state.quiz.length === 0}
                        >
                            Create the Quiz
                        </Button>

                    </form>
                </div>
            </div>
        );
    };
}

export default QuizCreator;