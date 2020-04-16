import React from 'react';
import '../../App.css'
import PropTypes from "prop-types";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

export default class Responses extends React.Component {

    render() {
        return (
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Question No.</strong></TableCell>
                            <TableCell><strong>Response</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.responsesArray.map(response =>
                            <TableRow key={response.id}>
                                <TableCell>{response.id}</TableCell>
                                <TableCell>{response.response}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

Responses.propTypes = {
    responsesArray: PropTypes.array.isRequired
};
