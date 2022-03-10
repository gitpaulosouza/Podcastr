import { createContext, ReactNode, useContext, useState } from "react";

//informações para salvar no contexto 

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type PlayerContextData = {
    episodeList: Episode[]; //Lista de episódios
    currentEpisodeIndex: number; //Indica qual episódio está tocando
    isPlaying: boolean; //Boolean se o ep esta tocando
    play: (episode: Episode) => void;
    playList: (list: Episode[], index : number) => void;
    setPlayingState: (estate: boolean) => void; 
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
    hasNext:boolean;
    hasPrevious: boolean;
};


export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps){

    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying,setIsPlaying] = useState(false);
  
    function play(episode){
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }
  
    function togglePlay(){
      setIsPlaying(!isPlaying);
    }
  
    function setPlayingState(state: boolean) {// verifica se o audio está tocando ou não
      setIsPlaying(state);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = (currentEpisodeIndex + 1) < episodeList.length;

    function playNext(){
        if (hasNext) {
           setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    function playPrevious(){
        if (hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }

    function shuffle(){
        setCurrentEpisodeIndex(currentEpisodeIndex )
    }
  
    return(
        <PlayerContext.Provider 
        value={{ 
            episodeList, 
            currentEpisodeIndex, 
            play,
            playNext,
            playPrevious,
            isPlaying,
            playList, 
            togglePlay, 
            setPlayingState, 
            hasNext,
            hasPrevious,
            }}>
            { children }
        </PlayerContext.Provider>
          )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}