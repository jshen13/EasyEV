import React from 'react'
import PostCardCompare from './PostCardCompare'
import './Form.css'

export class FormQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {priceChoice: '', rangeChoice: '', accelerationChoice: '', submitted: false, car1: '', car2: ''};
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleAccelerationChange = this.handleAccelerationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.priceChoice1 = "$0 to $50,000";
    this.priceChoice2 = "$50,000 to $100,000";
    this.priceChoice3 = "$100,000+";

    this.rangeChoice1 = "Local (0 to 100 mi)";
    this.rangeChoice2 = "Non-Local (100-200 mi)";
    this.rangeChoice3 = "Traveler (200+ mi)";

    this.accelerationChoice1 = "Timid";
    this.accelerationChoice2 = "Mild";
    this.accelerationChoice3 = "Speed Demon";

  }

  handlePriceChange(event) {
    this.setState({ priceChoice: event.target.value, submitted: true });
    this.findMatchingCars(event.target.value, this.state.rangeChoice, this.state.accelerationChoice);
  }

  handleRangeChange(event) {
    this.setState({ rangeChoice: event.target.value, submitted: true });
    this.findMatchingCars(this.state.priceChoice, event.target.value, this.state.accelerationChoice);
  }
  
  handleAccelerationChange(event) {
    this.setState({ accelerationChoice: event.target.value, submitted: true });
    this.findMatchingCars(this.state.priceChoice, this.state.rangeChoice, event.target.value);
  }

  handleSubmit(event) {
    this.setState({ submitted: true });
    this.findMatchingCars(this.state.priceChoice, this.state.rangeChoice, this.state.accelerationChoice);
    event.preventDefault();
  }

  getCarFromTitle(carTitle) {
      for (var i = 0; i < this.props.cars.length; i++) {
          if (carTitle === this.props.cars[i].title) {
              return this.props.cars[i];
          }
      }
      return;
  }

  findMatchingCars(priceChoice, rangeChoice, accelerationChoice) {
    let rtnCars = [];
    let priceLow = 0;
    let priceHigh = 500000;
    let rangeLow = 200;
    let rangeHigh = 1000;
    let accelerationLow = 0;
    let accelerationHigh = 500;
    
    if (priceChoice === this.priceChoice1) {
      priceHigh = 50000;
    } else if (priceChoice === this.priceChoice2) {
      
      priceHigh = 100000;
    } else if (priceChoice === this.priceChoice3) {
      priceLow = 75000;
    }
    
    if (rangeChoice === this.rangeChoice1) {
      rangeLow = 50;
    } else if (rangeChoice === this.rangeChoice2) {
      rangeLow = 150;
    }
    
    if (accelerationChoice === this.accelerationChoice2) {
      accelerationHigh = 4.4;
    } else if (accelerationChoice === this.accelerationChoice3) {
      accelerationHigh = 3;
    }
    for (var i = 0; i < this.props.cars.length; i++) {
      let car = this.props.cars[i];

      if (car.price < priceHigh && car.price > priceLow && car.range < rangeHigh && car.range > rangeLow && car.acceleration < accelerationHigh && car.acceleration > accelerationLow) {
        if (rtnCars.length < 2) {
          rtnCars.push(car);
        }
        if (rtnCars.length === 2) {
          break;
        }
      }
    }
    if (rtnCars[0]) {
      this.state.car1 = rtnCars[0];
    }
    if (rtnCars[1]) {
      this.state.car2 = rtnCars[1];
    }
    return;
  }
  render() {
      this.props.cars.length > 0
    && this.props.cars.map((item, i) => {
    return (
      <option >{item.title}</option>
    )
  }, this);

      return (
          <React.Fragment>
      <form
    className='Form'
    name='EV Quiz'
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
              onChange={this.handlePriceChange}
              required
            >
              <option disabled hidden>
                Price Range
              </option>
              <option>{this.priceChoice1}</option>
                    <option>{this.priceChoice2}</option>
                    <option>{this.priceChoice3}</option>
            </select>
        </label>

        <div className="Divider"/>

        <h3>How would you describe your commute?</h3>
        <label className="Form--Label has-arrow">
            <select
              className="Form--Input Form--Select"
              name="type"
                  defaultValue="Commute Type"
                  onChange={this.handleRangeChange}
              required
            >
              <option disabled hidden>
               Commute Type
              </option>
              <option>{this.rangeChoice1}</option>
              <option>{this.rangeChoice2}</option>
              <option>{this.rangeChoice3}</option>
            </select>
        </label>

        <div className="Divider"/>

        <h3>How adventurous are you on the accelerator?</h3>
        <label className="Form--Label has-arrow">
            <select
              className="Form--Input Form--Select"
              name="type"
                  defaultValue="Acceleration Behavior"
                  onChange={this.handleAccelerationChange}
              required
            >
              <option disabled hidden>
               Acceleration Behavior
              </option>
              <option>{this.accelerationChoice1}</option>
              <option>{this.accelerationChoice2}</option>
              <option>{this.accelerationChoice3}</option>
            </select>
        </label>
      </div>
    </section>
          
    <input type='text' name='_gotcha' style={{ display: 'none' }} />
            <input type='hidden' name='form-name' value='EV Quiz' />
  </form>


                                      
          
                    
      { this.state.submitted && <div className="CarCompare">
          <div className="OneCar">
          <PostCardCompare car1={this.state.car1}  car2={this.state.car2}/>
          </div>
          <div className="OneCar">
          <PostCardCompare car1={this.state.car2} car2={this.state.car1}/>
          </div>

      </div> }
              
    </React.Fragment>
              
    );
  }
}

