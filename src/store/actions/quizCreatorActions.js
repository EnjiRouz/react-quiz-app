import axios from "../../axios/axios-quiz";
import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATOR} from "./actionTypes";

export function createQuizQuestion(quizItem) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item: quizItem
    };
}

export function createQuiz() {
    return async (dispatch, getState) => {
        await axios.post("quizList.json", getState().quizCreator.quiz);
        dispatch(resetQuizCreator());
    }
}

export function resetQuizCreator() {
    return {
        type: RESET_QUIZ_CREATOR
    }
}