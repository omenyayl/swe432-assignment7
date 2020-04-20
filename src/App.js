import React, {useEffect, useState} from 'react';
import './App.css';
import Survey from "./components/survey/Survey";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Results from "./components/results/Results";
import Container from "@material-ui/core/Container";
import axios from 'axios';
import SnackBar from "@material-ui/core/Snackbar/Snackbar";
import Alert from "@material-ui/lab/Alert/Alert";
import PropTypes from "prop-types";

const API_URL = "https://olegs-tech.space/assignment8";

const SurveyRoute = ({ history, onGetSubmissions}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarShown, setSnackbarShown] = useState(false);
    const [networkError, setNetworkError] = useState(false);

    const onUserSubmit = (responsesArray) => {
        const submission = {
            responses: responsesArray
        };
        setIsLoading(true);
        axios.post(API_URL, submission)
            .then(() => {
                axios.get(API_URL)
                    .then(res => {
                        onGetSubmissions(res.data);
                        history.push("/results")
                    });
            })
            .catch(e => {
                console.error(e);
                setNetworkError(true);
                setSnackbarShown(true);
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    return (
        <div>
            <Survey isLoading={isLoading} onUserSubmit={onUserSubmit}/>
            <SnackBar
                open={networkError && snackbarShown}
                onClose={() => { setSnackbarShown(false) }}
                autoHideDuration={3500}>
                <Alert severity="error">A network error occurred, please try again later.</Alert>
            </SnackBar>
        </div>
    )
};
SurveyRoute.propTypes = {
    history: PropTypes.object.isRequired,
    onGetSubmissions: PropTypes.func.isRequired
};

const ResultsRoute = ({ history, submissionsArray }) => {

    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        if (submissionsArray.length === 0) {
            axios.get(API_URL)
                .then(res => setSubmissions(res.data))
                .catch(e => console.error(e));
        }
    }, [submissionsArray.length]);

    if (submissionsArray.length === 0) { // if responses empty
        return (
            <Results submissionsArray={submissions}/>
        )
    }
    return (
        <Results submissionsArray={submissionsArray}/>
    )
};
ResultsRoute.propTypes = {
    history: PropTypes.object.isRequired,
    submissionsArray: PropTypes.array.isRequired
};


const App = () => {

    const [submissions, setSubmissions] = useState([]);

    return (
        <Router>
            <Container className="mainContainer">
                <Switch>
                    <Route exact path="/" render={({history}) => (
                        <SurveyRoute history={history} onGetSubmissions={setSubmissions} />
                    )}/>
                    <Route exact path="/results" render={({history}) => (
                        <ResultsRoute history={history} submissionsArray={submissions} />
                    )}/>
                </Switch>
            </Container>
        </Router>
    );
};

export default App;
