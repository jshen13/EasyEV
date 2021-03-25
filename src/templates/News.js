import React, {useState, useEffect} from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'
import NewsPostCard from '../components/NewsPostCard'
import PostCard from '../components/PostCard'
import _ from 'lodash'

export function NewsPageTemplate({ title, subtitle, featuredImage, body }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async() => {
    const response = await fetch('https://newsapi.org/v2/everything?q=electric%20vehicles&apiKey=81335da982204a83b4416040fad0f2db');
    if (response.status !== 200) {
      console.log('Error. Status Code: ' + response.status);
      return
    }
    const jsonData = await response.json();
    setUserData(jsonData);
        
      
    
  }

  return <React.Fragment>
  {userData.articles && userData.articles.map(article => {
      return <NewsPostCard key={article.title} {...article}/>
   })}
  </React.Fragment>

}



// Export Template for use in CMS preview
// export const NewsPageTemplate = ({ title, subtitle, featuredImage, body }) => (

//   <main className="News">
//     <PageHeader
//       large
//       title={title}
//       subtitle={subtitle}
//       backgroundImage={featuredImage}
//     />

//     <section className="section">
//       <div className="container">
//         <Content source={body} />
//         <p>{getArticles()}</p>
//       </div>
//     </section>
//   </main>
// )

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
