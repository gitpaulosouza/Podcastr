import { createContext } from "react";

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
    setPlayingState: (estate: boolean) => void; 
    togglePlay: () => void;
};


export const PlayerContext = createContext({} as PlayerContextData);

