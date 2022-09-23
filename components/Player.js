import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
import { useData } from '../context/Context';
import PlayerFunctions from './PlayerFunctions'

function Player() {
  const { width } = useWindowDimensions();
  const { currentAudio } = useData()

  return (
    <View style={styles.container}>
      <View style={{ width: width - 45, marginTop: 10 }}>
        <Image source={{ uri: currentAudio.artwork }} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{currentAudio.title}</Text>
        <Text style={styles.artist}>{currentAudio.artist}</Text>
      </View>
      <PlayerFunctions width={width} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#170524'
  },
  details: {
    marginVertical: 10,
    alignItems: 'center'
  },
  image: {
    height: 350,
     width: '100%',
     borderRadius: 10
  },
  title:{
    fontSize: 22,
     color: '#fdfbff',
     marginBottom: 5
  },
  artist:{
    fontSize: 15,
   color: '#b1a7bb' 
  }
})

export default Player