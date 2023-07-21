import React from "react";
import "./Navbar.css";

class Navbar extends React.Component {
    render() {
        return (
            <nav className="main-nav">
                <div></div>

                <span id="navbar-right-id">
                    <span className="navbar-buttons-right">
                        <button
                            style={{ borderLeft: `2px solid grey`}}
                            onClick={this.props.step}
                        >
                            Step
                        </button>
                        <button
                            style={{ borderLeft: `2px solid grey` }}
                            onClick={this.props.run}
                        >
                            Run
                        </button>
                    </span>
                </span>
            </nav>
        );
    }
}
export default Navbar;