export default FormQuiz;


// export default ({
//   name = 'EV Quiz',
//   subject = '', // optional subject of the notification email
//   action = ''
// }) => (
//   <form
//     className='Form'
//     name={name}
//     action={action}
//     data-netlify=''
//     data-netlify-honeypot=''
//   >
//     <section className="section">
//       <div className="container">
//         <h3>What is your budget?</h3>
//         <label className="Form--Label has-arrow">
//             <select
//               className="Form--Input Form--Select"
//               name="type"
//               defaultValue="Price Range"
//               required
//             >
//               <option disabled hidden>
//                 Price Range
//               </option>
//               <option>$0 to $50,000</option>
//               <option>$50,000 to $100,000</option>
//               <option>$100,000+</option>
//             </select>
//         </label>

//         <div className="Divider"/>

//         <h3>How would you describe your commute?</h3>
//         <label className="Form--Label has-arrow">
//             <select
//               className="Form--Input Form--Select"
//               name="type"
//               defaultValue="Commute Type"
//               required
//             >
//               <option disabled hidden>
//                Commute Type
//               </option>
//               <option>Local (0 to 50 mi)</option>
//               <option>Non-Local (50-100 mi)</option>
//               <option>Traveler (100+ mi)</option>
//             </select>
//         </label>

//         <div className="Divider"/>

//         <h3>How adventurous are you on the accelerator?</h3>
//         <label className="Form--Label has-arrow">
//             <select
//               className="Form--Input Form--Select"
//               name="type"
//               defaultValue="Acceleration Behavior"
//               required
//             >
//               <option disabled hidden>
//                Acceleration Behavior
//               </option>
//               <option>Timid</option>
//               <option>Mild</option>
//               <option>Speed Demon</option>
//             </select>
//         </label>
//       </div>
//     </section>
  //   <input type='text' name='_gotcha' style={{ display: 'none' }} />
  //   {!!subject && <input type='hidden' name='subject' value={subject} />}
  //   <input type='hidden' name='form-name' value={name} />
  //   <input
  //     className='Button Form--SubmitButton'
  //     type='submit'
  //     value='Submit'
  //   />
  // </form>
// )
