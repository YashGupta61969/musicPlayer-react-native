import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import songs from '../data/data'
import { Audio } from 'expo-av'
import { useData } from '../context/Context'


export default function Songs({ navigation }) {
  const { playbackObj, setPlaybackObj, soundObj, setSoundObj, currentAudio, setCurrentAudio, setPlaybackPosition, setPlaybackDuration } = useData()


  const handleAudioPress = async (music) => {
    // playing audio for the first time
    if (!soundObj) {
      const playbackObj = new Audio.Sound();
      const status = await playbackObj.loadAsync({ uri: music.url }, { shouldPlay: true });
      setPlaybackObj(playbackObj)
      setSoundObj(status);
      setCurrentAudio(music)

      playbackObj.setOnPlaybackStatusUpdate((playbackStatus) => {
        if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
          setPlaybackPosition(playbackStatus.positionMillis)
          setPlaybackDuration(playbackStatus.durationMillis)
        } if (playbackStatus.didJustFinish) {

        }
      })

      return;
    }

    // pause audio if already playing
    if (soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === music.id) {
      const status = await playbackObj.setStatusAsync({ shouldPlay: false });
      setSoundObj(status);
      return;
    }

    // resume audio
    if (soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id === music.id) {
      const status = await playbackObj.playAsync()
      setSoundObj(status);
    }

    // play another audio
    if (soundObj.isLoaded && currentAudio.id !== music.id) {
      await playbackObj.stopAsync()
      await playbackObj.unloadAsync()
      const status = await playbackObj.loadAsync({ uri: music.url }, { shouldPlay: true })
      setCurrentAudio(music),
        setSoundObj(status)

    }
  }


  // flatlist item
  const songItem = ({ item }) => {
    return <TouchableOpacity style={styles.songItem}
      onPress={() => handleAudioPress(item)}>

      <Image source={{ uri: item.artwork }} style={styles.image} />

      <View>
        <Text style={{ color: item.id === currentAudio.id ? '#9c16ad' : '#fdfbff' }}>{item.title}</Text>
        {item.artist && <Text style={{ color: '#b1a7bb' }}>{item.artist}</Text>}
      </View>
    </TouchableOpacity>
  }
  return (
    <View style={styles.songs}>
      <FlatList
        data={songs}
        renderItem={songItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  songs: {
    flex: 1,
    backgroundColor: '#170524',
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  image: {
    width: 70,
    height: 70,
    marginLeft: 20,
    marginRight: 10,
    borderRadius: 5
  }
})