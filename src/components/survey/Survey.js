import React from 'react';
import '../../App.css'
import { Container } from '@material-ui/core'
import Questions from "../questions/Questions";
import questions from "../../data/questions";
import Button from "@material-ui/core/Button";
import SnackBar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert';
import { Link as MatLink }from "@material-ui/core";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class Survey extends React.Component {
    responses = {};

    onUserRespond = (id, response) => {
        this.responses[id] = response;
    };

    state = {
        questions,
        responsesValid: false,
        userHitSubmit: false,
        snackbarShown: false
    };

    handleClose = () => {
        this.setState({
            snackbarShown: false
        })
    };

    render() {
        return (
            <div>
                <h1> Assignment 7 <MatLink href="https://github.com/omenyayl/swe432-assignment7">SOURCE</MatLink></h1>
                <form onSubmit={this.onUserSubmit}>
                    <Questions
                        userHitSubmit={this.state.userHitSubmit}
                        onUserRespond={this.onUserRespond}
                        questions={this.state.questions}/>
                    <div className="two-grid">
                        <Button style={{marginLeft: "0.5em"}}
                                type="submit"
                                variant="contained"
                                disabled={this.props.isLoading}
                                color="primary">Submit</Button>
                        <CircularProgress className={this.props.isLoading ? '' : 'hidden'} style={{marginLeft: '0.5em'}} />
                    </div>
                    <SnackBar
                        open={!this.state.responsesValid && this.state.userHitSubmit && this.state.snackbarShown}
                        onClose={this.handleClose}
                        autoHideDuration={5000}>
                        <Alert severity="error">Please respond to the highlighted questions</Alert>
                    </SnackBar>
                </form>
            </div>
        )
    }

    responsesValid() {
        const questions = this.state.questions;
        const responses = this.responses;
        let valid = true;
        for (let question of questions) {
            if (!responses[question.id] ||
                responses[question.id].length === 0) {
                valid = false;
                break;
            }
        }
        return valid;
    }

    onUserSubmit = (e) => {
        e.preventDefault();
        const responsesValid = this.responsesValid();
        this.setState({
            userHitSubmit: true,
            snackbarShown: true,
            responsesValid: responsesValid
        });
        if (responsesValid) {
            const responsesArray = [];
            for (let id in this.responses) {
                if (this.responses.hasOwnProperty(id)) {
                    responsesArray.push({
                        id,
                        response: this.responses[id]
                    })
                }
            }
            this.props.onUserSubmit(responsesArray);
        }
    };

}

Survey.propTypes = {
    onUserSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
};
