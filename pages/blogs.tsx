import { createClient } from 'contentful'
import { Layout } from '@components/common'
import { BlogCard } from '@components/blogs'
import s from '../assets/pages/blogs.module.scss'

export async function getStaticProps() {
  const client = createClient({
    space: `${process.env.CONTENTFUL_SPACE_ID}`,
    accessToken: `${process.env.CONTENTFUL_ACCESS_KEY}`,
  })

  const res = await client.getEntries({ content_type: 'blogs' })

  return {
    props: {
      blogs: res.items,
    },
  }
}

export default function Blogs({ blogs }: { blogs: any }) {
  // console.log(blogs)
  return (
    <div className={s.blogs}>
      <div className={s.blogsWelcome}>
        <h1>The Golfway Blog</h1>
        <h2>
          Here you will find all the latest news about Golfway activities and
          products. You'll also find helpful artciles about fitness, nutrition
          and all things golf related.
        </h2>
      </div>

      <div className={s.blogsCardWrap}>
        {blogs.map((blog: any) => (
          <BlogCard key={blog.sys.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

Blogs.Layout = Layout
