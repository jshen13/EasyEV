import React from 'react'

import './Form.css'


class FormPhoneNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {phoneNumber: '', name: 'Register Phone Number'};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterSubmission = this.afterSubmission.bind(this);
  }

  handleSubmit(event) {
    this.setState({phoneNumber: event.target.value});
    this.sendSMS(this.phoneNumber);
    event.preventDefault();
  }

  afterSubmission(event) {
    event.preventDefault();
  }

  async sendSMS(number) {
    const url = 'https://api.twilio.com/2010-04-01/Accounts/AC7fed6d78a93977926a4c04b5b4238e99/Messages.json?To=+1' + number + '&MessagingServiceSid=MGbcb77322a4b3ec5c17986c470ec9e252&Body=Test';
    const options = {
      headers: {
        Authorization: "Basic " + btoa('AC7fed6d78a93977926a4c04b5b4238e99:6503cc41fb8a71e2c2314b02206aaf66')
      },
      method: "POST"
    };
    var response = await fetch(url, options);
    if (response.status !== 200) {
      console.log('Error. Status Code: ' + response.status);
      console.log(response.body);
      return
    }

    console.log(response);
  }

  render() {
    return(
      <center>
        <form
          className='Form'
          name={this.state.name}
          action={''}
          data-netlify=''
          data-netlify-honeypot='_gotcha'
          onSubmit = {this.handleSubmit}
        >
          <h3>Enter your phone number in the box below.</h3>
          <label className='Form--Label'>
            <input
              className='Form--Input'
              type='text'
              placeholder='Phone Number'
              name='name'
              required
            />
          </label>
          <input type='text' name='_gotcha' style={{ display: 'none' }} />
          <input type='hidden' name='form-name' value={this.state.name} />
          
          <input
            className='Button Form--SubmitButton'
            type='submit'
            value='Submit'
            onClick={this.handleSubmit}
          />
        </form>
        {this.state.phoneNumber && <p>We have received your phone number!</p>}
      </center>
    );
  }
}

export default FormPhoneNumber