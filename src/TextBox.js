import React from 'react'
import { View, Text } from 'react-native'

const TextBox = (props)=>{
  return(
    <View style={{ width:"100%",padding:4}}>
      <Text>{props.label}</Text>
      <Text>{props.content}</Text>
    </View>
  )
}

export default TextBox
