import '../styles/global.css';

import { Header } from '../components/Header/index';
import { Player } from '../components/Player/index';

import styles from '../styles/app.module.css';

function MyApp({ Component, pageProps }) {
  return(
    <div className={styles.wrapper}>
 
      <main>
        <Header/>
        <Component {...pageProps} />
      </main>
      <Player/>
    </div>
  )
}

export default MyApp

