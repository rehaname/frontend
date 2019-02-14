import { reduxForm, FieldArray, Field } from "redux-form";
import { Form, Button, Icon, Table, Input } from 'antd';
import { TextField } from 'redux-form-antd';
import React, { Component } from "react";
import { connect } from "react-redux";
import * as PairingActions from "./PairingActions";
import { clone, shuffle } from "lodash";

class PairingPage extends Component {
    renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
        <div>
            <Button type="button" onClick={() => fields.push({})} style={{ width: '33.4%' }}>Add Member</Button>
            {(touched || submitFailed) && error && <span>{error}</span>}
            {fields.map((member, index) => (
                <Form.Item key={index}
                    wrapperCol={{ span: 8 }}
                >
                    <Field name={`${member}.name`} placeholder="Member's Name" component={TextField} />
                    <Icon style={{ position: 'absolute', marginTop: -50, marginLeft: 575 }}
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        title="Remove Member"
                        onClick={() => fields.remove(index)}
                    />
                </Form.Item>
            ))}
        </div>
    );

    createMatrix = () => {
        const pairingsData = this.props.state.pairings,
            pairs = pairingsData.pairingRows,
            pairingMatrixRows = clone(pairingsData.rows).reverse(),
            pairingMatrixCols = clone(pairingsData.columns);
        pairingMatrixCols.shift();
        pairs.forEach(function (pair) {
            if (pair.name1 !== '') {
                const nameIndex = pairingMatrixRows.findIndex(a => a.name === pair.name),
                    name1Index = pairingMatrixCols.findIndex(a => a.title === pair.name1);
                if (((nameIndex === name1Index && name1Index < 2) || (nameIndex < name1Index) && name1Index !== pairingMatrixCols.length - 1) || name1Index === 0) {
                    pairingMatrixRows[nameIndex][pair.name1] = 1;
                } else {
                    pairingsData.rows[name1Index][pair.name] = 1;
                }
            }
        });

        return (
            <Table columns={pairingsData.columns} dataSource={pairingMatrixRows} bordered />
        );
    }

    generatePairs = () => {
        const pairingsData = this.props.state.pairings;
        return (
            <Table columns={pairingsData.pairingColumn} dataSource={pairingsData.pairingRows} bordered size="small" />
        );
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Item
                    wrapperCol={{ span: 8 }}
                >
                    <Field name="iterationName" component={TextField} placeholder="Iteration Name" />
                </Form.Item>
                <FieldArray name="members" component={this.renderMembers} />< br />
                <div>
                    <Button type="primary" htmlType="submit" disabled={submitting}>Create Matrix</Button>&nbsp;
                    <Button type="primary" disabled={pristine || submitting} onClick={reset}>
                        Clear Values
                    </Button>
                </div>
                < br />
                {this.props.submitSucceeded ? this.generatePairs() : null}
                {this.props.submitSucceeded ? this.createMatrix() : null}
            </Form>);
    }
}

function mapStateToProps(state) {
    return {
        data: state.pairings.data,
        state: state
    };
}

function getShuffledRows(members) {
    var newRows = clone(members),
        shuffledRows = shuffle(newRows);
    return shuffledRows;
}

const mapDispatchToProps = dispatch => ({
    onSubmit(values) {
        dispatch(PairingActions.addNewMatrix(values));
        Object.entries(values.members).forEach(([key, value]) => {
            var reversed = clone(values.members).reverse(),
                obj = { name: value };
            obj.reversedName = reversed[key];
            dispatch(PairingActions.mapMembersToTable(value));
        });
        getShuffledRows(values.members).reduce(function (result, value, index, array) {
            if (index % 2 === 0) {
                dispatch(PairingActions.mapPairsToTable(array.slice(index, index + 2)));
            }
        }, []);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: "pairingForm"
})(PairingPage));