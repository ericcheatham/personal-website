export default `
html,
body,
#___gatsby,
/* target reach router focus wrapper,
the defacto wrapper of all react content */
#___gatsby > div[role='group'] {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
`
