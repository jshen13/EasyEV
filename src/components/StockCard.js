import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'
import './PostCard.css'


function getColorFromChange(change) {

}


const NewsPostCard = ({
  company,
  price,
  change,
  categories = [],
  className = '',
  ...props
}) => (
    <div>
      {company && <h3 className="PostCard--Title">{company}</h3>}
      {parseFloat(change) > 0 && price && <div className="PostCard--Price-g">${parseFloat(price).toFixed(2)} (+{parseFloat(change).toFixed(2)}%)</div>}
      {parseFloat(change) === 0 && price && <div className="PostCard--Price-def">${parseFloat(price).toFixed(2)} ({parseFloat(change).toFixed(2)}%)</div>}
      {parseFloat(change) < 0 && price && <div className="PostCard--Price-r">${parseFloat(price).toFixed(2)} ({parseFloat(change).toFixed(2)}%)</div>}
    </div>
)

export default NewsPostCard
