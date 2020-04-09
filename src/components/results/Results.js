import React from 'react';
import '../../App.css'
import PropTypes from "prop-types";
import Responses from "../response/Responses";

Responses.propTypes = {
    responsesArray: PropTypes.object.isRequired
};

export default class Results extends React.Component {
    state = {
    };

    render() {
        return (
            <div>
                <h1>
                    Your Responses
                </h1>
                <Responses responsesArray={this.props.responsesArray}/>
            </div>
        )
    }
}

Results.propTypes = {
    responsesArray: PropTypes.any.isRequired
};
