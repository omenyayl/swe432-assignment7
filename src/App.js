import React from 'react';
import './App.css';
import Survey from "./components/survey/Survey";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Results from "./components/results/Results";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from 'axios';
import SnackBar from "@material-ui/core/Snackbar/Snackbar";
import Alert from "@material-ui/lab/Alert/Alert";

const API_URL = "http://localhost:8080/assignment7";

export default class App extends React.Component {

    state = {
        responsesArray: [],
        isLoading: false,
        networkError: false,
        snackbarShown: false
    };

    handleClose = () => {
        this.setState({
            snackbarShown: false
        })
    };

    onUserSubmit = (history, responsesArray) => {
        this.setState({
            isLoading: true
        });
        axios.post(API_URL, responsesArray)
            .then(res => {
                this.setState({
                    responsesArray: Array.from(res.data),
                    isLoading: false,
                });
                history.push("/results")
            })
            .catch(e => {
                console.error(e);
                this.setState({
                    isLoading: false,
                    snackbarShown: true,
                    networkError: true
                });
            });
    };

    renderRoot = ({ history }) => {
        return (
            <div>
                <Survey isLoading={this.state.isLoading} onUserSubmit={this.onUserSubmit.bind(this, history)}/>
                <CircularProgress className={this.state.isLoading ? '' : 'hidden'} style={{marginLeft: '0.5em'}} />
                <SnackBar
                    open={this.state.networkError && this.state.snackbarShown}
                    onClose={this.handleClose}
                    autoHideDuration={5000}>
                    <Alert severity="error">A network error occurred, please try again later.</Alert>
                </SnackBar>
            </div>
        )
    };

    renderResults = ({ history }) => {
        if (this.state.responsesArray.length === 0) { // if responses empty
            history.push("/")
        }
        return (
            <Results responsesArray={this.state.responsesArray}/>
        )
    };

    render() {
      return (
          <Router>
              <Container className="mainContainer">
                  <Switch>
                      <Route exact path="/" render={this.renderRoot} />
                      <Route exact path="/results" render={this.renderResults} />
                  </Switch>
              </Container>
          </Router>
      );
    }
}


