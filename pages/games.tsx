import { Layout } from '@components/common'
import { GamesGrid } from '@components/games'
import Image from 'next/image'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import s from '../assets/pages/games.module.scss'

export async function getStaticProps() {
  const client = createClient({
    space: `${process.env.CONTENTFUL_SPACE_ID}`,
    accessToken: `${process.env.CONTENTFUL_ACCESS_KEY}`,
  })

  const res = await client.getEntries({ content_type: 'games' })
  const resp = await client.getEntries({ content_type: 'game' })

  return {
    props: {
      home: res.items,
      game: resp.items,
    },
    revalidate: 60,
  }
}

export default function Games(
  { home, game }: { game: any; home: any },
  {}: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { heroImage, heroText, firstSection } = home[0].fields

  return (
    <div className={s.pageWrap}>
      <div className={s.heroContainer}>
        <Image
          priority={true}
          layout="responsive"
          src={'https:' + heroImage.fields.file.url}
          width={heroImage.fields.file.details.image.width}
          height={heroImage.fields.file.details.image.height}
          alt={heroImage.fields.title}
        />
        <div className={s.heroOverlay}></div>
        <div className={s.heroTextWrap}>
          <h1 id={s.gamesHeroText}>{heroText}</h1>
        </div>
      </div>
      <div className={s.firstSection}>
        {documentToReactComponents(firstSection)}
      </div>
      <GamesGrid game={game} />
    </div>
  )
}

Games.Layout = Layout
