import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Normalize } from 'styled-normalize'
import styled, { createGlobalStyle } from 'styled-components'
import globalStyles from '~/styles/globalStyles'
import { fonts } from '~/styles/constants'

const GlobalStyles = createGlobalStyle`${globalStyles}`

type StaticQueryProps = {
  site: {
    siteMetadata: {
      title: string
      description: string
    }
  }
}

const Root: React.FunctionComponent = ({ children }) => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => (
      <>
        <Normalize />
        <GlobalStyles />
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[{ name: 'description', content: data.site.siteMetadata.description }]}
        />
        <RootLayout>{children}</RootLayout>
      </>
    )}
  />
)

const RootLayout = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${fonts.sansSerif};
`

export default Root
