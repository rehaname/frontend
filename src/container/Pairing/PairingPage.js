import { reduxForm, FieldArray, Field } from "redux-form";
import { Form, Input, Button, Icon } from 'antd';
import { TextField } from 'redux-form-antd';
import React from "react";
import submit from "./CreateMatrix";

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} type={type} placeholder={label} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>
);

const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
    <ul>
        <Button type="button" onClick={() => fields.push({})} >Add Member</Button>
        {(touched || submitFailed) && error && <span>{error}</span>}
        {fields.map((member, index) => (
            <Form.Item key={index}>
                <Form.Item
                    key={index}
                    label="Member's Name"
                    component={renderField}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 11 }}
                >
                    <Icon
                        type="minus-circle-o"
                        title="Remove Member"
                        onClick={() => fields.remove(index)}
                    />
                    <Field name={`${member}.name`} component={TextField} /> 
                </Form.Item>
            </Form.Item>
        ))}
    </ul>
);

const Pairing = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <Form onSubmit={handleSubmit(submit)}>
            <Form.Item
                label="Iteration Name"
                component={renderField}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 11 }}
            >
                <Field name="iterationName" component={TextField} />
            </Form.Item>
            <FieldArray name="members" component={renderMembers} />
            <div>
                <Button type="primary" htmlType="submit" disabled={submitting}>Create Matrix</Button>&nbsp;
                <Button type="primary" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
          </Button>
                {/* &nbsp;
                <CreateMatrixButton /> */}
            </div>
        </Form>
    );
};

export default reduxForm({
    form: "pairingForm"
})(Pairing);