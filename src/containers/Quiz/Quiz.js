import React, {Component} from "react";
import axios from "../../axios/axios-quiz";
import classes from "./Quiz.module.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {
    state = {
        activeQuestionNumber: 0,
        isQuizFinished: false,
        answerState: null, // { [id]: "success"/"error" } - current state
        results: {}, // { [id]: "success"/"error" } - all first states
        quiz: [],
        isLoading: true
    };

    async componentDidMount() {
        try {
            const response = await axios.get(`quizList/${this.props.match.params.id}.json`);
            const quiz = response.data;

            this.setState({
                quiz: quiz,
                isLoading: false
            });

        } catch (error) {
            console.log(error);
        }
    }

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
                        this.state.isLoading
                            ? <Loader/>
                            :
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