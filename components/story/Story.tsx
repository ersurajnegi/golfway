import React, { FC } from 'react'
import StoryCard from './StoryCard'
import s from './StoryCard.module.scss'
import { createClient } from 'contentful'

export async function getStaticProps() {
  const client = createClient({
    space: `${process.env.CONTENTFUL_SPACE_ID}`,
    accessToken: `${process.env.CONTENTFUL_ACCESS_KEY}`,
  })
  const res = await client.getEntries({ content_type: 'stories' })

  return {
    props: {
      storiesPage: res.items,
    },
    revalidate: 60,
  }

  // const res = await client.getEntries({ content_type: 'story' })

  // return {
  //   props: {
  //     story: res.items,
  //   },
  //   revalidate: 60,
  // }
}

type StoryProps = {
  storiesPage: any
}

const Story: FC<StoryProps> = ({ storiesPage }) => {
  console.log(storiesPage)
  return (
    <div className={s.storyCardWrap}>
      {/* {story.map((story: any) => (
        <StoryCard key={story.sys.id} story={story} />
      ))} */}
    </div>
  )
}

export default Story
