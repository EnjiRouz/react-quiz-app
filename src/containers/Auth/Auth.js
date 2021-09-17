import React, {Component} from "react";
import {connect} from "react-redux";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {isFromValid, isValueValid} from "../../form/formFramework";
import {auth} from "../../store/actions/authActions";

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: "",
                type: "email",
                label: "Email",
                errorMessage: "Invalid Email",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: "",
                type: "password",
                label: "Password",
                errorMessage: "Wrong Password",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    };

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        );
    };

    signUpHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        );
    };

    submitHandler = event => {
        event.preventDefault();
    };

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls};
        const formControl = {...formControls[controlName]};

        formControl.value = event.target.value;
        formControl.touched = true;
        formControl.valid = isValueValid(formControl.value, formControl.validation);

        formControls[controlName] = formControl;
        this.setState({
            formControls: formControls,
            isFormValid: isFromValid(formControls)
        })
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((formControlName, index) => {
            const formControl = this.state.formControls[formControlName];
            return (
                <Input
                    key={formControlName + index}
                    type={formControl.type}
                    value={formControl.value}
                    label={formControl.label}
                    errorMessage={formControl.errorMessage}
                    valid={formControl.valid}
                    touched={formControl.touched}
                    shouldValidate={Boolean(formControl.validation)}
                    onChange={event => this.onChangeHandler(event, formControlName)}
                />
            );
        });
    };

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Log In</h1>
                    <form action="" onSubmit={this.submitHandler} className={classes.AuthForm}>

                        {this.renderInputs()}

                        <Button
                            type={"success"}
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Log In
                        </Button>

                        <Button
                            type={"primary"}
                            onClick={this.signUpHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Sign Up
                        </Button>
                    </form>
                </div>
            </div>
        );
    };
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogIn) => dispatch(auth(email, password, isLogIn))
    }
}

export default connect(null, mapDispatchToProps)(Auth);