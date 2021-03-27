import React from 'react'

import './Form.css'

export default ({
  name = 'Simple Form',
  phone_number = '',
  action = ''
}) => (
    <center className="center">
      <form
        className='Form'
        name={name}
        action={action}
        data-netlify=''
        data-netlify-honeypot='_gotcha'
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
        <input type='hidden' name='form-name' value={name} />
        <input
          className='Button Form--SubmitButton'
          type='submit'
          value='Submit'
        />
      </form>
    </center>
)
