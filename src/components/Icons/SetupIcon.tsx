import React from 'react'
import NavbarIcon from '~/components/NavbarIcon/navbarIcon'
import { IconType } from './types'
import { Monitor } from 'grommet-icons'

const Icon: IconType = ({ isFilled }) => (
  <NavbarIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    {isFilled ? <Monitor fill="red" /> : <Monitor fill="red" />}
  </NavbarIcon>
)

export default Icon
