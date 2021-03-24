import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'
import FormQuiz from '../components/FormQuiz'

// Export Template for use in CMS preview
export const QuizPageTemplate = ({ title, subtitle, featuredImage, body }) => (
  <main className="Quiz">
    <PageHeader
      large
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
    <div>
      <center>
        <FormQuiz/>
      </center>
    </div>
  </main>
)

// Export Default QuizPage for front-end
const QuizPage = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <QuizPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default QuizPage

export const pageQuery = graphql`
  ## Query for QuizPage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query QuizPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
      }
    }
  }
`
