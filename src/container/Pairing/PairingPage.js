import { reduxForm, FieldArray, Field } from "redux-form";
import { Form, Button, Icon, Table } from 'antd';
import { TextField } from 'redux-form-antd';
import React, { Component } from "react";
import { connect } from "react-redux";
import * as PairingActions from "./PairingActions";
import { clone, shuffle } from "lodash";


class PairingPage extends Component {
    constructor() {
        super();
    }

    renderField = ({ input, label, type, meta: { touched, error } }) => (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} type={type} placeholder={label} />
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    );

    renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
        <div>
            <Button type="button" onClick={() => fields.push({})} >Add Member</Button>
            {(touched || submitFailed) && error && <span>{error}</span>}
            {fields.map((member, index) => (
                <Form.Item key={index}>
                    <Form.Item
                        key={index}
                        component={this.renderField}
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 11 }}
                    >
                        <Icon
                            type="minus-circle-o"
                            title="Remove Member"
                            onClick={() => fields.remove(index)}
                        />
                        <Field name={`${member}.name`} component={TextField} placeholder="Member's Name" />
                    </Form.Item>
                </Form.Item>
            ))}
        </div>
    );

    createMatrix = () => {
        const pairings = this.props.state.pairings;
        return (
            <Table columns={pairings.columns} dataSource={pairings.rows.reverse()} bordered />
        );
    }

    generatePairs = () => {
        const rows = this.props.state.pairings.rows;
        var newRows = clone(rows),
            shuffledRows = shuffle(newRows);

        var pairedRows = shuffledRows.reduce(function (result, value, index, array) {
            if (index % 2 === 0) {
                result.push(array.slice(index, index + 2));
            } 
            return result;
        }, []);
        console.log(pairedRows);
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Item
                    label="Iteration Name"
                    component={this.renderField}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 11 }}
                >
                    <Field name="iterationName" component={TextField} />
                </Form.Item>
                <FieldArray name="members" component={this.renderMembers} />
                <div>
                    <Button type="primary" htmlType="submit" disabled={submitting}>Create Matrix</Button>&nbsp;
                <Button type="primary" disabled={pristine || submitting} onClick={reset}>
                        Clear Values
          </Button>
                </div>
                {this.props.submitSucceeded ? this.createMatrix() : null}
                {this.props.submitSucceeded ? this.generatePairs() : null}
            </Form>);
    }
}

function mapStateToProps(state) {
    return {
        data: state.pairings.data,
        state: state
    };
}

const mapDispatchToProps = dispatch => ({
    onSubmit(values) {
        dispatch(PairingActions.addNewMatrix(values));
        Object.entries(values.members).forEach(([key, value]) =>
            dispatch(PairingActions.mapMembersToTable(value))
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: "pairingForm"
})(PairingPage));