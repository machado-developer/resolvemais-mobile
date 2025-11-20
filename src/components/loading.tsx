
import React from 'react'
import { ActivityIndicator, } from 'react-native'

function Loading() {
  return (
    <ActivityIndicator
      size="large"
      color="#0000ff"
      className=' bg-orange-600 justify-center items-center' />
  )
}

export default Loading