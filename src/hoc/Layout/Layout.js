import React, {Component} from "react";
import {connect} from "react-redux";
import classes from "./Layout.module.css";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

class Layout extends Component {

    state = {
        isMenuOpen: false
    };

    toggleMenuHandler = () => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        })
    };

    menuCloseHandler = () => {
        this.setState({
            isMenuOpen: false
        })
    };

    render() {
        return (
            <div className={classes.Layout}>
                <Drawer
                    isMenuOpen={this.state.isMenuOpen}
                    onClose={this.menuCloseHandler}
                    isAuthenticated={this.props.isAuthenticated}
                />
                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isMenuOpen={this.state.isMenuOpen}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: Boolean(state.authControl.authToken)
    }
}

export default connect(mapStateToProps)(Layout);