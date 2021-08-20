import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { StoryCard } from '@components/stories'
import s from '../components/stories/StoryCard.module.scss'
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

export default function Story({ story }: { story: any }) {
  return (
    <div className={s.storyCardWrap}>
      {story.map((story: any) => (
        <StoryCard key={story.sys.id} story={story} />
      ))}
    </div>
  )
}
