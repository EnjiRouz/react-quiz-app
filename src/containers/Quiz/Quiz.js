import React, {Component} from "react";
import classes from "./Quiz.module.css"

import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
    state = {
        activeQuestionNumber: 0,
        isQuizFinished: false,
        answerState: null, // { [id]: "success"/"error" } - current state
        results: {}, // { [id]: "success"/"error" } - all first states
        quiz: [
            {
                id: 1,
                question: "What color is the sky?",
                rightAnswerId: 2,
                answers: [
                    {id: 1, text: "Black"},
                    {id: 2, text: "Blue"},
                    {id: 3, text: "Red"},
                    {id: 4, text: "Green"}
                ]
            },
            {
                id: 2,
                question: "What color is the sun?",
                rightAnswerId: 1,
                answers: [
                    {id: 1, text: "Yellow"},
                    {id: 2, text: "Green"},
                    {id: 3, text: "Grey"}
                ]
            },
        ]
    };

    onAnswerClickHandler = answerId => {
        // prevent event handles twice (on each click)
        let currentState = this.state.answerState;
        if (currentState) {
            const key = Object.keys(currentState)[0];
            if (currentState[key] === "success") return;
        }

        // initialize variables
        let activeQuestionNumber = this.state.activeQuestionNumber;
        let currentQuiz = this.state.quiz[activeQuestionNumber];
        let isRightAnswerChosen = currentQuiz.rightAnswerId === answerId;
        let isFinalQuestion = activeQuestionNumber + 1 === this.state.quiz.length;

        // set answer state and first chosen result
        let answerState = isRightAnswerChosen ? "success" : "error";
        let results = this.state.results;
        if (!results[currentQuiz.id]) results[currentQuiz.id] = answerState;
        this.setState({
            answerState: {[answerId]: answerState},
            results
        });

        // control colors changing and final state
        if (isRightAnswerChosen) {
            const timeout = window.setTimeout(() => {
                if (isFinalQuestion) {
                    this.setState({
                        isQuizFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestionNumber: this.state.activeQuestionNumber + 1,
                        answerState: null
                    });
                }
                window.clearTimeout(timeout);
            }, 500);
        }
    };

    retryHandler = () => {
        this.setState({
            activeQuestionNumber: 0,
            isQuizFinished: false,
            answerState: null,
            results: {}
        })
    };

    render() {
        let activeQuestionNumber = this.state.activeQuestionNumber;
        let currentQuiz = this.state.quiz[activeQuestionNumber];

        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    {
                        this.state.isQuizFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                            : <ActiveQuiz
                                questionNumber={activeQuestionNumber + 1}
                                question={currentQuiz.question}
                                answers={currentQuiz.answers}
                                onAnswerClick={this.onAnswerClickHandler}
                                answerState={this.state.answerState}
                                quizLength={this.state.quiz.length}
                            />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz;