import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import Image from 'next/image'
import Link from 'next/link'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import s from '../assets/pages/page.module.scss'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  const client = createClient({
    space: `${process.env.CONTENTFUL_SPACE_ID}`,
    accessToken: `${process.env.CONTENTFUL_ACCESS_KEY}`,
  })

  const res = await client.getEntries({ content_type: 'games' })

  return {
    props: {
      products,
      categories,
      brands,
      pages,
      home: res.items,
    },
    revalidate: 60,
  }
}

export default function Games(
  { home, products }: { products: any; home: any },
  {}: InferGetStaticPropsType<typeof getStaticProps>
) {
  const {
    heroImage,
    heroText,
    firstSection,
    secondSection,
    secondSectionBackground,
    thirdSection,
    ProductImage,
    fourthSection,
    fifthSection,
  } = home[0].fields

  return (
    <>
      <div className={s.pageWrap}>
        <div className={s.heroContainer}>
          <Image
            priority={true}
            layout="responsive"
            src={'https:' + heroImage.fields.file.url}
            width={heroImage.fields.file.details.image.width}
            height={heroImage.fields.file.details.image.height}
            alt={heroImage.fields.title}
          />
          <div className={s.heroOverlay}></div>
          <div className={s.heroTextWrap}>
            <h1 id={s.gamesHeroText}>{heroText}</h1>
          </div>
        </div>
        <div className={s.firstSection}>
          {documentToReactComponents(firstSection)}
          <Link href="">
            <a className={s.link}>Start Now</a>
          </Link>
        </div>
      </div>
    </>
  )
}

Games.Layout = Layout
