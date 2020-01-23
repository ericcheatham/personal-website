import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~/components/Layout/layout'
import MarkdownWrapper from '~/components/MarkdownWrapper/markdownWrapper'

const Page: React.FunctionComponent<{
  data: any // type checked by GraphQL
  location: {
    pathname: string
  }
}> = ({
  data: {
    markdownRemark: {
      frontmatter: { title, featuredImage },
      html
    }
  },
  location: { pathname }
}) => (
  <Layout
    pathname={pathname}
    image={featuredImage.childImageSharp.fluid}
    imageTitle="Photo of Eric Cheatham"
    imageBackgroundColor="transparent"
  >
    <div>
      <h1>{title}</h1>
      <MarkdownWrapper dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  </Layout>
)

export default Page

export const PageQuery = graphql`
  query Page($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
