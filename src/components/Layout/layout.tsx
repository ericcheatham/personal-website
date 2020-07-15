import React from 'react'
import GlobalStyles from '~/components/GlobalStyles/globalStyles'
import Navbar from '~/components/Navbar/navbar'
import styled from 'styled-components'
import Img, { FluidObject } from 'gatsby-image'
import { constants } from '~/styles/constants'

const Container = styled.div`
  background: var(--background);
  margin-top: calc(67vh - 1.25rem);
  padding: 2.5rem;
  position: relative;

  ${constants.mq.mobile} {
    margin-bottom: 20px;
    margin-top: ${props => props.theme.marginTopMobile};
    position: relative;
  }

  ${constants.mq.tablet} {
    margin-left: ${props => props.theme.margin};
    margin-bottom: 20px;
    margin-top: ${props => props.theme.marginTop};
    position: relative;
  }

  ${constants.mq.desktop} {
    padding: ${constants.gutter.desktop};
    padding-top: ${constants.gutter.tablet};
  }
`

const theme = {
  margin: '45vw',
  marginTop: '15vh',
  marginTopMobile: '40vh'
}

const themeCenter = {
  margin: '20vw',
  marginTop: '0',
  marginTopMobile: '0'
}

// TODO:  Move values to a constants file
export const Main = styled.main`
  background: var(--background-color);
  padding-top: ${constants.gutter.default};
  position: relative;
  z-index: ${constants.elevation.overlay};
`

const Image = styled(Img)`
  max-width: 100%;
  bottom: 33vh;
  left: ${constants.gutter.default};
  right: ${constants.gutter.default};
  top: ${constants.gutter.default};

  ${constants.mq.mobile} {
    max-height: 40vh;
  }

  ${constants.mq.tablet} {
    bottom: 0;
    left: 0;
    right: auto;
    top: 0;
    width: ${constants.offset};
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
      <GlobalStyles isApp={isApp} />
      <Navbar pathname={pathname} />
      <Main>{children}</Main>
    </Container>
  )
}

export default Layout
