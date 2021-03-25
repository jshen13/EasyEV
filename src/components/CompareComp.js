import React from 'react'
import { graphql } from 'gatsby'
import PostCard from './PostCard';
import './CompareComp.css'

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
            if (carTitle == this.props.cars[i].title) {
                return this.props.cars[i];
            }
        }
        return;
    }
    render() {
        let carsTitleList = this.props.cars.length > 0
    	&& this.props.cars.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.title}</option>
      )
    }, this);

        return (
            <React.Fragment>
        <form onSubmit={this.handleSubmit}>
        <label>
            Pick car1:
            <select value={this.state.car1} onChange={this.handleCar1Change}>
                {carsTitleList}
            </select>
          </label>
          {/* <input type="submit" value="Submit" /> */}
          </form>
          

        <form onSubmit={this.handleSubmit}>
          <label>
            Pick car2:
            <select value={this.state.car2} onChange={this.handleCar2Change}>
                {carsTitleList}
            </select>
          </label>
          {/* <input type="submit" value="Submit" /> */}
        </form>
                
        <h2>Car1: {this.state.car1}</h2>
        <h2>Car2: {this.state.car2}</h2>

        <div className="CarCompare">
            <div className="OneCar">
            <PostCard {...this.getCarFromTitle(this.state.car1)}/>
            </div>
            <div className="OneCar">
            <PostCard {...this.getCarFromTitle(this.state.car2)}/>
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