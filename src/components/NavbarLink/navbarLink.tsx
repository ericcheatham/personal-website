import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import { IconProps } from '~/components/Icons/types'
import { constants } from '~/styles/constants'

const StyledLink = styled(Link)`
  transition: all 100ms ease-in-out;
  position: relative;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  text-align: center;
  color: var(--white);
  font-weight: bold;
  font-size: 92.5%;
  text-decoration: none;
  padding: 0.45rem 0.9rem;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  @media (max-width: 1100px) {
    width: 2ch;
    padding: 0.45rem 1.5rem;
  }
  ${({ isActive }: { isActive: Boolean }) =>
    isActive &&
    css`
      ${constants.mq.mobile} {
        text-decoration: underline;
      }

      ${constants.mq.tablet} {
        border-bottom: 2px solid var(--white);
      }
    `}
  @media (max-width: 700px) {
    padding: 0.35rem 1.5rem;
    margin: 0.3rem 0;
  }
`

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const Caption = styled.span`
  margin-left: 0.5rem;
  display: inline;
  @media (max-width: 700px) {
    font-size: 0.8rem;
  }
`

const NavbarLink: React.FunctionComponent<{
  isActive: boolean
  to: string
  label: string
  Icon: (props: IconProps) => JSX.Element
}> = ({ isActive, to, label, Icon }) => (
  <StyledLink isActive={isActive} to={to}>
    <InnerWrapper>
      {Icon({ isFilled: isActive })}
      <Caption>{label}</Caption>
    </InnerWrapper>
  </StyledLink>
)

export default NavbarLink
