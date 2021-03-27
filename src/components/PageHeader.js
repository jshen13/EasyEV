import React from 'react'
import PropTypes from 'prop-types'

import Image from './Image'
import Content from './Content'
import './PageHeader.css'

const PageHeader = ({
  title,
  subtitle,
  backgroundImage,
  large,
  className = '',
  home
}) => {
  if (large) className += ' PageHeader-large'
  return (
    <div className={`PageHeader relative ${className}`}>
      {backgroundImage && (
        <Image
          background
          resolutions="large"
          src={backgroundImage}
          alt={title}
          size="cover"
          
        />
      )}
      <div className="container relative">
        <h1 className="PageHeader--Title">{title}</h1>
        {subtitle && (
          <Content className="PageHeader--Subtitle" src={subtitle} />
        )}
      </div>

     {home &&
      <div className="PageHeader--Buttons relative">
      <center>
            <a href="/quiz">
              <div className="Button" tabindex="0" aria-label="Toggle Popup" role="button">Take a Preference Quiz</div>
            </a>
            <div className="Divider"/>
            <a href="/news">
            <div className="Button" tabindex="0" aria-label="Toggle Popup" role="button">Learn More about Electric Vehicles</div>
            </a>
          </center>
      </div>}
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

export default PageHeader
