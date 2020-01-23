import React from 'react'
import NavbarIcon from '~/components/NavbarIcon/navbarIcon'
import { IconType } from './types'
import { Home } from 'grommet-icons'

const Icon: IconType = ({ isFilled }) => (
  <NavbarIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    {isFilled ? <Home fill="red" /> : <Home fill="red" />}
  </NavbarIcon>
)

export default Icon
