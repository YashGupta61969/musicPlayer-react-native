import React, {useState, useContext, createContext} from "react";

const DataContext = createContext()

export default ContextProvider = ({children})=>{
    const [playbackObj, setPlaybackObj] = useState()
    const [soundObj, setSoundObj] = useState()
    const [currentAudio, setCurrentAudio] = useState({})  
    const [playbackPosition, setPlaybackPosition] = useState()  
    const [playbackDuration, setPlaybackDuration] = useState()  

    return <DataContext.Provider value={{playbackObj, setPlaybackObj,soundObj, setSoundObj,currentAudio ,setCurrentAudio, playbackPosition, setPlaybackPosition, playbackDuration,setPlaybackDuration  }}>
        {children}
    </DataContext.Provider>
}


export const useData = ()=> useContext(DataContext)