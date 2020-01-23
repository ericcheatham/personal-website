import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Layout from '~/components/Layout/layout'
import PageWrapper from '~/components/PageWrapper/pageWrapper'

const ButtonWrapper = styled.div`
  display: flex;
  margin: 2.5rem 0;
`

const NotFoundPage: React.FunctionComponent<{
  location: {
    pathname: string
  }
}> = ({ location: { pathname } }) => (
  <Layout pathname={pathname}>
    <PageWrapper>
      <h1>Whelp. Here we are.</h1>
      <p>Something didn't go right but we won't let that stop us!</p>
      <ButtonWrapper>
        <Link to="/">Start over!</Link>
      </ButtonWrapper>
    </PageWrapper>
  </Layout>
)

export default NotFoundPage
