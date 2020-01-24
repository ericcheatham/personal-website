import React from 'react'
import MainStyles from '~/components/MainStyles/mainStyles'
import Navbar from '~/components/Navbar/navbar'
import styled from 'styled-components'
import Img, { FluidObject } from 'gatsby-image'

const Container = styled.div`
  background: var(--background);
  margin-top: calc(67vh - 1.25rem);
  padding: 2.5rem;
  position: relative;

  @media (min-width: 750px) {
    margin-left: ${props => props.theme.margin};
    margin-bottom: 20px;
    margin-top: ${props => props.theme.marginTop};
    position: relative;
  }
`

const theme = {
  margin: '45vw',
  marginTop: '15vh'
}

const themeCenter = {
  margin: '20vw',
  marginTop: '0'
}

// TODO:  Move values to a constants file
export const Main = styled.main`
  background: var(--background);
  padding-top: 1.25rem;
  position: relative;
  z-index: 20;
`

const Image = styled(Img)`
  max-width: 100%;
  bottom: 33vh;
  left: 1.25rem;
  right: 1.25rem;
  top: 1.25rem;

  @media (min-width: 750px) {
    bottom: 0;
    left: 0;
    right: auto;
    top: 0;
    width: 45vw;
  }
`

const Layout: React.FunctionComponent<{
  pathname: string
  image?: FluidObject
  imageTitle?: string
  imageBackgroundColor?: string
}> = ({ pathname, children, image, imageTitle, imageBackgroundColor }) => {
  const [isApp, setIsApp] = React.useState(false)
  const [hasImage, setHasImage] = React.useState(false)
  React.useEffect(() => setIsApp('standalone' in window.navigator), [])
  React.useEffect(() => setHasImage(!!image), [])

  return (
    <Container theme={hasImage ? theme : themeCenter}>
      {image && (
        <Image
          fluid={image}
          style={{ position: 'fixed' }}
          backgroundColor={imageBackgroundColor ? imageBackgroundColor : false}
          title={imageTitle}
        />
      )}
      <MainStyles isApp={isApp} />
      <Navbar pathname={pathname} />
      <Main>{children}</Main>
    </Container>
  )
}

export default Layout
