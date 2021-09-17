import React, {Component} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import Layout from "./hoc/Layout/Layout";
import Auth from "./containers/Auth/Auth";
import Logout from "./components/Logout/Logout";
import Quiz from "./containers/Quiz/Quiz";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";

import {autoLogin} from "./store/actions/authActions";

class App extends Component {

    componentDidMount() {
        this.props.autoLogin();
    }

    render() {
        let routes = (
            <Switch>
                <Route path={"/login"} component={Auth}/>
                <Route path={"/quiz/:id"} component={Quiz}/>
                <Route path={"/"} exact component={QuizList}/>
                <Redirect to={"/"}/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path={"/logout"} component={Logout}/>
                    <Route path={"/quiz-creator"} component={QuizCreator}/>
                    <Route path={"/quiz/:id"} component={Quiz}/>
                    <Route path={"/"} exact component={QuizList}/>
                    <Redirect to={"/"}/>
                </Switch>
            );
        }

        return (
            <Layout>
                {routes}
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: Boolean(state.authControl.authToken)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
