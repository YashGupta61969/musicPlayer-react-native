import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icons from 'react-native-vector-icons/Feather'
import Slider from '@react-native-community/slider';
import { useData } from '../context/Context';
import data from '../data/data';


export default function SliderView({ width }) {
  const {playbackDuration, playbackPosition, soundObj, playbackObj, setSoundObj, currentAudio, setCurrentAudio} = useData();

  const [loading, setLoading] = useState(false)

  const calcSeekBar = ()=>{
    if(playbackDuration && playbackPosition){
      return playbackPosition / playbackDuration
    }
    return 0
  }

  function msToHMS( duration ) {
    
      let seconds = parseInt((duration / 1000) % 60),
       minutes = parseInt((duration / (1000 * 60)) % 60)

     minutes = (minutes < 10) ? "0" + minutes : minutes;
     seconds = (seconds < 10) ? "0" + seconds : seconds;

     return minutes + ":" + seconds ;
}

const handlePlayPause = async()=>{
  if(soundObj.isLoaded && soundObj.isPlaying){
    const newStatus = await playbackObj.setStatusAsync({shouldPlay:false});
    return setSoundObj(newStatus)
  }

  if(soundObj.isLoaded && !soundObj.isPlaying){
    const newStatus = await playbackObj.playAsync()
    setSoundObj(newStatus);
  }
}

const playNext = async ()=>{
  const nextAudio = data.find(el=>+el.id === +currentAudio.id + 1)
  if(soundObj.isLoaded && currentAudio.id !== nextAudio.id){
    await playbackObj.stopAsync()
    await playbackObj.unloadAsync()
    const status = await playbackObj.loadAsync({uri:nextAudio.url},{shouldPlay:true})
    setSoundObj(status);
    setCurrentAudio(nextAudio)
    setLoading(true)
  }
}

const playPrev = async() =>{
  const prevAudio = data.find(el=>+el.id === +currentAudio.id - 1)
  if(soundObj.isLoaded && currentAudio.id !== prevAudio.id){
    await playbackObj.stopAsync()
    await playbackObj.unloadAsync()
    const status = await playbackObj.loadAsync({uri:prevAudio.url},{shouldPlay:true})
    setSoundObj(status);
    setCurrentAudio(prevAudio)
    setLoading(true)
  }
}

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
          value={calcSeekBar()}
          onSlidingComplete={() => {

          }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 18 }}>
          <Text style={{ color: '#fdfbff' }}>{msToHMS(playbackPosition)}</Text>
          <Text style={{ color: '#fdfbff' }}>{msToHMS(playbackDuration)}</Text>
        </View>
      </View>

      <View style={{ ...styles.btnWrapper, width: width }}>
        <TouchableOpacity onPress={playPrev}>
          <Icons name={'skip-back'} size={30} color={'#9c16ad'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePlayPause} >
          <Icons name={soundObj.isPlaying ? 'pause' : 'play'} size={60} color={'#9c16ad'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={playNext}>
          <Icons name={'skip-forward'} size={30} color={'#9c16ad'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20
  }
})