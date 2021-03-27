import React, {Fragment, useState, useEffect} from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'

import Layout from '../components/Layout'
import './SingleCar.css'
import NewsPostCard from '../components/NewsPostCard'
import Popup from '../components/Popup'

export function SingleCarTemplate ({
  title,
  date,
  body,
  price,
  range,
  acceleration,
  top_speed,
  launch,
  link,
  mpge,
  type,
  safetyRating,
  featuredImage,
  nextPostURL,
  prevPostURL,
  categories = []
}) {
  
  const [news, setNews] = useState({});

  useEffect(() => {
    getNews(title);
  }, [])

  const getNews = async(title) => {
    const response = await fetch('https://gnews.io/api/v4/search?q=' + title.replace(/[^a-zA-Z0-9]/g, " ") +'&lang=en&token=98930b2762414b74c241607a335d7f8c');
    if (response.status !== 200) {
      return
    }
    const jsonData = await response.json();
    setNews(jsonData);
  }

  return (<main>
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

          <div >
            {type && <p> Type: {type} </p>}
            {price && <p>Price: ${Number(price).toLocaleString()}</p>}
            {range && <p>Range: {range} miles</p>}
            {acceleration && <p>0-60 mph Acceleration: {acceleration} seconds</p>}
            {top_speed && <p>Top Speed: {top_speed}</p>} 
            {mpge && <p>MPGe: {mpge} combined</p>}
            {safetyRating && <p>Safety Rating: {safetyRating}/5</p>}
            {launch && <p>Release Date: {launch}</p>}
          </div>
          {link && <div >
          
            Learn more at <Link to={link} target="__blank">{link}</Link>
            {/* <Content source={body} /> */}
          </div>}
          
          <div className='Divider'/>
          {launch && <Popup/>}
          <div className='Divider'/>
          

          <h2>Relevant News:</h2>
          {news.articles && news.articles.map(article => {
              return <NewsPostCard key={article.title} {...article}/>})}

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
  </main>)
}

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
        launch
        mpge
        safetyRating
        type
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
