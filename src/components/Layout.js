import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

import { rhythm, scale } from '../utils/typography'

import BackgroundImage from 'gatsby-background-image'

import layoutStyle from './layout.module.css'

class Layout extends React.Component {
  render() {
    const { location, title, children , data} = this.props
    
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    const imageData = data.wallPaper.childImageSharp.fluid
    console.log(imageData)
    return (
      <BackgroundImage 
        className={layoutStyle.container}
        fluid={imageData}>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          // maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(8 / 4)}`,
          position: "relative",
          
          width:`100%`,
          height:`100%`
        }}
      >
        {header}
        {children}
        <footer>
          © 2018, Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
      </BackgroundImage> 
    )
  }
}

// export default Layout
const layoutQuery = graphql`
 query {
  wallPaper:file(relativePath: { eq: "wallPaper.jpg" }){
    childImageSharp{
      fluid (quality: 100, maxWidth: 4160){
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
 }
`
export default props => {
  return (<StaticQuery 
    query={layoutQuery}
    render={ data => {
        return (<Layout data={data} {...props} />) 
      }
    }
  >
  </StaticQuery>)
}


