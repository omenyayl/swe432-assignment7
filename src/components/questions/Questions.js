import React from 'react';
import PropTypes from 'prop-types';
import './Questions.css'
import Question from "../question/Question";

export default class Questions extends React.Component {

    render() {
        return (
            this.props.questions.map((question) => (
                <Question
                    key={question.id}
                    isDirty={this.props.userHitSubmit}
                    question={question}
                    onUserRespond={this.props.onUserRespond}/>
            ))
        )
    }
}

Questions.propTypes = {
    questions: PropTypes.array.isRequired,
    userHitSubmit: PropTypes.bool.isRequired,
    onUserRespond: PropTypes.func.isRequired,
};
