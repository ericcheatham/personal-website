import React from 'react'
import Helmet from 'react-helmet'
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
  <>
    <Helmet>
      <title>Eric Cheatham | {title}</title>
      <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    </Helmet>
    <Layout
      pathname={pathname}
      image={featuredImage.childImageSharp.fluid}
      imageTitle="Photo of Eric Cheatham"
      imageBackgroundColor="transparent"
    >
      <div>
        <MarkdownWrapper dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  </>
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
