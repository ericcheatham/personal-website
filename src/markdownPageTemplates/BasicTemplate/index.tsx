import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '~/components/Layout/layout'
import PageWrapper from '~/components/PageWrapper/pageWrapper'
import MarkdownWrapper from '~/components/MarkdownWrapper/markdownWrapper'

const BasicTemplate: React.FunctionComponent<{
  data: any // type checked by GraphQL
  location: {
    pathname: string
  }
}> = ({
  data: {
    markdownRemark: {
      frontmatter: { title },
      html
    }
  },
  location: { pathname }
}) => (
  <>
    <Helmet>
      <title>Eric Cheatham | {title}</title>
      <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    </Helmet>
    <Layout pathname={pathname}>
      <PageWrapper>
        <div>
          <h1>{title}</h1>
          <MarkdownWrapper dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </PageWrapper>
    </Layout>
  </>
)

export default BasicTemplate

export const BasicTemplateQuery = graphql`
  query BasicTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
