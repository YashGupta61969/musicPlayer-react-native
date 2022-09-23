import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
import { useData } from '../context/Context';
import SliderView from './Slider'

function Player() {
  const { width } = useWindowDimensions();
  const {currentAudio} = useData()

  return (
    <View style={styles.container}>
      <View style={{width:width-45, marginTop:10}}>
       <Image source={{uri:currentAudio.artwork}} style={{height:350,width:'100%', borderRadius:10}}/>
      </View>
      <View style={styles.details}>
        <Text style={{fontSize:22, color:'#fdfbff', marginBottom:5}}>{currentAudio.title}</Text>
       <Text style={{fontSize:15, color:'#b1a7bb'}}>{currentAudio.artist}</Text>
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