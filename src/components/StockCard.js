import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'
import './PostCard.css'

const NewsPostCard = ({
  company,
  price,
  change,
  categories = [],
  className = '',
  ...props
}) => (
    <div className="PostCard--Content">
      {company && <h3 className="PostCard--Title">{company}</h3>}
      <div className="PostCard--Category">
        {categories && categories.map(cat => cat.category).join(', ')}
      </div>
      {parseFloat(change) > 0 && price && <div className="PostCard--Price-g">${parseFloat(price).toFixed(2)} (+{parseFloat(change).toFixed(2)}%)</div>}
      {parseFloat(change) === 0 && price && <div className="PostCard--Price-def">${parseFloat(price).toFixed(2)} ({parseFloat(change).toFixed(2)}%)</div>}
      {parseFloat(change) < 0 && price && <div className="PostCard--Price-r">${parseFloat(price).toFixed(2)} ({parseFloat(change).toFixed(2)}%)</div>}
    </div>
)

export default NewsPostCard
