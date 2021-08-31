import React from 'react'
import Image from 'next/image'
import s from './../../assets/pages/game.module.scss'
import { Layout } from '@components/common'
import { createClient } from 'contentful'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const client = createClient({
  space: `${process.env.CONTENTFUL_SPACE_ID}`,
  accessToken: `${process.env.CONTENTFUL_ACCESS_KEY}`,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'game',
  })

  const paths = res.items.map((item: any) => {
    return {
      params: { slugs: item.fields.slugs },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: any }) {
  const { items } = await client.getEntries({
    content_type: 'game',
    'fields.slugs': params.slugs,
  })
  return {
    props: { game: items[0] },
  }
}

const option = {
  renderNode: {
    // eslint-disable-next-line react/display-name
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      let { file, title } = node.data.target.fields

      return (
        <div>
          <picture>
            <Image
              layout="responsive"
              src={'https:' + file.url}
              height={file.details.image.height}
              width={file.details.image.width}
              alt={title}
            />
          </picture>
        </div>
      )
    },
  },
}

const optionTwo = {
  renderNode: {
    // eslint-disable-next-line react/display-name
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      let { file, title } = node.data.target.fields

      return (
        <div>
          <picture>
            <Image
              layout="responsive"
              src={'https:' + file.url}
              height={file.details.image.height}
              width={file.details.image.width}
              alt={title}
            />
          </picture>
        </div>
      )
    },
  },
}

export default function Game({ game }: { game: any }) {
  const {
    heroImage,
    heroText,
    firstSection,
    heroTwo,
    secondSection,
    thirdSection,
    fourthSection,
  } = game.fields
  const heading = heroText.toUpperCase()

  return (
    <div className={s.gamePageWrap}>
      <div className={s.heroContainer}>
        <Image
          priority={true}
          layout="responsive"
          src={'https:' + heroImage.fields.file.url}
          width={heroImage.fields.file.details.image.width}
          height={heroImage.fields.file.details.image.height}
          alt={heroText}
        />
        <div className={s.heroOverlay}></div>
        <div className={s.heroTextWrap}>
          <h1>{heading}</h1>
        </div>
      </div>
      <div className={s.firstSection}>
        {documentToReactComponents(firstSection, option)}
      </div>
      <div className={s.heroTwo}>
        <Image
          layout="responsive"
          src={'https:' + heroTwo.fields.file.url}
          width={heroTwo.fields.file.details.image.width}
          height={heroTwo.fields.file.details.image.height}
          alt={heroText}
        />
      </div>

      <div className={s.secondSection}>
        <div className={s.textWrap}>
          {documentToReactComponents(secondSection, option)}
        </div>
      </div>
      <div className={s.thirdSection}>
        <div className={s.innerThirdSection}>
          {documentToReactComponents(thirdSection, optionTwo)}
        </div>
      </div>
      <div className={s.fourthSection}>
        <div className={s.socialLinks}>
          <a
            href="https://twitter.com/GolfwayOfficial"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/twitter-grey.svg"
              height="100"
              width="100"
              alt="twitter icon"
            />
          </a>
          <a
            href="https://www.facebook.com/golfway.official/"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/facebook-grey.svg"
              height="100"
              width="100"
              alt="facebook icon"
            />
          </a>
          <a
            href="https://www.instagram.com/golfway_official/"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/instagram-grey.svg"
              height="100"
              width="100"
              alt="instagram icon"
            />
          </a>
        </div>
        <div className={s.textWrap}>
          <h2>SHOW US YOUR GAME</h2>
          <p>
            We’d love to see how you’ve setup your own game and playing with
            Golfway. Remember to tag and follow us on social media and you could
            even get the chance to win prizes.
          </p>
          <p>#HereToPlay</p>
        </div>
      </div>
    </div>
  )
}

Game.Layout = Layout
