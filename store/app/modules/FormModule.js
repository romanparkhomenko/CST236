import React, { Component } from 'react';
import { render } from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ImageUploader from 'react-images-upload';
import StarRatings from 'react-star-ratings';


export default class FormModule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allFields: [],
            formSuccessStatus: false,
            formResponse: '',
            pictures: [],
            rating: 0,
        };
    }

    productInfoFields = [
        {
            label: 'Product Name',
            element: 'input',
            type: 'text',
            name: 'name',
            placeholder: 'Name',
            value: this.props.activeProduct ? this.props.activeProduct.name : '',
        },
        {
            label: 'Price',
            element: 'input',
            type: 'number',
            name: 'price',
            placeholder: 'Price',
            value: this.props.activeProduct ? this.props.activeProduct.price : '',
        },
        {
            label: 'Description',
            element: 'input',
            type: 'textarea',
            name: 'description',
            placeholder: 'Product Description',
            value: this.props.activeProduct ? this.props.activeProduct.description : '',
        },
        {
            label: 'Category',
            element: 'input',
            type: 'select',
            name: 'category_id',
            placeholder: 'Category',
            value: this.props.activeProduct ? this.props.activeProduct.category_name : '',
        },
        {
            label: 'Image',
            element: 'input',
            type: 'file',
            name: 'image',
            placeholder: 'image',
            value: '',
        },
        {
            label: 'Image Name',
            element: 'input',
            type: 'text',
            name: 'imageName',
            placeholder: 'Image Name',
            value: '',
        },
    ];

    reviewFields = [
        {
            label: 'Product ID',
            element: 'input',
            type: 'number',
            name: 'products_id',
            placeholder: 'Product ID',
            value: this.props.activeProduct ? this.props.activeProduct.id : '',
        },
        {
            label: 'User ID',
            element: 'input',
            type: 'number',
            name: 'users_id',
            placeholder: 'User ID',
            value: this.props.activeUser ? this.props.activeUser.id : '',
        },
        {
            label: 'Review',
            element: 'input',
            type: 'textarea',
            name: 'review',
            placeholder: 'Product Review',
            value: '',
        },
        {
            label: 'Stars',
            element: 'input',
            type: 'text',
            name: 'stars',
            placeholder: 'stars',
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
            value: this.props.activeUser ? this.props.activeUser.username : '',
        },
        {
            label: 'Email',
            element: 'input',
            type: 'email',
            name: 'email',
            placeholder: 'Email Address',
            value: this.props.activeUser ? this.props.activeUser.email : '',
        },
        {
            label: 'Password',
            element: 'input',
            type: 'password',
            name: 'password',
            placeholder: 'Password',
            value: '',
        },
        {
            label: 'First Name',
            element: 'input',
            type: 'text',
            name: 'firstname',
            placeholder: 'First Name',
            value: this.props.activeUser ? this.props.activeUser.firstname : '',
        },
        {
            label: 'Last Name',
            element: 'input',
            type: 'text',
            name: 'lastname',
            placeholder: 'Last Name',
            value: this.props.activeUser ? this.props.activeUser.lastname : '',
        },
        {
            label: 'Admin?',
            element: 'input',
            type: 'checkbox',
            name: 'admin',
            placeholder: 'admin',
            value: this.props.activeUser ? this.props.activeUser.admin === "1" : '',
        },
    ];

    componentDidMount() {
        this.getAllFields();
    }

    getAllFields = () => {
        let allFields = [];
        const {useProductFields, useUserInfoFields, useReviewFields} = this.props;
        if (useProductFields) {
            allFields = allFields.concat(this.productInfoFields);
        }
        if (useUserInfoFields) {
            allFields = allFields.concat(this.userInfoFields);
        }
        if (useReviewFields) {
            allFields = allFields.concat(this.reviewFields);
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

    changeRating = (newRating, setFieldValue) => {
        console.info(newRating);
        setFieldValue('stars', newRating);
        this.setState({
            rating: newRating
        });
    };

    handleFormSubmission = (values, actions) => {
        let {methodURL, useReviewFields} = this.props;

        if (!useReviewFields) {
            if (this.props.productID !== null && this.props.productID !== undefined) {
                values.id = this.props.productID;
            }

            if (this.props.userID !== null && this.props.userID !== undefined) {
                values.id = this.props.userID;
                values.admin = values.admin === true ? "1" : "0";
            }
        } else {
            values.stars = values.stars.toFixed(2).toString();
        }

        fetch(methodURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json, application/x-www-form-urlencoded, multipart/form-data',
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

    onDrop = (picture, setFieldValue) => {
        if (picture.length > 0) {
            const file = picture[0];
            const reader = new FileReader();
            setFieldValue("imageName", file.name);
            reader.onload = function(item) {
                setFieldValue("image",  item.target.result);
            };

            reader.readAsDataURL(file);
            this.setState({
                pictures: file,
            });
        }
    };

    renderFieldsBlock = (errors, touched, setFieldValue, fieldInputs, blockTitle, blockClass) => (
        <React.Fragment>
            <div className={blockClass}>
                {fieldInputs.map(field => (
                    <React.Fragment key={field.name + field.label}>
                        {field.name !== 'image' ?
                            <React.Fragment key={field.name + field.label}>
                                {field.type !== 'select' ?
                                    <div className="form-field" key={field.name + field.label}>
                                        <label htmlFor={field.name}>{field.label}</label>
                                        <Field
                                            name={field.name}
                                            type={field.type}
                                            className={this.getFieldClassname(errors[field.name], touched[field.name])}
                                            placeholder={field.placeholder}
                                            disabled={field.name === 'imageName' ? 'disabled' : ''}
                                        />
                                        <ErrorMessage name={field.name} component="div" className="error-message" />
                                    </div>
                                    :
                                    <div className="form-field" key={field.name + field.label}>
                                        <label htmlFor={field.name}>{field.label}</label>
                                        <select
                                            className={this.getFieldClassname(errors[field.name], touched[field.name])}
                                            placeholder={field.placeholder}
                                            name={field.name}
                                            id={field.name}
                                            onChange={(e) => {
                                                let value = e.target.value;
                                                setFieldValue('category_id', value);
                                            }}
                                        >
                                            <option value="">Please select a category</option>
                                            <option value="1">Consoles</option>
                                            <option value="2">Accessories</option>
                                            <option value="3">Games</option>
                                            <option value="4">Televisions</option>
                                        </select>
                                        <ErrorMessage name={field.name} component="div" className="error-message" />
                                    </div>
                                }
                            </React.Fragment>
                            :
                            <div className="form-field image-uploader" key={field.name}>
                                <ImageUploader
                                    withIcon={false}
                                    buttonText='Choose images'
                                    singleImage={true}
                                    onChange={(picture) => this.onDrop(picture, setFieldValue)}
                                    withPreview={true}
                                    name='image'
                                    imgExtension={['.jpg', '.jpeg', '.png', '.gif']}
                                    maxFileSize={5242880}
                                />
                            </div>
                        }
                    </React.Fragment>
                ))}
            </div>
        </React.Fragment>
    );

    renderReviewFieldsBlock = (errors, touched, setFieldValue, fieldInputs, blockTitle, blockClass) => (
        <React.Fragment>
            <div className={blockClass}>
                {fieldInputs.map(field => (
                    <React.Fragment key={field.name + field.label}>
                        {field.name !== 'stars' ?
                            <React.Fragment key={field.name + field.label}>
                                {field.type === 'textarea' ?
                                    <div className="form-field" key={field.name + field.label}>
                                        <label htmlFor={field.name}>{field.label}</label>
                                        <textarea
                                            name={field.name}
                                            rows="5"
                                            className={this.getFieldClassname(errors[field.name], touched[field.name])}
                                            placeholder={field.placeholder}
                                            onChange={(e) => {
                                                let value = e.target.value;
                                                setFieldValue('review', value);
                                            }}
                                        />
                                        <ErrorMessage name={field.name} component="div" className="error-message" />
                                    </div>
                                    :
                                    <div className="form-field" key={field.name + field.label}>
                                        <label htmlFor={field.name}>{field.label}</label>
                                        <Field
                                            name={field.name}
                                            type={field.type}
                                            className={this.getFieldClassname(errors[field.name], touched[field.name])}
                                            placeholder={field.placeholder}
                                        />
                                        <ErrorMessage name={field.name} component="div" className="error-message" />
                                    </div>
                                }
                            </React.Fragment>
                            :
                            <div className="form-field star-selection" key={field.name + field.label}>
                                <label htmlFor={field.name}>Rate your purchase</label>
                                <StarRatings
                                    rating={this.state.rating}
                                    starRatedColor="rgb(0, 168, 107)"
                                    changeRating={(rating) => this.changeRating(rating, setFieldValue)}
                                    numberOfStars={5}
                                    starDimension={'40px'}
                                    name='rating'
                                />
                            </div>
                        }
                    </React.Fragment>
                ))}
            </div>
        </React.Fragment>
    );

    renderFields = (errors, touched, setFieldValue) => {
        const {useProductFields, useUserInfoFields, useReviewFields} = this.props;
        return (
            <React.Fragment>
                {useProductFields
                    ? this.renderFieldsBlock(
                        errors,
                        touched,
                        setFieldValue,
                        this.productInfoFields,
                        'Product Information',
                        'product-block',
                    )
                    : ''}
                {useUserInfoFields
                    ? this.renderFieldsBlock(
                        errors,
                        touched,
                        setFieldValue,
                        this.userInfoFields,
                        'User Information',
                        'user-block',
                    )
                    : ''}
                {useReviewFields
                    ? this.renderReviewFieldsBlock(
                        errors,
                        touched,
                        setFieldValue,
                        this.reviewFields,
                        'Leave A Review',
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
                                {this.renderFields(formikProps.errors, formikProps.touched, formikProps.setFieldValue)}
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
