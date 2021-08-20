import React from 'react'
import Image from 'next/image'
import s from './../../assets/pages/stories.module.scss'
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
    content_type: 'story',
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
    content_type: 'story',
    'fields.slugs': params.slugs,
  })
  return {
    props: { story: items[0] },
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

export default function Story({ story }: { story: any }) {
  const {
    heroImage,
    title,
    sectionOne,
    statsTitle,
    statsOne,
    statsTwo,
    statsThree,
    statsTextOne,
    statsTextTwo,
    statsTextThree,
    highlights,
    secondHero,
    finalText,
  } = story.fields
  const heading = title.toUpperCase()

  console.log(story)

  return (
    <div className={s.story}>
      <div className={s.heroContainer}>
        <div className={s.heroImage}>
          <Image
            priority={true}
            layout="responsive"
            src={'https:' + heroImage.fields.file.url}
            width={heroImage.fields.file.details.image.width}
            height={heroImage.fields.file.details.image.height}
            alt={title}
          />
          <div className={s.heroOverlay}></div>
          <div className={s.heroTextWrap}>
            <h1>{heading}</h1>
          </div>
        </div>
      </div>
      <div className={s.sectionOne}>
        {documentToReactComponents(sectionOne, option)}
      </div>
      <div className={s.sectionTwo}>
        <div className={s.sectionTwoInnerWrap}>
          <h2>{documentToReactComponents(statsTitle)}</h2>
          <div className={s.statsWrap}>
            <div className={s.stats}>
              <h3>{statsOne}</h3>
              <p>{documentToReactComponents(statsTextOne)}</p>
            </div>
            <div className={s.stats}>
              <h3>{statsTwo}</h3>
              <p>{documentToReactComponents(statsTextTwo)}</p>
            </div>
            <div className={s.stats}>
              <h3>{statsThree}</h3>
              <p>{documentToReactComponents(statsTextThree)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={s.sectionThree}>
        {documentToReactComponents(highlights, option)}
      </div>
      <div className={s.heroContainer}>
        <div className={s.heroImage}>
          <Image
            src={'https:' + secondHero.fields.file.url}
            width={secondHero.fields.file.details.image.width}
            height={secondHero.fields.file.details.image.height}
            alt={title}
          />
        </div>
      </div>
      <div className={s.sectionFour}>
        {documentToReactComponents(finalText, option)}
      </div>
    </div>
  )
}

Story.Layout = Layout
