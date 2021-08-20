import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import s from './StoryCard.module.scss'

import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function StoryCard({ story }: { story: any }) {
  const { title, thumbnail, publishedDate, slugs } = story.fields
  return (
    <div className={s.storyCard}>
      <div className={s.thumbnail}>
        <Image
          key={thumbnail.sys.id}
          src={'https:' + thumbnail.fields.file.url}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
          alt={thumbnail.fields.title}
        />
        <div className={s.overlay}></div>
      </div>
      <div className={s.infoWrap}>
        <div className={s.titeInfoWrap}>
          <div className={s.titleWrap}>
            <h4>{title}</h4>
          </div>
          <div className={s.info}>{/* <p>{date}</p> */}</div>
        </div>
        <Link href={'/stories/' + slugs}>
          <a>
            <p>Read the Blog</p>
          </a>
        </Link>
      </div>
    </div>
  )
}
