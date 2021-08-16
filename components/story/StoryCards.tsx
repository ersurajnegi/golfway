import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import s from './storycard.module.scss'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export async function getStaticProps({}: GetStaticPropsContext) {
  const client = createClient({
    space: `${process.env.CONTENTFUL_SPACE_ID}`,
    accessToken: `${process.env.CONTENTFUL_ACCESS_KEY}`,
  })

  const res = await client.getEntries({ content_type: 'story' })

  return {
    props: {
      story: res.items,
    },
    revalidate: 60,
  }
}

export default function StoryCards(
  { story }: { story: any },
  {}: InferGetStaticPropsType<typeof getStaticProps>
) {
  //   const { title, thumbnail, publishedDate, slugs } = story.fields
  //   const date = publishedDate.slice(0, -12).split('-').join(' ')
  console.log(story)
  return (
    <div className={s.storyList}>
      <div className={s.storyCard}>
        <div className={s.image}>
          {/* <Image 
        layout="responsive"
        src={'https:' + firstSectionImage.fields.file.url}
        width={firstSectionImage.fields.file.details.image.width}
        height={firstSectionImage.fields.file.details.image.height}
        alt={firstSectionImage.fields.title}
        /> */}
        </div>
        <div className={s.text}>
          <Link href="/">
            <a className={s.link}>Read More</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
