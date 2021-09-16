import axios from "axios";

export default axios.create({
    baseURL: "https://react-quiz-app-c469d-default-rtdb.europe-west1.firebasedatabase.app/"
})