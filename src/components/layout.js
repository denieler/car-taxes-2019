import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'

import 'semantic-ui-css/semantic.min.css'
import './layout.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        },
        file (name: { eq: "facebook" }) {
          facebookImageUrl: publicURL
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Онлайн калькулятор растаможки авто в Украине в 2019 году. Стоимость растаможки значительно изменяется в 2019 году по сравнению с предыдущими годами, поэтому предлагаем удобный инструмент для вычисления стоимости растаможки онлайн.' },
            { name: 'keywords', content: 'растаможка, калькулятор, Украина, авто, 2019, стоимость растаможки, стоимость, онлайн' },
          ]}
        >
          <html lang="en" />
          <meta property="og:image" content={data.file.facebookImageUrl} />
          <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'></link>
        </Helmet>
        <Header />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children}
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
