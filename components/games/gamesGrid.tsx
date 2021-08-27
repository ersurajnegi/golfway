import { createClient } from 'contentful'
import { Layout } from '@components/common'
import s from '../assets/pages/blogs.module.scss'

export async function getStaticProps() {
  const client = createClient({
    space: `${process.env.CONTENTFUL_SPACE_ID}`,
    accessToken: `${process.env.CONTENTFUL_ACCESS_KEY}`,
  })

  const res = await client.getEntries({ content_type: 'game' })

  return {
    props: {
      game: res.items,
    },
  }
}

export default function GamesGrid({ game }: { game: any }) {
  console.log(game)
  return (
    <div className={s.game}>
      <div className={s.gameWelcome}>
        <h1>The Golfway Blog</h1>
        <h2>
          Here you will find all the latest news about Golfway activities and
          products. You'll also find helpful artciles about fitness, nutrition
          and all things golf related.
        </h2>
      </div>

      <div className={s.gameGridWrap}>
        {/* {blogs.map((blog: any) => (
          // <BlogCard key={blog.sys.id} blog={blog} />
        ))} */}
      </div>
    </div>
  )
}

GamesGrid.Layout = Layout
