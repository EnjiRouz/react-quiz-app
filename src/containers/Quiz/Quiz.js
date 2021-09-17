import React, {Component} from "react";
import {connect} from "react-redux";
import classes from "./Quiz.module.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quizActions";

class Quiz extends Component {

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.retryQuiz();
    }

    onAnswerClickHandler = answerId => {
        this.props.quizAnswerClick(answerId);
    };

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    {
                        this.props.isLoading || !this.props.quiz
                            ? <Loader/>
                            :
                            this.props.isQuizFinished
                                ? <FinishedQuiz
                                    results={this.props.results}
                                    quiz={this.props.quiz}
                                    onRetry={this.props.retryQuiz}
                                />
                                : <ActiveQuiz
                                    questionNumber={this.props.activeQuestionNumber + 1}
                                    question={this.props.currentQuizQuestion.question}
                                    answers={this.props.currentQuizQuestion.answers}
                                    onAnswerClick={this.onAnswerClickHandler}
                                    answerState={this.props.answerState}
                                    quizLength={this.props.quiz.length}
                                />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeQuestionNumber: state.currentQuiz.activeQuestionNumber,
        isQuizFinished: state.currentQuiz.isQuizFinished,
        answerState: state.currentQuiz.answerState, // { [id]: "success"/"error" } - current state
        results: state.currentQuiz.results, // { [id]: "success"/"error" } - all first states
        quiz: state.currentQuiz.quiz,
        currentQuizQuestion: state.currentQuiz.currentQuizQuestion,
        isLoading: state.currentQuiz.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: quizId => dispatch(fetchQuizById(quizId)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);