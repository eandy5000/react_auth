import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import * as actions from '../../actions/index'
import { connect } from 'react-redux'

class SignUp extends Component {

    render() {
        const { handleSubmit, email, password, passwordConfirm } = this.props

        return <form>
                <fieldset>
                    <label>Email:</label><br/>
                    <input {...email} />
                </fieldset>
                <fieldset>
                    <label>Password:</label><br/>
                    <input {...password} />
                </fieldset>
                <fieldset>
                    <label>Confirm Password:</label><br/>
                    <input {...passwordConfirm} />
                </fieldset><br/>
                <button action="submit">Sign Up</button>
               </form>
    }
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm']
}, null, actions)(SignUp)