import React from 'react'
import { graphql } from 'gatsby'
import PostCardCompare from './PostCardCompare';
import './Form.css'

import './CompareComp.css'
import './PostCard.css'

export class CompareComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {car1: '', car2: ''};
        this.handleCar1Change = this.handleCar1Change.bind(this);
        this.handleCar2Change = this.handleCar2Change.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleCar1Change(event) {
      this.setState({car1: event.target.value});
    }

    handleCar2Change(event) {
        this.setState({car2: event.target.value});
      }
  
    handleSubmit(event) {
      alert('Your favorite flavor is: ' + this.state.car1);
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
    render() {
        let carsTitleList = this.props.cars.length > 0
    	&& this.props.cars.map((item, i) => {
      return (
        <option>{item.title}</option>
      )
    }, this);

        return (
            <React.Fragment>
        
        <h3>Choose cars to compare</h3>
        <div className="SelectionContainer">
        <div className="Dropdown">
                    
        <label className="Form--Label has-arrow">
                            
        <select
            // value={this.state.car1}
            
            onChange={this.handleCar1Change}
            className="Form--Input Form--Select"                    
            defaultValue="Choose a Car"
                                name="type"
                                placeholder="test"
            required>
            <option disabled hidden>Choose a Car</option>
                {carsTitleList}
            </select>
            </label>
        </div>
                        
          {/* <input type="submit" value="Submit" /> */}
          

          <div className="Dropdown">
          <label className="Form--Label has-arrow">
                            <select
                                defaultValue="Choose a Car"
                                // value={this.state.car2} 
                                onChange={this.handleCar2Change} 
                                className="Form--Input Form--Select" name="type">
            <option disabled hidden>
                Choose a Car
              </option>
                {carsTitleList}
            </select>
        </label>
        </div>
          {/* <input type="submit" value="Submit" /> */}
                
        </div>
        {/* <h2>Car1: {this.state.car1}</h2>
        <h2>Car2: {this.state.car2}</h2> */}

        <div className="CarCompare">
            <div className="OneCar">
            <PostCardCompare car1={this.getCarFromTitle(this.state.car1)}  car2={this.getCarFromTitle(this.state.car2)}/>
            </div>
            <div className="OneCar">
            <PostCardCompare car1={this.getCarFromTitle(this.state.car2)} car2={this.getCarFromTitle(this.state.car1)}/>
            </div>

        </div>
                
      </React.Fragment>
                
      );
    }
}
  
export default CompareComp;


export const pageQuery = graphql`
  ## Query for BlogIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query Compare {

    posts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "cars" } } }
      sort: { order: DESC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            price
            range
            acceleration
            top_speed
            categories {
              category
            }
            featuredImage
          }
        }
      }
    }
}
`
// export const carQuery = graphql`
//   ## Query for BlogIndex data
//   ## Use GraphiQL interface (http://localhost:8000/___graphql)
//   ## $id is processed via gatsby-node.js
//   ## query name must be unique to this file
//   query Compare($id: String!) {
//     posts: allMarkdownRemark(
//       filter: { fields: { contentType: { eq: "cars" } } }
//       sort: { order: DESC, fields: [frontmatter___title] }
//     ) {
//       edges {
//         node {
//           excerpt
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//           }
//         }
//       }
//     }
    
//   }
// `