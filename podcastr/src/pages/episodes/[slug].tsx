import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from "next/router";
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { api } from '../../services/api';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import { usePlayer } from '../../contexts/PlayerContexts';

import styles from './episode.module.css';


type Episode = {
    id: string;
    title: string;
    thumbnail: string;
    members: string;
    duration: number;
    durationAsString: string;
    url: string;
    publishedAt: string;
    description: string;
};

type EpisodeProps = {
    episode: Episode;
};

export default function Episode({ episode }: EpisodeProps){
    const { play } = usePlayer();

    return(
        < div className={styles.episode}>
            <Head>
                <title> {episode.title} | Podcastr</title>
            </Head>
            <div className={styles.thumbnailContainer}>
                <Link href={`/`}>
                    <button type="button">
                        <img src="/arrow-left.svg" alt="Voltar" /> 
                    </button>
                </Link>
                <Image 
                    width={700}
                    height={160}
                    src={episode.thumbnail}
                    objectFit="cover"
                />
                <button type="button" onClick={() => play(episode)}>
                    <img src="/play.svg" alt="Tocar episódio" />
                </button>
            </div>

            <header className={styles.headerEpisode}>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
            </header>

            <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: episode.description }}
                />
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {

    const { data }  = await api.get('episodes' , {
        params: {
          _limit: 2,
          _sort: 'published_at',
          _order: 'desc'
        }
      })

      const paths = data.map(episode => {
          return {
              params: {
                  slug: episode.id,
              }
          }
      })

    return{
        paths,
        fallback: 'blocking' //Bloqueia a pagina de ser exibida até o carregamento ser concluído
    }
} // gera as paginas dos ultimos 2 episodios de forma estática.

export const getStaticProps : GetStaticProps = async (ctx) => {
    const{ slug } = ctx.params;
    const{ data } = await api.get(`/episodes/${slug}`)

    const episode = {
        id: data.id,
        title:data.title,
        thumbnail:data.thumbnail,
        members:data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', {locale:ptBR}),
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url,
      };
    
    return{
        props:{
            episode,
        },
        revalidate: 60 * 60 * 24, // 24 horas
    }
}