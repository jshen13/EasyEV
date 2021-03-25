import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'
import './PostCard.css'

const NewsPostCard = ({
  featuredImage,
  title,
  author,
  url,
  description,
  date,
  categories = [],
  className = '',
  ...props
}) => (
  <a href={url}>
    featuredImage && (
      <div className="PostCard--Image relative">
        <Image background src={featuredImage} alt={title} />
      </div>
    )
    <div className="PostCard--Content">
      {title && <h3 className="PostCard--Title">{title}</h3>}
      <div className="PostCard--Category">
        {categories && categories.map(cat => cat.category).join(', ')}
      </div>
      {author && <div className="PostCard--Date">${author}</div>}
      {date && <div className="PostCard--Date">${date}</div>}
      {description && <div className="PostCard--Date">${author}</div>}
      {/* {excerpt && <div className="PostCard--Excerpt">{excerpt}</div>} */}
    </div>
  </a>
)

export default NewsPostCard
