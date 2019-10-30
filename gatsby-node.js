'use strict'

/*

Configure Gatsby to create pages from markdown files in ./src/markdownPages

*/

const pathUtil = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const MARKDOWN_PAGE_TEMPLATE = './src/components/MarkdownPage/index.tsx'

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const filePath = createFilePath({ node, getNode })
    const slug = filePath.startsWith('/pages') ? filePath.replace('/pages', '/') : ''

    actions.createNodeField({
      node,
      name: 'slug',
      value: slug
    })

    actions.createNodeField({
      node,
      name: 'isPage',
      value: !!slug
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const allMarkdown = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              isPage
              slug
            }
          }
        }
      }
    }
  `)

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors)
    throw new Error(allMarkdown.errors)
  }

  allMarkdown.data.allMarkdownRemark.edges
    .filter(({ node }) => !!node.fields.isPage)
    .forEach(({ node }) => {
      const { slug } = node.fields

      createPage({
        path: slug,
        component: pathUtil.resolve(MARKDOWN_PAGE_TEMPLATE),
        context: {
          // Data passed to context is available in page queries as GraphQL
          // variables.
          slug
        }
      })
    })
}
