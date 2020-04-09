import React from 'react';
import './Question.css'
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

export default class Question extends React.Component {

    constructor(props) {
        super(props);
        const id = props.question.id + '';
        this.state = {
            id,
            [id]: '',
            answered: false,
        };
    }

    handleChange = (e) => {
        const value = e.target.value;
        const question = this.props.question;
        this.setState({
            [e.target.name]: value,
            answered: value.length !== 0,
            isDirty: true
        });
        this.props.onUserRespond(question.id, value);
    };

    getQuestion(question) {
        switch (question.optionsType) {
            case 'multipleChoice':
                return (
                    <FormControl>
                        <RadioGroup name={this.state.id} value={this.state[this.state.id]} onChange={this.handleChange}>
                            {
                                question.options.map((option, i) => (
                                    <FormControlLabel key={i} value={option} control={<Radio />} label={option} />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                );
            case 'textBox': // TODO: change htmlFor to this.state.id
                return (
                    <FormControl fullWidth>
                        <InputLabel htmlFor={this.state.id}>Response</InputLabel>
                        <Input multiline fullWidth name={this.state.id} value={this.state[this.state.id]} onChange={this.handleChange} />
                    </FormControl>
                );
            default:
                return '';
        }
    }

    render = () => {
        return (
            <Card className="questionCard">
                <h2 className={!this.state.answered && this.props.isDirty ? 'warning' : ''}>
                    {this.props.question.title}
                </h2>
                <div>
                    {this.getQuestion(this.props.question)}
                </div>
            </Card>
        )
    }
}

Question.propTypes = {
    question: PropTypes.object.isRequired,
    onUserRespond: PropTypes.func.isRequired,
    isDirty: PropTypes.bool.isRequired
};
