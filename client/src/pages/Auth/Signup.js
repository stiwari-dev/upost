import React, { Component } from 'react';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import { required, length, email } from '../../util/validators';
import Auth from './Auth';
import '../Auth/Auth.css';

class Signup extends Component {
    state = {
        signupForm: {
            email: {
                value: '',
                valid: false,
                touched: false,
                validators: [required, email]
            },
            password: {
                value: '',
                valid: false,
                touched: false,
                validators: [required, length({ min: 5 })]
            },
            name: {
                value: '',
                valid: false,
                touched: false,
                validators: [required]
            },
            formIsValid: false
        }
    };

    inputChangeHandler = (input, value) => {
        this.setState(prevState => {
            let isValid = true;
            for (const validator of prevState.signupForm[input].validators) {
                isValid = isValid && validator(value);
            }
            const updatedForm = {
                ...prevState.signupForm,
                [input]: {
                    ...prevState.signupForm[input],
                    valid: isValid,
                    value: value
                }
            };
            let formIsValid = true;
            for (const inputName in updatedForm) {
                if (inputName !== 'formIsValid') {
                    formIsValid = formIsValid && updatedForm[inputName].valid;
                }
            }
            updatedForm.formIsValid = formIsValid;
            return {
                signupForm: updatedForm
            };
        });
    };

    inputBlurHandler = input => {
        this.setState(prevState => {
            return {
                signupForm: {
                    ...prevState.signupForm,
                    [input]: {
                        ...prevState.signupForm[input],
                        touched: true
                    }
                }
            };
        });
    };

    render() {
        return (
            <>
                <h2 className="signup-form-title">JOIN THE COMMUNITY!</h2>
                <Auth>
                    <form onSubmit={e => this.props.onSignup(e, this.state)}>
                        <Input
                            id="email"
                            label="Your E-Mail"
                            type="email"
                            placeholder="username@domain.com"
                            control="input"
                            onChange={this.inputChangeHandler}
                            onBlur={this.inputBlurHandler.bind(this, 'email')}
                            value={this.state.signupForm['email'].value}
                            valid={this.state.signupForm['email'].valid}
                            touched={this.state.signupForm['email'].touched}
                        />
                        <Input
                            id="name"
                            label="Your Name"
                            placeholder="John Doe"
                            type="text"
                            control="input"
                            onChange={this.inputChangeHandler}
                            onBlur={this.inputBlurHandler.bind(this, 'name')}
                            value={this.state.signupForm['name'].value}
                            valid={this.state.signupForm['name'].valid}
                            touched={this.state.signupForm['name'].touched}
                        />
                        <Input
                            id="password"
                            label="Password"
                            type="password"
                            placeholder="Must have atleast 5 characters"
                            control="input"
                            onChange={this.inputChangeHandler}
                            onBlur={this.inputBlurHandler.bind(this, 'password')}
                            value={this.state.signupForm['password'].value}
                            valid={this.state.signupForm['password'].valid}
                            touched={this.state.signupForm['password'].touched}
                        />
                        <Button design="raised" type="submit" disabled={!this.state.signupForm.formIsValid} loading={this.props.loading}>
                            Signup
                        </Button>
                    </form>
                </Auth>
            </>

        );
    }
}

export default Signup;
