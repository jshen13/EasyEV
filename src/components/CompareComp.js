import React from 'react'
import { graphql } from 'gatsby'

export class CompareComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {car1: 'Something', car2: ''};
        // this.cars = cars.edges.map(car => ({
        //     ...car.node
        // }));
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
  
    render() {
        return (
            <React.Fragment>
                
        <form onSubmit={this.handleSubmit}>
          <label>
            Pick your favorite flavor:
            <select value={this.state.car1} onChange={this.handleCar1Change}>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
          </form>
          

          <form onSubmit={this.handleSubmit}>
          <label>
            Pick your favorite flavor:
            <select value={this.state.car2} onChange={this.handleCar2Change}>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </React.Fragment>
                
      );
    }
}
  
export default CompareComp;


// export const pageQuery = graphql`
//   ## Query for BlogIndex data
//   ## Use GraphiQL interface (http://localhost:8000/___graphql)
//   ## $id is processed via gatsby-node.js
//   ## query name must be unique to this file
//   query Compare($id: String!) {
//     page: markdownRemark(id: { eq: $id }) {
//       ...Meta
//       fields {
//         contentType
//       }
//       frontmatter {
//         title
//         excerpt
//         template
//         subtitle
//         featuredImage
//       }
//     }

//     posts: allMarkdownRemark(
//       filter: { fields: { contentType: { eq: "cars" } } }
//       sort: { order: DESC, fields: [frontmatter___date] }
//     ) {
//       edges {
//         node {
//           excerpt
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//             date
//             price
//             range
//             acceleration
//             top_speed
//             categories {
//               category
//             }
//             featuredImage
//           }
//         }
//       }
//     }
//     postCategories: allMarkdownRemark(
//       filter: { fields: { contentType: { eq: "carCompanies" } } }
//       sort: { order: ASC, fields: [frontmatter___title] }
//     ) {
//       edges {
//         node {
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
// export const carQuery = graphql`
//   ## Query for BlogIndex data
//   ## Use GraphiQL interface (http://localhost:8000/___graphql)
//   ## $id is processed via gatsby-node.js
//   ## query name must be unique to this file
//   query Compare($id: String!) {
//     posts: allMarkdownRemark(
//       filter: { fields: { contentType: { eq: "cars" } } }
//       sort: { order: DESC, fields: [frontmatter___date] }
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