import '../styles/global.css';
import { useState } from 'react';

import { Header } from '../components/Header/index';
import { Player } from '../components/Player/index';
import { PlayerContext } from '../contexts/PlayerContexts';

import styles from '../styles/app.module.css';

function MyApp({ Component, pageProps }) {

  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  function play(episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
  }

  return(
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play }}>
    <div className={styles.wrapper}>
      <main>
        <Header/>
        <Component {...pageProps} />
      </main>
      <Player/>
    </div>
    </PlayerContext.Provider>
  )
}

export default MyApp

