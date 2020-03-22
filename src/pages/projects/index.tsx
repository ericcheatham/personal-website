import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import Layout from '~/components/Layout/layout'
import PageWrapper from '~/components/PageWrapper/pageWrapper'

const Projects = styled.div`
  column-count: 1;
  column-gap: 1em;
  @media (max-width: 700px) {
    column-count: 1;
    column-gap: 0;
  }
`

const Post = styled.article`
  width: 100%;
  max-width: 100%;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  min-height: 11rem;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 1px 1px 0 rgba(31, 35, 46, 0.15);
  background-color: rgba(255, 255, 255, 0.5);
  &:hover {
    transform: translate(0px, -2px);
    box-shadow: 0 15px 45px -10px rgba(10, 16, 34, 0.2);
  }

  .post-thumbnail {
    width: 30%;
    max-width: 100%;
    min-height: 11rem;
    background-size: cover;
    background-position: 50% 50%;
  }

  .post-content {
    padding: 1rem;
    width: 70%;
    .post-date,
    .post-words {
      font-size: 12px;
    }
    .post-title {
      margin: 0 0 10px;
      font-size: 30px;
      font-weight: 400;
      a {
        font-family: 'PT Serif', serif;
        text-decoration: none;
        color: $dark-blue;
      }
    }
    p {
      margin-top: 0;
    }
  }
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
                // id,
                frontmatter: {
                  featuredImage,
                  title,
                  // tools,
                  intro,
                  date
                }
              }
            }: any) => {
              return (
                <Post key={String(title)}>
                  {featuredImage && (
                    <Img
                      className="post-thumbnail"
                      fadeIn={false}
                      sizes={{
                        ...featuredImage.childImageSharp.sizes,
                        base64: featuredImage.childImageSharp.sqip.dataURI
                      }}
                    />
                  )}
                  <div className="post-content">
                    <h2 className="post-title">{String(title)}</h2>
                    <p>{intro}</p>
                    <span className="post-date">{date}</span>
                  </div>
                </Post>
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
            date(formatString: "MMM DD, YYYY")
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
