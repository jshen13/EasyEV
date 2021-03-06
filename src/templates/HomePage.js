import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'
import gas_emissions from '../../images/gas_emissions.png'
import Accordion from '../components/Accordion'
import './HomePage.css'
// Export Template for use in CMS preview
export const HomePageTemplate = ({ title, subtitle, featuredImage, body, accordion }) => (
  <main className="Home">
    <PageHeader
      large
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
      home="true"
    />

    <section className="section">
      <div className="container">
        <Content source={body} />
      </div>

      <div className="Divider"/>

      <div className="container">
        <h1>Why Purchase an Electric Vehicle?</h1>
        <h3>Electric Vehicles will be the future of transportation.</h3>
        <p>
          Electric vehicles are inevitably the mode of transportation of the future, since current fossil fuel alternatives are not sustainable, and harmful to the environment.
          Many organizations are taking action to mandate this transition
          (e.g. <a href="https://www.gov.ca.gov/2020/09/23/governor-newsom-announces-california-will-phase-out-gasoline-powered-cars-drastically-reduce-demand-for-fossil-fuel-in-californias-fight-against-climate-change/">
          California governor Gavin Newsom issued an executive order requiring vehicle sales to be entirely emission free by 2035</a>). There are also massive amounts of research being conducted to create better batteries and charging infrastructure for EVs. Many companies have already followed suit in committing to the manufacturing of only electric vehicles in the near future (e.g. <a href="https://www.gm.com/commitments/electrification.html">
          General Motors has committed to phasing out internal combustion engine (ICE) vehicles by 2035 and plans to launch 30 new EVs by 2025</a>). There are also an increasing number of EV startups that create EVs in niche sectors such such as luxury, off-roading, and trucking in order to fulfill a variety of demands for EVs. If you want to learn more about EV news, head on over to our <Link to="/news">News Tab</Link>!
        </p>
        
        <h3>Electric Vehicles are better for the environment.</h3>
        <p>
          While conventional gas cars require petroleum as their sole source of fuel, electric vehicles use electricity, which can be generated by renewable sources of energy,
          such as wind and the sun (which are all carbon neutral).
        </p>
    
  <div className="Images-Row">
      <img src={gas_emissions} className = "center"></img>
    <img src="https://secureservercdn.net/50.62.89.79/mvc.3f2.myftpupload.com/wp-content/uploads/2018/11/EV-Sales-to-Charging-Stations-2011-2021.png" className="center">
    </img>
  </div>
</div>
      <section className="section">

      <div className="container">
      <h1>Frequently Asked Questions about EVs</h1>

        <Accordion items={accordion} />
      </div>
    </section>
    </section>
  </main>
)

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
        accordion {
          title
          description
        }
      }
    }
  }
`
