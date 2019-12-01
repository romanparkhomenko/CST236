import React, { Component } from 'react';
import { render } from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';


export default class FormModule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allFields: [],
            formSuccessStatus: false,
            formResponse: '',
        };

    }

    productInfoFields = [
        {
            label: 'Product Name',
            element: 'input',
            type: 'text',
            name: 'name',
            placeholder: 'Name',
            value: '',
        },
        {
            label: 'Price',
            element: 'input',
            type: 'number',
            name: 'price',
            placeholder: 'Price',
            value: '',
        },
        {
            label: 'Description',
            element: 'input',
            type: 'textarea',
            name: 'description',
            placeholder: 'Product Description',
            value: '',
        },
        {
            label: 'Category',
            element: 'input',
            type: 'number',
            name: 'category_id',
            placeholder: 'Category',
            value: '',
        },
    ];

    userInfoFields = [
        {
            label: 'Username',
            element: 'input',
            type: 'text',
            name: 'username',
            placeholder: 'Username',
            value: '',
        },
        {
            label: 'Email',
            element: 'input',
            type: 'email',
            name: 'email',
            placeholder: 'Email Address',
            value: '',
        },
        {
            label: 'First Name',
            element: 'input',
            type: 'text',
            name: 'firstname',
            placeholder: 'First Name',
            value: '',
        },
        {
            label: 'Last Name',
            element: 'input',
            type: 'text',
            name: 'lastname',
            placeholder: 'Last Name',
            value: '',
        },
        {
            label: 'Admin?',
            element: 'input',
            type: 'checkbox',
            name: 'admin',
            placeholder: 'admin',
            value: '',
        },
    ];

    componentDidMount() {
        this.getAllFields();
    }

    getAllFields = () => {
        let allFields = [];
        const {useProductFields, useUserInfoFields} = this.props;
        if (useProductFields) {
            allFields = allFields.concat(this.productInfoFields);
        }
        if (useUserInfoFields) {
            allFields = allFields.concat(this.userInfoFields);
        }
        this.setState({
            allFields,
        });
    };

    getInitialValues = inputFields => {
        const initialValues = {};
        inputFields.forEach(field => {
            if (!initialValues[field.name]) {
                initialValues[field.name] = field.value;
            }
        });
        return initialValues;
    };

    handleFormSubmission = (values, actions) => {
        let {methodURL} = this.props;

        if (this.props.productID !== null && this.props.productID !== undefined) {
            values.id = this.props.productID;
        }

        if (this.props.userID !== null && this.props.userID !== undefined) {
            values.id = this.props.userID;
            values.admin = values.admin === true ? "1" : "0";
        }

        fetch(methodURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json, application/x-www-form-urlencoded',
            },
            body: JSON.stringify(values),
        })
            .then(response => {
                if (response.status === 200) {
                    actions.setSubmitting(true);
                    this.setState({
                        formSuccessStatus: true,
                    });
                }
                return response.json();
            })
            .then(responseJson => {
                console.info(responseJson);
                actions.setSubmitting(false);
                this.setState({
                    formResponse: responseJson.message,
                });

                this.props.handleSuccess();
            })
            .catch(error => console.error('Error:', error));
    };

    getFieldClassname = (errors, touched) => {
        if (touched) {
            return errors ? 'is-invalid' : 'is-valid';
        }
        return '';
    };

    renderFieldsBlock = (errors, touched, fieldInputs, blockTitle, blockClass) => (
        <React.Fragment>
            <div className={blockClass}>
                {fieldInputs.map(field => (
                    <div className="form-field" key={field.name}>
                        <label htmlFor={field.name}>{field.label}</label>
                        <Field
                            name={field.name}
                            type={field.type}
                            className={this.getFieldClassname(errors[field.name], touched[field.name])}
                            placeholder={field.placeholder}
                        />
                        <ErrorMessage name={field.name} component="div" className="error-message" />
                    </div>
                ))}
            </div>
        </React.Fragment>
    );

    renderFields = (errors, touched) => {
        const {useProductFields, useUserInfoFields} = this.props;
        return (
            <React.Fragment>
                {useProductFields
                    ? this.renderFieldsBlock(
                        errors,
                        touched,
                        this.productInfoFields,
                        'Product Information',
                        'product-block',
                    )
                    : ''}
                {useUserInfoFields
                    ? this.renderFieldsBlock(
                        errors,
                        touched,
                        this.userInfoFields,
                        'User Information',
                        'user-block',
                    )
                    : ''}
            </React.Fragment>
        );
    };

    render() {
        const { allFields, formSuccessStatus, formResponse } = this.state;
        const initialValues = this.getInitialValues(allFields);
        return (
            <React.Fragment>
                <div className={`${this.props.formTitle} store-form`}>
                    <h3>{this.props.formTitle}</h3>
                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        onSubmit={(values, formikActions) => {
                            this.handleFormSubmission(values, formikActions);
                        }}
                        render={({ ...formikProps }) => (
                            <Form>
                                {this.renderFields(formikProps.errors, formikProps.touched)}
                                <div className="form-field">
                                    <button
                                        type="submit"
                                        disabled={formikProps.isSubmitting}
                                        className="submit-button"
                                    >
                                        {this.props.formTitle}
                                    </button>
                                </div>
                            </Form>
                        )}
                    />
                    <div className="form-response">
                        {formResponse}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
