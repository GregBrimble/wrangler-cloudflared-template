import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: '/non-existent-image.jpg' }}
        style={{ width: 150, height: 150 }}
      />
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>
        The client references a non-existent image. The worker intercepts the
        request and fetches an image from Unsplash!
      </Text>
      <Text>Hot-reloading works!!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
