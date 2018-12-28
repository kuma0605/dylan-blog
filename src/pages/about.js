import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

class About extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title="dylan senior front-end" />
        <h1>About me</h1>
        <p>Waiting to fill.</p>
      </Layout>
    )
  }
}

export default About
