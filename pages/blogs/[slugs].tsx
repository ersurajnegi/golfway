import React from 'react'
import Image from 'next/image'
import s from './../../assets/pages/blogs.module.scss'
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
    content_type: 'blogs',
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
    content_type: 'blogs',
    'fields.slugs': params.slugs,
  })
  return {
    props: { blogs: items[0] },
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

export default function Blog({ blogs }: { blogs: any }) {
  const { thumbnail, title, body } = blogs.fields
  const heading = title.toUpperCase()

  return (
    <div className={s.blog}>
      <div className={s.blogHero}>
        <Image
          src={'https:' + thumbnail.fields.file.url}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
          alt={title}
        />
      </div>
      <div className={s.textWrap}>
        <h1>{heading}</h1>
        {documentToReactComponents(body, option)}
      </div>
    </div>
  )
}

Blog.Layout = Layout
