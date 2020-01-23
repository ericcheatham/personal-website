import React from 'react'
import NavbarIcon from '~/components/NavbarIcon/navbarIcon'
import { IconType } from './types'
import { User } from 'grommet-icons'

const Icon: IconType = ({ isFilled }) => (
  <NavbarIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    {isFilled ? <User fill="red" /> : <User fill="red" />}
  </NavbarIcon>
)

export default Icon
