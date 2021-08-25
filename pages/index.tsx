import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import Image from 'next/image'
import Link from 'next/link'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { NewsLetter } from '@components/common'
import s from '../assets/pages/page.module.scss'
import { useState, useEffect } from 'react'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 20 },
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

  const res = await client.getEntries({ content_type: 'home' })

  return {
    props: {
      products,
      categories,
      brands,
      pages,
      homePage: res.items,
      url: process.env.MAILCHIMP_URL,
    },
    revalidate: 60,
  }
}

export default function Home(
  {
    homePage,
    products,
    url,
  }: { products: any; homePage: any; categories: string; url: any },
  {}: InferGetStaticPropsType<typeof getStaticProps>
) {
  const {
    heroImage,
    heroText,
    firstSection,
    heroTwo,
    secondSection,
    secondSectionBackground,
    thirdSection,
    ProductImage,
    fourthSection,
  } = homePage[0].fields

  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    let width = window.innerWidth || screen.width
    setMobile(width >= 620 ? false : true)
  }, [])

  // console.log('home page chcecking products: ', products)

  return (
    <>
      <div className={s.pageWrap}>
        <div className={s.heroContainer}>
          <div className={s.videoWrap}>
            {!mobile ? (
              <video
                className={s.video}
                autoPlay
                loop
                preload="none"
                muted
                src="video.mp4"
              ></video>
            ) : (
              ''
            )}
          </div>
          <div className={s.heroImage}>
            <Image
              priority={true}
              layout="responsive"
              src={'https:' + heroImage.fields.file.url}
              width={heroImage.fields.file.details.image.width}
              height={heroImage.fields.file.details.image.height}
              alt={heroImage.fields.title}
            />
          </div>

          <div className={s.heroOverlay}></div>
          <div className={s.heroTextWrap}>
            <h1 id={s.homeHeroText}>{heroText}</h1>
          </div>
        </div>
        <div className={s.firstSection}>
          {documentToReactComponents(firstSection)}
          <Link href="/games">
            <a className={s.link}>Start Now!</a>
          </Link>
        </div>
        <div className={s.heroTwo}>
          <Image
            layout="responsive"
            src={'https:' + heroTwo.fields.file.url}
            width={heroTwo.fields.file.details.image.width}
            height={heroTwo.fields.file.details.image.height}
            alt={heroTwo.fields.title}
          />
        </div>
        <div className={s.secondSection}>
          <div className={s.secondSectionBackground}>
            <Image
              layout="responsive"
              src={'https:' + secondSectionBackground.fields.file.url}
              width={secondSectionBackground.fields.file.details.image.width}
              height={secondSectionBackground.fields.file.details.image.height}
              alt={secondSectionBackground.fields.title}
            />
          </div>
          <div className={s.secondSectionText}>
            {documentToReactComponents(secondSection)}
            <Link href="/brand">
              <a className={s.link}>Discover</a>
            </Link>
          </div>
        </div>

        <div className={s.thirdSection}>
          {documentToReactComponents(thirdSection)}
          <Image
            src={'https:' + ProductImage.fields.file.url}
            width={ProductImage.fields.file.details.image.width}
            height={ProductImage.fields.file.details.image.height}
            alt={ProductImage.fields.title}
          />
        </div>

        <div className={s.testSection}>
          {/* {products.map(() => (

          ))} */}
        </div>
        <div className={s.fourthSection}>
          {documentToReactComponents(fourthSection)}
          <Marquee>
            {products.map((product: any, i: number) => (
              <ProductCard key={product.id} product={product} variant="slim" />
            ))}
          </Marquee>
        </div>

        <NewsLetter url={url} />
      </div>
    </>
  )
}

Home.Layout = Layout
