import { reduxForm, FieldArray } from "redux-form";
import { Form, Input, Button, Icon } from 'antd';
import React from "react";
import submit from "./CreateMatrix";
import CreateMatrixButton from "./CreateMatrixButton";

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
                    name={`${member}.firstName`}
                    component={renderField}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 11 }}
                >
                    <Input />
                    <Icon
                        type="minus-circle-o"
                        title="Remove Member"
                        onClick={() => fields.remove(index)}
                    />
                </Form.Item>
            </Form.Item>
        ))}
    </ul>
);

const Pairing = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Item
                label="Iteration Name"
                name="iterationName"
                component={renderField}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 11 }}
            >
                <Input />
            </Form.Item>
            <FieldArray name="members" component={renderMembers} />
            <div>
                {/* <Button type="submit" disabled={submitting}>Submit</Button> */}
                <Button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
          </Button>
            </div>
            <CreateMatrixButton />
        </Form>
    );
};


export default reduxForm({
    form: "pairingForm",
    onSubmit: submit
})(Pairing);