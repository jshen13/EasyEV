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
  <Link to={'/store'} className="PostCard">
    <div className="PostCard--Content">
      {company && <h3 className="PostCard--Title">{company}</h3>}
      <div className="PostCard--Category">
        {categories && categories.map(cat => cat.category).join(', ')}
      </div>
      {/* {description && <div className="PostCard--Date">${author}</div>} */}
    </div>
  </Link>
)

export default NewsPostCard
