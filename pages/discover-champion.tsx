import { useState, useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import commerce from '@lib/api/commerce'

import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { Layout } from '@components/common'
import { NewsLetter } from '@components/common'

import s from '../assets/pages/discover.module.scss'

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

  console.log(process.env)

  const res = await client.getEntries({ content_type: 'discoverPage' })

  return {
    props: {
      products,
      categories,
      brands,
      pages,
      discoverPage: res.items,
      url: process.env.MAILCHIMP_URL,
    },
    revalidate: 60,
  }
}

export default function Champion(
  { discoverPage, url }: { discoverPage: any; url: any },
  {}: InferGetStaticPropsType<typeof getStaticProps>
) {
  const {
    heroImage,
    heroText,
    heroSummary,
    firstSection,
    firstSectionImage,
    secondSection,
    thirdSection,
    ProductImage,
    heroImageBottom,
    heroTextBottom,
  } = discoverPage[1].fields

  return (
    <>
      <div className={s.pageWrap}>
        <div className={s.heroContainer}>
          <div className={s.heroTextWrap}>
            <h1>{heroText}</h1>
            {documentToReactComponents(heroSummary)}
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
        </div>

        <div className={s.firstSection}>
          <div className={s.firstSectionImage}>
            {' '}
            <Image
              src={'https:' + firstSectionImage.fields.file.url}
              width={firstSectionImage.fields.file.details.image.width}
              height={firstSectionImage.fields.file.details.image.height}
              alt={firstSectionImage.fields.title}
            />
          </div>
          <div className={s.textWrap}>
            {documentToReactComponents(firstSection)}
            <div className={s.sizesWrap}>
              <div className={`${s.sizes} ${s.size110C}`}>
                <span>110</span>
              </div>
              <div className={`${s.sizes} ${s.size120C}`}>
                <span>120</span>
              </div>
              <div className={`${s.sizes} ${s.size130C}`}>
                <span>130</span>
              </div>
              <div className={`${s.sizes} ${s.size140C}`}>
                <span>140</span>
              </div>
              <div className={`${s.sizes} ${s.size150C}`}>
                <span>150</span>
              </div>
              <div className={`${s.sizes} ${s.size160C}`}>
                <span>160</span>
              </div>
              <div className={`${s.sizes} ${s.size170C}`}>
                <span>170</span>
              </div>
            </div>
          </div>
        </div>
        <div className={s.secondSection}>
          {documentToReactComponents(secondSection)}
        </div>
        <div className={s.thirdSection}>
          <Image
            src={'https:' + ProductImage.fields.file.url}
            width={ProductImage.fields.file.details.image.width}
            height={ProductImage.fields.file.details.image.height}
            alt={ProductImage.fields.title}
          />
          {documentToReactComponents(thirdSection)}
        </div>
        <div className={s.heroContainerBottom}>
          <div className={s.heroImage}>
            <Image
              priority={true}
              layout="responsive"
              src={'https:' + heroImageBottom.fields.file.url}
              width={heroImageBottom.fields.file.details.image.width}
              height={heroImageBottom.fields.file.details.image.height}
              alt={heroImageBottom.fields.title}
            />
          </div>

          <div className={s.heroOverlay}></div>
          <div className={s.heroTextWrap}>
            <h1>{heroTextBottom}</h1>
          </div>
        </div>

        <NewsLetter url={url} />
      </div>
    </>
  )
}

Champion.Layout = Layout
