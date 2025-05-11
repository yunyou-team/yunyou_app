import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const HotelIcon = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#222"
      d="M14.667 7.333v6h-1.334v-2H2.667v2H1.333V2.667h1.334v6.666H8V4.667h4a2.667 2.667 0 0 1 2.667 2.666Zm-1.334 2v-2C13.333 6.597 12.736 6 12 6H9.333v3.333h4Zm-8-2a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333Zm0 1.334a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
    />
  </Svg>
)
export default HotelIcon
