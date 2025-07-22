import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const MoreIcon = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#222"
      d="M3 7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1Zm10 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1ZM8 7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1Z"
    />
  </Svg>
)
export default MoreIcon