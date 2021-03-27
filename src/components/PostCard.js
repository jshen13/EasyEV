import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'
import './PostCard.css'

const PostCard = ({
  featuredImage,
  title,
  excerpt,
  price,
  range,
  acceleration,
  top_speed,
  slug,
  mpge,
  categories = [],
  className = '',
  ...props
}) => (
  <Link to={slug} className={`PostCard ${className}`}>
    
    {featuredImage && (
      <div className="PostCard--Image relative">
        <Image background src={featuredImage} alt={title} />
      </div>
    )}
    <div className="PostCard--Content">
      {title && <h3 className="PostCard--Title">{title}</h3>}
      <div className="PostCard--Category">
        {categories && categories.map(cat => cat.category).join(', ')}
      </div>
      {price && <div className="PostCard--Price">${Number(price).toLocaleString()}</div>}
      {range && <div className="PostCard--Range">{range} mi range</div>}
      {acceleration && <div className="PostCard--Range">{acceleration} s 0-60 mph</div>}
      {mpge && <div className="PostCard--Range">{mpge} MPGe</div>}
      {/* {excerpt && <div className="PostCard--Excerpt">{excerpt}</div>} */}
    </div>
  </Link>
)

export default PostCard
