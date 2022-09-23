import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/Feather'
import Slider from '@react-native-community/slider';

export default function SliderView({ width }) {
  return (
    <View>

      <View>
        <Slider
          style={{ width: width, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#9c16ad"
          maximumTrackTintColor="#b1a7bb"
          thumbTintColor="#9c16ad"
          onSlidingComplete={()=>{

          }}/>
        <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:18}}>
          <Text style={{color:'#fdfbff'}}>0:00</Text>
          <Text style={{color:'#fdfbff'}}>5:00</Text>
        </View>
      </View>

      <View style={{...styles.btnWrapper, width:width}}>
        <TouchableOpacity>
        <Icons name={'skip-back'} size={30} color={'#9c16ad'} />
        </TouchableOpacity>

          <TouchableOpacity >
        <Icons name='play' size={60} color={'#9c16ad'}/>
          </TouchableOpacity>

          <TouchableOpacity>
        <Icons name={'skip-forward'} size={30} color={'#9c16ad'} />
          </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  btnWrapper: {
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    marginTop:20
  }
})