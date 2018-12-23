import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import Footer from './Footer'
import './layout.css'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100vh;
`
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0px 50px 50px 50px;

  @media (max-width: 500px) {
    padding: 0px 15px 15px 15px;
  }
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Wrapper>
        <Container>
          <Header />
          <div>{children}</div>
        </Container>
        <Footer />
      </Wrapper>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
