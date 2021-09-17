import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import classes from "./QuizList.module.css";
import {fetchQuizList} from "../../store/actions/quizActions";
import Loader from "../../components/UI/Loader/Loader";

class QuizList extends Component {

    componentDidMount() {
        this.props.fetchQuizList();
    }

    renderQuizList() {
        return this.props.quizList.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={"/quiz/" + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            );
        });
    };

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Choose a Quiz</h1>

                    {
                        this.props.isLoading && this.props.quizList.length > 0
                            ? <Loader/>
                            : <ul>
                                {this.renderQuizList()}
                            </ul>
                    }

                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        quizList: state.currentQuiz.quizList,
        isLoading: state.currentQuiz.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizList: () => dispatch(fetchQuizList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);