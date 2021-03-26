import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'
import './PostCard.css'

const NewsPostCard = ({
  image,
  title,
  author,
  url,
  description,
  publishedAt,
  categories = [],
  className = '',
  ...props
}) => (
  <Link to={url} className="PostCard">
    {image && (
      <div className="PostCard--Image relative">
        <Image background src={image} alt={title} />
      </div>
    )}
    <div className="PostCard--Content">
      {title && <h3 className="PostCard--Title">{title}</h3>}
      <div className="PostCard--Category">
        {categories && categories.map(cat => cat.category).join(', ')}
      </div>
      {author && <div className="PostCard--Author">{author}</div>}
      {publishedAt && <div className="PostCard--Date">{publishedAt}</div>}
      {/* {description && <div className="PostCard--Date">${author}</div>} */}
      {description && <div className="PostCard--Excerpt">{description }</div>}
    </div>
  </Link>
)

export default NewsPostCard
