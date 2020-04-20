import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import "../../App.css";
import questions from "../../data/questions";
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

/**
 * Sum all of the responses for each multiple choice question
 * @param questions
 * @param submissions
 * @returns {Array<{title: string, optionResponses: Array<{title: string, sum: number}>}>}
 */
const getAggregatesArray = (questions, submissions) => {
    const aggregates = {};
    questions.forEach(question => {
        if (question.optionsType === 'multipleChoice') {
            const optionResponses = [];

            question.options.forEach(option => {
                optionResponses.push({
                    title: option,
                    sum: 0
                })
            });

            aggregates[question.id] = {
                title: question.title,
                optionResponses
            }
        }
    });

    submissions.forEach(submission => {
        submission.responses.forEach(response => {
            const questionID = response.id;
            const answer = response.response;
            if (aggregates[questionID]) {
                const optionResponses = aggregates[questionID].optionResponses;
                for (let i = 0; i < optionResponses.length; i++) {
                    const optionResponse = optionResponses[i];
                    if (optionResponse.title === answer) {
                        optionResponse.sum += 1;
                    }
                }
            }
        });
    });
    const aggregatesArray = [];
    Object.keys(aggregates).forEach(questionID => {
        aggregatesArray.push(aggregates[questionID]);
    });
    return aggregatesArray;
};

const QuestionAggregate = ({ questionResponses }) => {
    return (
        <Paper>
            <Chart data={questionResponses.optionResponses}>
                <ArgumentAxis />
                <ValueAxis tickInterval={1} />

                <BarSeries
                    valueField="sum"
                    argumentField="title"/>
                <Title text={questionResponses.title} />
                <Animation />
            </Chart>
        </Paper>
    )
};
QuestionAggregate.propTypes = {
    questionResponses: PropTypes.object.isRequired
};

const ResultsAggregate = ({ submissionsArray }) => {

    const [aggregatesArray, setAggregatesArray] = useState([]);

    useEffect(() => {
        setAggregatesArray(getAggregatesArray(questions, submissionsArray));
    }, [submissionsArray]);

    return (
        <div>
            {aggregatesArray.map((questionResponses, index) => {
                return (
                    <div key={index} >
                        <QuestionAggregate questionResponses={questionResponses}/>
                        <br/>
                    </div>
                )
            })}
        </div>
    )
};
ResultsAggregate.propTypes = {
    submissionsArray: PropTypes.array.isRequired
};

export default ResultsAggregate;
