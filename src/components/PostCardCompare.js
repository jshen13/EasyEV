import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'
import './PostCard.css'


const colorChooser = (num1, num2, lowerBetter) => {
  var diff = num1 - num2;
  let color = 'default';
  if (Math.abs(diff) < 0.05 * ((num1 + num2) / 2)) {
    return color;
  }
  if (diff > 0) {
    // num1 higher
    color = 'green';
  } else {
    color = 'red';
  }

  if (lowerBetter && color === 'green') {
    color = 'red';
  } else if (lowerBetter && color === 'red') {
    color = 'green';
  }
  return color;
}


const PostCardCompare = ({
  car1,
  car2
}) => (
  <React.Fragment>
    
      {car1 &&
      <Link to={car1.slug} className="PostCard--Temp">
        {car1.featuredImage && 
          <div className="PostCard--Image relative">
            <Image background src={car1.featuredImage} alt={car1.title} />
          </div>
        }
        <div className="PostCard--Content">
          {car1.title && <h3 className="PostCard--Title">{car1.title}</h3>}
          <div className="PostCard--Category">
            {car1.categories && car1.categories.map(cat => cat.category).join(', ')}
          </div>
          {car1.price && <div className={car2 && car2.price ? ("PostCard--Attr-" + colorChooser(car1.price, car2.price, true)) : "PostCard--Attr-default"}>${Number(car1.price).toLocaleString()}</div>}

          {car1.range && <div className={car2 && car2.range ? ("PostCard--Attr-" + colorChooser(car1.range, car2.range, false)) : "PostCard--Attr-default"}>{car1.range} mi range </div>}

          {car1.acceleration && <div className={car2 && car2.acceleration ? ("PostCard--Attr-" + colorChooser(car1.acceleration, car2.acceleration, true)) : "PostCard--Attr-default"}>{car1.acceleration} s 0-60 mph</div>}

          {car1.top_speed && <div className={car2 && car2.top_speed ? ("PostCard--Attr-" + colorChooser(car1.top_speed, car2.top_speed, false)) : "PostCard--Attr-default"}>{car1.top_speed} mph top speed</div>}

          {car1.mpge && <div className={car2 && car2.mpge ? ("PostCard--Attr-" + colorChooser(car1.mpge, car2.mpge, false)) : "PostCard--Attr-default"}>{car1.mpge} MPGe</div>}

          {car1.safetyRating && <div className={car2 && car2.safetyRating ? ("PostCard--Attr-" + colorChooser(car1.safetyRating, car2.safetyRating, false)) : "PostCard--Attr-default"}>{car1.safetyRating}/5 Safety Rating</div>}
        </div>
      </Link>}
  </React.Fragment>
)

export default PostCardCompare
