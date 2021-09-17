import axios from "../../axios/axios-quiz";
import {FETCH_QUIZ_LIST_START, FETCH_QUIZ_LIST_SUCCEED, FETCH_QUIZ_LIST_FAILED} from "./actionTypes";

export function fetchQuizList() {
    return async dispatch => {
        dispatch(fetchQuizListStart());

        try {
            const response = await axios.get("quizList.json");
            const quizList = [];

            Object.keys(response.data).forEach((key, index) => {
                quizList.push({
                    id: key,
                    name: `Quiz #${index + 1}`
                });
            });

            dispatch(fetchQuizListSucceed(quizList))

        } catch (error) {
            dispatch(fetchQuizListFailed(error));
        }
    }
}

export function fetchQuizListStart() {
    return {
        type: FETCH_QUIZ_LIST_START
    }
}

export function fetchQuizListSucceed(quizList) {
    return {
        type: FETCH_QUIZ_LIST_SUCCEED,
        quizList: quizList
    }
}

export function fetchQuizListFailed(error) {
    return {
        type: FETCH_QUIZ_LIST_FAILED,
        error: error
    }
}