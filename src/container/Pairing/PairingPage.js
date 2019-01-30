import { reduxForm, FieldArray, Field } from "redux-form";
import { Form, Button, Icon, Table } from 'antd';
import { TextField } from 'redux-form-antd';
import React, { Component } from "react";
import { connect } from "react-redux";
import * as PairingActions from "./PairingActions";

const columns = [{
    dataIndex: 'name'
},
{
    title: 'Kat'
}, {
    title: 'Kat1'
}, {
    title: 'Kat2'
}];

const data = [{
    key: '1',
    name: 'Kat2'
}, {
    key: '2',
    name: 'Kat1'
}, {
    key: '3',
    name: 'Kat',
}];


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

    matrix() {
        return (
            <Table columns={columns} dataSource={data} />
        );
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        console.log(this.props.submitSucceeded);
        console.log('asdjahsjdkhasd');
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
                {this.props.submitSucceeded
                    ? <this.matrix />
                    : null
                }
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
        alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: "pairingForm"
})(PairingPage));