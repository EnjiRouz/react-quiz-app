import {combineReducers} from "redux";
import authReducer from "./authReducer";
import quizReducer from "./quizReducer";
import quizCreatorReducer from "./quizCreatorReducer";

export default combineReducers({
    authControl: authReducer,
    currentQuiz: quizReducer,
    quizCreator: quizCreatorReducer
});