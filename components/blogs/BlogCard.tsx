import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import s from './blogcard.module.scss'

export default function BlogCard({ blog }: { blog: any }) {
  const { title, thumbnail, publishedDate, slugs } = blog.fields

  // const slug = title.toLowerCase().split(' ').join('-')
  const date = publishedDate.slice(0, -12).split('-').join(' ')

  // const dateReversed = date.reverse()

  // console.log(dateReversed)
  return (
    <div className={s.blogCard}>
      <Link href={'/blogs/' + slugs}>
        <a>
          <div className={s.thumbnail}>
            <Image
              // layout="responsive"
              src={'https:' + thumbnail.fields.file.url}
              width={thumbnail.fields.file.details.image.width}
              height={thumbnail.fields.file.details.image.height}
            />
            <div className={s.titleWrap}>
              <h4>{title}</h4>
            </div>
          </div>
          <div className={s.info}>
            <p>{date}</p>
          </div>
          <div className={s.link}>
            {/* <Link href={'/blogs/' + slug}></Link> */}
            <p>Read the Blog</p>
            {/* <Link href={'/blogs/' + slug}> */}
          </div>
        </a>
      </Link>
    </div>
  )
}
