import React, {Component} from "react";
import classes from "./Drawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [1, 2, 3];

class Drawer extends Component {
    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <a href={""}>Link {link}</a>
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
