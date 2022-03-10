import '../styles/global.css';
import { useState } from 'react';

import { Header } from '../components/Header/index';
import { Player } from '../components/Player/index';
import { PlayerContextProvider } from '../contexts/PlayerContexts';

import styles from '../styles/app.module.css';

function MyApp({ Component, pageProps }) {

  return(
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header/>
          <Component {...pageProps} />
        </main>
        <Player/>
      </div>
    </PlayerContextProvider>
  )
}

export default MyApp

