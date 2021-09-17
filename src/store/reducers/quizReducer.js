import {FETCH_QUIZ_LIST_START, FETCH_QUIZ_LIST_SUCCEED, FETCH_QUIZ_LIST_FAILED} from "../actions/actionTypes";

const initialState = {
    quizList: [],
    isLoading: false,
    error: null
};

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZ_LIST_START:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_QUIZ_LIST_SUCCEED:
            return {
                ...state,
                isLoading: false,
                quizList: action.quizList
            };
        case FETCH_QUIZ_LIST_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return state;
    }
}