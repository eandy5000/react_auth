import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import * as actions from '../../actions/index'

class SignIn extends Component {
    handleFormSubmit({ email, password }) {
        this.props.signinUser({ email, password})
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <h4 style={{color:'red'}}>{this.props.errorMessage}</h4>
            )
        }
    }

    render() {
    const { handleSubmit, fields: { email, password }} = this.props
        console.log(this.props.errorMessage)
        return (
            <form onSubmit={
                handleSubmit(this.handleFormSubmit.bind(this))
            }>
            <fieldset>
                <label>Email:</label>
                <input {...email}  />
            </fieldset>
            <fieldset>
                <label>Password:</label>
                <input {...password}  />
            </fieldset>
            { this.renderAlert() }
            <button action="submit" >Sign In</button>
        </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    }
}

export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
}, mapStateToProps, actions)(SignIn)