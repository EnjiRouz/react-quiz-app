import {
    FETCH_START,
    FETCH_FAILED,
    FETCH_QUIZ_LIST_SUCCEED,
    FETCH_QUIZ_SUCCEED,
    QUIZ_SET_STATE,
    QUIZ_FINISHED,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY
} from "../actions/actionTypes";

const initialState = {
    quizList: [],
    isLoading: false,
    error: null,

    activeQuestionNumber: 0,
    currentQuizQuestion: {},
    isQuizFinished: false,
    answerState: null, // { [id]: "success"/"error" } - current state
    results: {}, // { [id]: "success"/"error" } - all first states
    quiz: null,
};

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_START:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        case FETCH_QUIZ_LIST_SUCCEED:
            return {
                ...state,
                isLoading: false,
                quizList: action.quizList
            };
        case FETCH_QUIZ_SUCCEED:
            return {
                ...state,
                isLoading: false,
                quiz: action.quiz,
                currentQuizQuestion: action.currentQuizQuestion
            };
        case QUIZ_SET_STATE:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results
            };
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                activeQuestionNumber: action.activeQuestionNumber,
                currentQuizQuestion: action.currentQuizQuestion,
                answerState: null
            };
        case QUIZ_FINISHED:
            return {
                ...state,
                isQuizFinished: true
            };
        case QUIZ_RETRY:
            return {
                ...state,
                currentQuizQuestion: action.currentQuizQuestion,
                activeQuestionNumber: 0,
                isQuizFinished: false,
                answerState: null,
                results: {}
            };
        default:
            return state;
    }
}