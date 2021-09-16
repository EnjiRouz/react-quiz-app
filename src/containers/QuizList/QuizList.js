import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import axios from "../../axios/axios-quiz";
import classes from "./QuizList.module.css";
import Loader from "../../components/UI/Loader/Loader";

class QuizList extends Component {

    state = {
        quizList: [],
        isLoading: true
    };

    async componentDidMount() {
        try {
            const response = await axios.get("quizes.json");
            const quizList = [];

            Object.keys(response.data).forEach((key, index) => {
                quizList.push({
                    id: key,
                    name: `Quiz #${index + 1}`
                });
            });

            this.setState({
                quizList: quizList,
                isLoading: false
            })

        } catch (error) {
            console.log(error);
        }
    }

    renderQuizList() {
        return this.state.quizList.map(quiz => {
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
                        this.state.isLoading
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

export default QuizList;