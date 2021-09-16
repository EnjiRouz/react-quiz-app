import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import classes from "./Drawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [
    {to: "/", label: "Home", exact: true},
    {to: "/auth", label: "Log In", exact: false},
    {to: "/quiz-creator", label: "Create Quiz", exact: false}
];

class Drawer extends Component {
    clickHandler = () => {
        this.props.onClose();
    };

    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        });
    };

    render() {
        const classNames = [classes.Drawer];
        if (!this.props.isMenuOpen)
            classNames.push(classes.close);

        return (
            <React.Fragment>
                <nav className={classNames.join(" ")}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isMenuOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        )
    }
}

export default Drawer;
