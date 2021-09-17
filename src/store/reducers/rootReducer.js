import {combineReducers} from "redux";
import quizReducer from "./quizReducer";
import quizCreatorReducer from "./quizCreatorReducer";

export default combineReducers({
    currentQuiz: quizReducer,
    quizCreator: quizCreatorReducer
});