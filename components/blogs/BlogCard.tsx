import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import s from './blogcard.module.scss'

export default function BlogCard({ blog }: { blog: any }) {
  const { title, thumbnail, publishedDate, slugs } = blog.fields
  const date = publishedDate.slice(0, -12).split('-').join(' ')

  return (
    <div className={s.blogCard}>
      <Link href={'/blogs/' + slugs}>
        <a>
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
          <div className={s.titleWrap}>
            <h4>{title}</h4>
          </div>
          <div className={s.info}>
            <p>{date}</p>
          </div>
          <div className={s.link}>
            <p>Read the Blog</p>
          </div>
        </a>
      </Link>
    </div>
  )
}
