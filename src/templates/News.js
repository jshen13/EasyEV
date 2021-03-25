import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'
import NewsPostCard from '../components/NewsPostCard'
import PostCard from '../components/PostCard'

function getNews() {
fetch('https://newsapi.org/v2/everything?q=electric%20vehicles&apiKey=81335da982204a83b4416040fad0f2db')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Error. Status Code: ' + response.status);
        return
      }

      response.json().then(function(data) {
        console.log(data)
        var i;
        return data
        // return data['articles'].slice(0, 10).map(article => {
        //   return <NewsPostCard {...article}/>
        // });
        // for (i=0; i<10; i++) {
          
        //   // document.getElementById('newsCards').innerHTML +=
        //     // <PostCard title={data['articles'][i]['title']} featuredImage={data['articles'][i]['urlToImage']}/>;
        //     // '<a href=\'' + data['articles'][i]['url'] + '\'><h3>' + data['articles'][i]['title'] + '</h3></a><br>' // Title with hyperlink
        //     // + '<img src=' + data['articles'][i]['urlToImage'] + ' width=100 height=100></img><br>'; // image with news site
        //   // document.getElementById('newsImages').innerHTML += data['articles'][0]['urlToImage'] + '<br>';
        // }
      })
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

// Export Template for use in CMS preview
export const NewsPageTemplate = ({ title, subtitle, featuredImage, body }) => (
  <main className="News">
    <PageHeader
      large
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />

    <section className="section">
      <div className="container">
        <Content source={body} />
        <p>{getNews()}</p>
      </div>
    </section>
  </main>
)

// Export Default NewsPage for front-end
const NewsPage = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <NewsPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default NewsPage

export const pageQuery = graphql`
  ## Query for NewsPage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query NewsPage($id: String!) {
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
