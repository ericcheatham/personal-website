import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import Layout from '~/components/Layout/layout'
import PageWrapper from '~/components/PageWrapper/pageWrapper'

const Projects = styled.div`
  column-count: 2;
  column-gap: 1em;
  @media (max-width: 700px) {
    column-count: 1;
    column-gap: 0;
  }
`

const ProjectWrapper = styled.div`
  margin: 0 0 2em;
  break-inside: avoid;
  display: inline-block;
  width: 100%;
`

const ImageTitleWrapper = styled.div`
  position: relative;
`
const Title = styled.h3`
  margin: 0;
`

const Description = styled.p`
  font-size: smaller;
  margin: 0;
`
const ToolsUsed = styled.span`
  color: var(--gray);
  font-size: smaller;
  display: inline-block;
  margin-bottom: 1rem;
`

const IndexPage: React.FunctionComponent<{
  data: any // type checked by GraphQL
  location: {
    pathname: string
  }
}> = ({
  data: {
    allMarkdownRemark: { edges }
  },
  location: { pathname }
}) => {
  const projectPosts = edges.filter((post: any) => post.node.fields.slug.startsWith('/projects/'))

  return (
    <Layout pathname={pathname}>
      <PageWrapper>
        <Projects>
          {projectPosts.map(
            ({
              node: {
                id,
                frontmatter: { featuredImage, title, tools, intro }
              }
            }: any) => {
              return (
                <ProjectWrapper key={id}>
                  <ImageTitleWrapper>
                    <Img
                      placeholderStyle={{}}
                      fadeIn={false}
                      sizes={{
                        ...featuredImage.childImageSharp.sizes,
                        base64: featuredImage.childImageSharp.sqip.dataURI
                      }}
                    />
                    <Title>{String(title)}</Title>
                  </ImageTitleWrapper>
                  <Description>{intro}</Description>
                  <ToolsUsed>{tools}</ToolsUsed>
                </ProjectWrapper>
              )
            }
          )}
        </Projects>
      </PageWrapper>
    </Layout>
  )
}

export default IndexPage

export const projectQuery = graphql`
  query ProjectsOverviewQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            tools
            templateKey
            intro
            link
            featuredImage {
              childImageSharp {
                sqip(numberOfPrimitives: 24, blur: 0, width: 256) {
                  dataURI
                  svg
                }
                sizes(maxWidth: 600) {
                  ...GatsbyImageSharpSizes_withWebp_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`
