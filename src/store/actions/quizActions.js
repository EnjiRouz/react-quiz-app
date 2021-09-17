import axios from "../../axios/axios-quiz";
import {
    FETCH_START,
    FETCH_FAILED,
    FETCH_QUIZ_LIST_SUCCEED,
    FETCH_QUIZ_SUCCEED,
    QUIZ_SET_STATE,
    QUIZ_FINISHED,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY
} from "./actionTypes";

export function fetchQuizList() {
    return async dispatch => {
        dispatch(fetchStart());

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
            dispatch(fetchFailed(error));
        }
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchStart());

        try {
            const response = await axios.get(`quizList/${quizId}.json`);
            const quiz = response.data;

            dispatch(fetchQuizSucceed(quiz));

        } catch (error) {
            dispatch(fetchFailed(error));
        }
    };
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().currentQuiz;

        // prevent event handles twice (on each click)
        let currentState = state.answerState;
        if (currentState) {
            const key = Object.keys(currentState)[0];
            if (currentState[key] === "success") return;
        }

        // initialize variables
        let activeQuestionNumber = state.activeQuestionNumber;
        let currentQuiz = state.quiz[activeQuestionNumber];
        let isRightAnswerChosen = currentQuiz.rightAnswerId === answerId;
        let isFinalQuestion = activeQuestionNumber + 1 === state.quiz.length;

        // set answer state and first chosen result
        let answerState = isRightAnswerChosen ? "success" : "error";
        let results = state.results;
        if (!results[currentQuiz.id]) results[currentQuiz.id] = answerState;
        dispatch(quizSetState({[answerId]: answerState}, results));

        // control colors changing and final state
        if (isRightAnswerChosen) {
            const timeout = window.setTimeout(() => {
                if (isFinalQuestion)
                    dispatch(finishQuiz());
                else {
                    let nextQuestionNumber = activeQuestionNumber + 1;
                    dispatch(quizNextQuestion(nextQuestionNumber, state.quiz[nextQuestionNumber]));
                }

                window.clearTimeout(timeout);
            }, 500);
        }
    }
}

export function fetchStart() {
    return {
        type: FETCH_START
    }
}

export function fetchFailed(error) {
    return {
        type: FETCH_FAILED,
        error: error
    }
}

export function fetchQuizListSucceed(quizList) {
    return {
        type: FETCH_QUIZ_LIST_SUCCEED,
        quizList: quizList
    }
}

export function fetchQuizSucceed(quiz) {
    return {
        type: FETCH_QUIZ_SUCCEED,
        quiz: quiz,
        currentQuizQuestion: quiz[0]
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState: answerState,
        results: results
    }
}

export function quizNextQuestion(nextQuestionNumber, nextQuizQuestion) {
    return {
        type: QUIZ_NEXT_QUESTION,
        activeQuestionNumber: nextQuestionNumber,
        currentQuizQuestion: nextQuizQuestion
    }
}

export function finishQuiz() {
    return {
        type: QUIZ_FINISHED
    }
}

export function retryQuiz() {
    return (dispatch, getState) => {
        const state = getState().currentQuiz;
        dispatch(resetQuizState(state.quiz[0]));
    }
}

export function resetQuizState(firstQuizQuestion) {
    return {
        type: QUIZ_RETRY,
        currentQuizQuestion: firstQuizQuestion
    }
}