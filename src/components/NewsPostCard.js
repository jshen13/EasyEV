import React, {useState, useEffect}  from 'react'
import { Link } from 'gatsby'

import Image from './Image'
import './NewsPostCard.css'

function convertDate(date) {
  let d = new Date(date);
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()

}

function getSentimentScore(magnitude, score) {
  return Math.round((magnitude * score * 10)* 100) / 100;
}

function getColorFromScore(score) {
  if (score > 0.2) {
    return 'green';
  } else if (score < -0.2) {
    return 'red';
  } else {
    return 'yellow'
  }
}

function getSentimentString(score) {
  if (score === 0) {
    return score;
  } else if (score < 0) {
    return "👎 " + score;
  } else {
    return "👍 " + score;
  }
}

export default function NewsPostCard({
  image,
  title,
  author,
  url,
  description,
  content,
  publishedAt,
  categories = [],
  className = '',
  ...props
}) {
  const [sentimentData, setSentimentData] = useState({});
  useEffect(() => {
    getSentiment(content);
  }, []);

  const getSentiment = async(content) => {
    let data = {
       "document": {
         "type": "PLAIN_TEXT",
         "content": content         
       },
       "encodingType": 'UTF16'
    }
    const response = await fetch('https://language.googleapis.com/v1beta2/documents:analyzeSentiment?key=AIzaSyDBs2qSiOC6G1v_gIjs6An_Pbo9rzT9K5Y', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    if (response.status !== 200) {
      console.log('Error. Status Code: ' + response.status);
      return
    }
    const jsonData = await response.json();
    setSentimentData(jsonData);
  }


  return (<Link to={url} className="PostCard" target="__blank">
  <div className="NewsCard--Row">
  {image && (
      <div className="PostCard--Image relative">
        <Image background src={image} alt={title} />
      </div>
    )}
    <div className="PostCard--Content">
      {title && <h3 className="PostCard--Title">{title}</h3>}
      <div className="NewsCard--MetaData">
        {publishedAt && <div className="PostCard--Date">{convertDate(publishedAt)}</div>}
        {sentimentData && sentimentData.documentSentiment && <div className="NewsCard--Score"><div className={"NewsCard--ScoreIcon-" + getColorFromScore(getSentimentScore(sentimentData.documentSentiment.magnitude, sentimentData.documentSentiment.score))}>
        {getSentimentString(getSentimentScore(sentimentData.documentSentiment.magnitude, sentimentData.documentSentiment.score))}</div>
      </div>}

      </div>
      {/* {author && <div className="PostCard--Author">{author}</div>} */}
      
      {/* {description && <div className="PostCard--Date">${author}</div>} */}
      {description && <div className="PostCard--Excerpt">{description }</div>}

      
    </div>
  
  </div>
    
  </Link>)
}

// export default NewsPostCard
