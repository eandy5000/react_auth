import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

  handleFormSubmit(formProps) {
      
      this.props.signupUser(formProps)
  }

  renderAlert() {
      if(this.props.errorMessage) {
          return (
       <h5 style={{color: 'red'}} >Opps! {this.props.errorMessage}</h5>       
          )
      }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this)) } >
        <fieldset >
          <label>Email:</label><br/>
          <input {...email} />  
        </fieldset>
{email.touched && email.error && <h5 style={{color: 'red'}} >{email.error}</h5> }     
        <fieldset >
          <label>Password:</label><br/>
          <input  {...password} type="password" />    
        </fieldset>
{ password.touched && password.error && <h5 style={{color: 'red'}}>{password.error}</h5> }
        <fieldset >
          <label>Confirm Password:</label><br/>
          <input {...passwordConfirm} type="password" />  
        </fieldset>
{ passwordConfirm.touched && passwordConfirm.error && <h5 style={{color: 'red'}}>{passwordConfirm.error}</h5> }    
        <br/>
        <button action="submit" >Sign up!</button>
        { this.renderAlert() }
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};
  if(!formProps.email){
      errors.email = "Please enter email"
  }

  if(!formProps.password) {
      errors.password = "please enter your password"
  }

  if(!formProps.passwordConfirm) {
      errors.passwordConfirm = " Please confirm your password"
  }

  if(formProps.password !== formProps.passwordConfirm) {
      errors.password = "Passwords do not match"
  }

  return errors;
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    }
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);