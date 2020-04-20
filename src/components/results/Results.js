import React from 'react';
import '../../App.css'
import PropTypes from "prop-types";
import Responses from "../response/Responses";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Menu from "@material-ui/icons/Menu";
import BarChart from "@material-ui/icons/BarChart";
import ResultsAggregate from "../results-aggregate/ResultsAggregate"

Responses.propTypes = {
    responsesArray: PropTypes.object.isRequired
};

const ResultsList = ({ submissionsArray }) => {
    return (
        <div>
            {submissionsArray.map((submission, i) => (
                <div key={i}>
                    <Card>
                        <CardContent>
                            <Responses responsesArray={submission.responses}/>
                        </CardContent>
                    </Card>
                    <br/>
                </div>
            ))}
        </div>
    )
};
ResultsList.propTypes = {
    submissionsArray: PropTypes.array.isRequired
};

const Results = ({ submissionsArray }) => {
    const [tabsValue, setTabsValue] = React.useState(0);

    const handleTabsValueChange = (event, newValue) => {
        setTabsValue(newValue);
    };

    return (
        <div>
            <h1>
                All Responses
            </h1>
            <Paper square style={{flexGrow: 3, width: '100%'}}>
                <Tabs
                    variant="fullWidth"
                    value={tabsValue}
                    indicatorColor="secondary"
                    textColor="secondary"
                    onChange={handleTabsValueChange}
                >
                    <Tab icon={<Menu/>} label="List"/>
                    <Tab icon={<BarChart/>} label="Aggregate"/>
                </Tabs>
            </Paper>
            <br/>
            {tabsValue === 0 ? 
                <ResultsList submissionsArray={submissionsArray}/> :
                <ResultsAggregate submissionsArray={submissionsArray}/>
            }
        </div>
    )
};

export default Results;

Results.propTypes = {
    submissionsArray: PropTypes.any.isRequired
};
