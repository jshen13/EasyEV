import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'
import Image from '../components/Image'

import Content from '../components/Content'
import Layout from '../components/Layout'
import './SingleCar.css'

export const SingleCarTemplate = ({
  title,
  date,
  body,
  price,
  range,
  acceleration,
  top_speed,
  link,
  featuredImage,
  nextPostURL,
  prevPostURL,
  categories = []
}) => (
  <main>
    <article
      className="SinglePost section light"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="container skinny">
        <Link className="SingleCar--BackButton" to="/explore/">
          <ChevronLeft /> BACK
        </Link>
        <div className="SinglePost--Content relative">
          <div className="SinglePost--Meta">
            {/* {date && (
              <time
                className="SinglePost--Meta--Date"
                itemProp="dateCreated pubdate datePublished"
                date={date}
              >
                {date}
              </time>
            )} */}
            {categories && (
              <Fragment>
                {/* <span>|</span> */}
                {categories.map((cat, index) => (
                  <span
                    key={cat.category}
                    className="SinglePost--Meta--Category"
                  >
                    {cat.category}
                    {/* Add a comma on all but last category */}
                    {index !== categories.length - 1 ? ',' : ''}
                  </span>
                ))}
              </Fragment>
            )}
          </div>

          {title && (
            <h1 className="SinglePost--Title" itemProp="title">
              {title}
            </h1>
          )}

          {featuredImage && <img width="100%" src={featuredImage} alt={title} />}

          <div className="SinglePost--InnerContent">
            Price: ${Number(price).toLocaleString()}
            <br></br>
            Range: {range} miles
            <br />
            0-60 mph Acceleration: {acceleration} seconds
            <br />
            Top Speed: {top_speed} mph
          </div>
          
          {link && <div className="SinglePost--InnerContent">
          
            Learn more at <Link to={link} target="__blank">{link}</Link>
            {/* <Content source={body} /> */}
          </div>}

          <div className="SinglePost--Pagination">
            {prevPostURL && (
              <Link
                className="SinglePost--Pagination--Link prev"
                to={prevPostURL}
              >
                Previous Car
              </Link>
            )}
            {nextPostURL && (
              <Link
                className="SinglePost--Pagination--Link next"
                to={nextPostURL}
              >
                Next Car
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  </main>
)

// Export Default SinglePost for front-end
const SingleCar = ({ data: { post, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id)
  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.title || false}
    >
      <SingleCarTemplate
        {...post}
        {...post.frontmatter}
        body={post.html}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  )
}

export default SingleCar

export const pageQuery = graphql`
  ## Query for SinglePost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SingleCar($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        template
        price
        subtitle
        range
        acceleration
        top_speed
        link
        date(formatString: "MMMM Do, YYYY")
        categories {
          category
        }
        featuredImage
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "cars" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
