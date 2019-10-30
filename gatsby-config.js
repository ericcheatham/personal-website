'use strict'

module.exports = {
  siteMetadata: {
    title: 'Juliette Pretot',
    description: 'Gatsby TypeScript Skeleton Starter',
    siteUrl: 'https://juliette.sh',
    author: {
      name: 'Juliette Pretot',
      url: 'https://juliette.sh',
      email: 'hi@juliette.sh'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src`
      }
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-offline'
  ]
}
