import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
import songs from '../data/data'
import SliderView from './Slider'

function Player() {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={{width:width-45, marginTop:10}}>
        <Image source={{uri:songs[1].artwork}} style={{height:350,width:'100%', borderRadius:10}}/>
      </View>
      <View style={styles.details}>
        <Text style={{fontSize:22, color:'#fdfbff', marginBottom:5}}>{songs[0].title}</Text>
        <Text style={{fontSize:15, color:'#b1a7bb'}}>{songs[0].artist}</Text>
      </View>
      <SliderView width={width}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#170524'
  },
  details:{
    marginVertical:10,
    alignItems:'center'
  }
})

export default Player