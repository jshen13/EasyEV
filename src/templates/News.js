import React, {useState, useEffect} from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'
import NewsPostCard from '../components/NewsPostCard'
import PostCard from '../components/PostCard'
import StockCard from '../components/StockCard'
import './News.css'
import _ from 'lodash'

export function NewsPageTemplate({ title, subtitle, featuredImage, body }) {
  const [userData, setUserData] = useState({});
  const [tslaData, setTslaData] = useState({});
  const [blkData, setBlkData] = useState({});
  const [gmData, setGmData] = useState({});
  const [fordData, setFordData] = useState({});
  const [qsData, setQsData] = useState({})

  useEffect(() => {
    getNews(); getTslaStock(); getBlkStock(); getGmStock(); getFordStock(); getQsData();
  }, []);

  const getNews = async() => {
    const response = await fetch('https://gnews.io/api/v4/search?q=electric%20vehicles&lang=en&token=f54d3508cb818bb0412f54a202c9f83d', {'Connection': 'upgrade', 'Upgrade': 'HTTP/2.0'});
    if (response.status !== 200) {
      console.log(jsonData)
      return
    }
    const jsonData = await response.json();
    setUserData(jsonData);
  }

  const getBlkStock = async() => {
    const response = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=BLK&apikey=SKL5BI6O6I4Z7YQW')
    if (response.status !== 200) {
      console.log('Error. Status Code: ' + response.status);
      return
    }
    const jsonData = await response.json();
    setBlkData(jsonData);
  }

  const getTslaStock = async() => {
    const response = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=TSLA&apikey=SKL5BI6O6I4Z7YQW')
    if (response.status !== 200) {
      console.log('Error. Status Code: ' + response.status);
      return
    }
    const jsonData = await response.json();
    setTslaData(jsonData);
  }

  const getGmStock = async() => {
    const response = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=GM&apikey=SKL5BI6O6I4Z7YQW')
    if (response.status !== 200) {
      console.log('Error. Status Code: ' + response.status);
      return
    }
    const jsonData = await response.json();
    setGmData(jsonData);
  }

  const getFordStock = async() => {
    const response = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=F&apikey=SKL5BI6O6I4Z7YQW')
    if (response.status !== 200) {
      console.log('Error. Status Code: ' + response.status);
      return
    }
    const jsonData = await response.json();
    setFordData(jsonData);
  }

  const getQsData = async() => {
    const response = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=QS&apikey=SKL5BI6O6I4Z7YQW')
    if (response.status !== 200) {
      console.log('Error. Status Code: ' + response.status);
      return
    }
    const jsonData = await response.json();
    setQsData(jsonData);
  }

  return <React.Fragment>
  <div className="container">
    <div className="Divider"/>
    <div className="StockCards">
      <div className="StockCard">
      {blkData && blkData['Global Quote'] && 
      <StockCard company={blkData['Global Quote']['01. symbol']} 
        price={blkData['Global Quote']['05. price']}
        change={blkData['Global Quote']['10. change percent']}/>}
      </div>
      <div classname="StockCard">
      {tslaData && tslaData['Global Quote'] && 
      <StockCard company={tslaData['Global Quote']['01. symbol']}
      price={tslaData['Global Quote']['05. price']}
      change={tslaData['Global Quote']['10. change percent']}/>}
      </div>
      <div className="StockCard">
      {gmData && gmData['Global Quote'] && 
      <StockCard company={gmData['Global Quote']['01. symbol']} 
        price={gmData['Global Quote']['05. price']}
        change={gmData['Global Quote']['10. change percent']}/>}
      </div>
      <div className="StockCard">
      {fordData && fordData['Global Quote'] && 
      <StockCard company={fordData['Global Quote']['01. symbol']} 
        price={fordData['Global Quote']['05. price']}
        change={fordData['Global Quote']['10. change percent']}/>}
      </div>
      <div className="StockCard">
      {qsData && qsData['Global Quote'] && 
      <StockCard company={qsData['Global Quote']['01. symbol']} 
        price={qsData['Global Quote']['05. price']}
        change={qsData['Global Quote']['10. change percent']}/>}
      </div>
    </div>
    {userData.articles && userData.articles.map(article => {
      return <NewsPostCard key={article.title} {...article}/>})}
    {!userData.articles && <p>Loading...</p>}
    </div>
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
