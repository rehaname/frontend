import React, { Component } from 'react';
import { reduxForm, FieldArray, Field } from "redux-form";
import { Form, Button, Icon } from 'antd';
import { TextField } from 'redux-form-antd';

class TechDebtPage extends Component {
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
            {(touched || submitFailed) && error && <span>{error}</span>}
            {fields.map((member, index) => (
                <Form.Item key={index}>
                    <Form.Item
                        key={index}
                        component={this.renderField}
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 11 }}
                    >
                        {/* <Icon
                            type="minus-circle-o"
                            title="Remove Member"
                            onClick={() => fields.remove(index)}
                        /> */}
                        <Field name={`${member}.name`} component={TextField} placeholder="Tech Debt Name" />
                    </Form.Item>
                </Form.Item>
            ))}
            <Button type="button" onClick={() => fields.push({})} >Add Tech Debt</Button> 
        </div>
    );

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <FieldArray name="members" component={this.renderMembers} />
            </Form>);
    }
}
export default (reduxForm({
    form: "techDebtForm"
})(TechDebtPage));