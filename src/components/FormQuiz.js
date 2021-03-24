import React from 'react'

import './Form.css'

export default ({
  name = 'EV Quiz',
  subject = '', // optional subject of the notification email
  action = ''
}) => (
  <form
    className='Form'
    name={name}
    action={action}
    data-netlify=''
    data-netlify-honeypot=''
  >
    <section className="section">
      <div className="container">
        <h3>What is your budget?</h3>
        <label className="Form--Label has-arrow">
            <select
              className="Form--Input Form--Select"
              name="type"
              defaultValue="Price Range"
              required
            >
              <option disabled hidden>
                Price Range
              </option>
              <option>$0 to $50,000</option>
              <option>$50,000 to $100,000</option>
              <option>$100,000+</option>
            </select>
        </label>

        <div class="Divider"/>

        <h3>How would you describe your commute?</h3>
        <label className="Form--Label has-arrow">
            <select
              className="Form--Input Form--Select"
              name="type"
              defaultValue="Commute Type"
              required
            >
              <option disabled hidden>
               Commute Type
              </option>
              <option>Local (0 to 50 mi)</option>
              <option>Non-Local (50-100 mi)</option>
              <option>Traveler (100+ mi)</option>
            </select>
        </label>

        <div class="Divider"/>

        <h3>How adventurous are you on the accelerator?</h3>
        <label className="Form--Label has-arrow">
            <select
              className="Form--Input Form--Select"
              name="type"
              defaultValue="Acceleration Behavior"
              required
            >
              <option disabled hidden>
               Acceleration Behavior
              </option>
              <option>Timid</option>
              <option>Mild</option>
              <option>Speed Demon</option>
            </select>
        </label>
      </div>
    </section>
    <input type='text' name='_gotcha' style={{ display: 'none' }} />
    {!!subject && <input type='hidden' name='subject' value={subject} />}
    <input type='hidden' name='form-name' value={name} />
    <input
      className='Button Form--SubmitButton'
      type='submit'
      value='Submit'
    />
  </form>
)
