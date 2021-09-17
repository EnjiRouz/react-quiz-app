import React, {Component} from "react";
import {connect} from "react-redux";
import classes from "./QuizCreator.module.css";
import {createControl, isFromValid, isValueValid} from "../../form/formFramework";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";
import {createQuizQuestion, createQuiz} from "../../store/actions/quizCreatorActions";

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
        formControls: createFormControls(),
        isFormValid: false
    };

    submitHandler = event => {
        event.preventDefault();
    };

    addQuestionHandler = () => {
        const {question, option1, option2, option3, option4} = this.state.formControls;
        const quizItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        };

        this.setState({
            rightAnswerId: 1,
            formControls: createFormControls(),
            isFormValid: false
        });

        this.props.createQuizQuestion(quizItem);
    };

    createQuizHandler = () => {
        this.setState({
            rightAnswerId: 1,
            formControls: createFormControls(),
            isFormValid: false
        });

        this.props.createQuiz();
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
                            disabled={this.props.quiz.length === 0}
                        >
                            Create the Quiz
                        </Button>

                    </form>
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        quiz: state.quizCreator.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: quizItem => dispatch(createQuizQuestion(quizItem)),
        createQuiz: () => dispatch(createQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);