import * as React from 'react'
import { graphql } from 'gatsby'
import Root from '~/components/Root'

interface PageTemplateProps {
  data: {
    markdownRemark: {
      html: string
      excerpt: string
      frontmatter: {
        title: string
      }
    }
  }
}

const PageTemplate: React.FunctionComponent<PageTemplateProps> = ({ data }) => (
  <Root>
    <h1>{data.markdownRemark.frontmatter.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
  </Root>
)

export default PageTemplate

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
      }
    }
  }
`
