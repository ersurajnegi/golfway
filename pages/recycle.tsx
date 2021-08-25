import { useState, useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import commerce from '@lib/api/commerce'

import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { Layout } from '@components/common'
import { NewsLetter } from '@components/common'

import s from '../assets/pages/recycle.module.scss'

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

  const res = await client.getEntries({ content_type: 'recyclePage' })

  return {
    props: {
      products,
      categories,
      brands,
      pages,
      recyclePage: res.items,
      url: process.env.MAILCHIMP_URL,
    },
    revalidate: 60,
  }
}

export default function Recycle(
  { recyclePage }: { recyclePage: any; url: any },
  {}: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { heroImage, heroText, heroSummary, firstSection, firstSectionImage } =
    recyclePage[0].fields

  const [isChecked, setIsChecked] = useState(false)
  const [isChampionChecked, setIsChampionChecked] = useState(false)

  const handleChange = () => {
    setIsChecked(!isChecked)
  }
  const handleChampionChange = () => {
    setIsChampionChecked(!isChampionChecked)
  }

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
          <div className={s.heroOverlay}></div>
        </div>

        <div className={s.firstSection}>
          <div className={s.firstSectionImage}>
            <Image
              src={'https:' + firstSectionImage.fields.file.url}
              width={firstSectionImage.fields.file.details.image.width}
              height={firstSectionImage.fields.file.details.image.height}
              alt={firstSectionImage.fields.title}
            />
          </div>
          <div className={s.textWrap}>
            {documentToReactComponents(firstSection)}
          </div>
        </div>
        <div className={s.findYourClub}>
          <div className={s.title}>
            <h2>FIND YOUR CLUB</h2>
          </div>
          <div className={s.filterWrap}>
            <div className={`${s.filters} ${s.filterBoxes}`}>
              <p>GAME CODE:</p>
              <div className={s.inputWrap}>
                <input
                  type="checkbox"
                  id="play"
                  name="play"
                  value="Play"
                  checked={isChecked}
                  onChange={handleChange}
                />
                <span>Play</span>
              </div>
              <div className={s.inputWrap}>
                <input
                  type="checkbox"
                  id="champion"
                  name="champion"
                  value="Champion"
                  checked={isChampionChecked}
                  onChange={handleChampionChange}
                />
                <span>Champion</span>
              </div>
            </div>
            <div className={`${s.filters} ${s.filterBoxes}`}>
              <p>CLUB TYPE:</p>
              <div className={s.inputWrap}>
                <input type="checkbox" id="iron" name="iron" value="Iron" />
                <span>Iron</span>
              </div>
              <div className={s.inputWrap}>
                <input
                  type="checkbox"
                  id="putter"
                  name="putter"
                  value="Putter"
                />
                <span>Putter</span>
              </div>
              <div className={s.inputWrap}>
                <input
                  type="checkbox"
                  id="driver"
                  name="driver"
                  value="Driver or Wood"
                />
                <span>Driver or Wood</span>
              </div>
            </div>
            <div className={`${s.filters} ${s.filterSizes}`}>
              <p>SIZE:</p>
              {isChampionChecked ? (
                <div className={s.championSizesWrap}>
                  <div className={`${s.sizes} ${s.sizesC} ${s.size110C}`}>
                    <span>110</span>
                  </div>
                  <div className={`${s.sizes} ${s.sizesC} ${s.size120C}`}>
                    <span>120</span>
                  </div>
                  <div className={`${s.sizes} ${s.sizesC} ${s.size130C}`}>
                    <span>130</span>
                  </div>
                  <div className={`${s.sizes} ${s.sizesC} ${s.size140C}`}>
                    <span>140</span>
                  </div>
                  <div className={`${s.sizes} ${s.sizesC} ${s.size150C}`}>
                    <span>150</span>
                  </div>
                  <div className={`${s.sizes} ${s.sizesC} ${s.size160C}`}>
                    <span>160</span>
                  </div>
                  <div className={`${s.sizes} ${s.sizesC} ${s.size170C}`}>
                    <span>170</span>
                  </div>
                </div>
              ) : (
                <div className={s.playSizesWrap}>
                  <div className={`${s.sizes} ${s.size90}`}>
                    <span>90</span>
                  </div>
                  <div className={`${s.sizes} ${s.size110}`}>
                    <span>110</span>
                  </div>
                  <div className={`${s.sizes} ${s.size130}`}>
                    <span>130</span>
                  </div>
                  <div className={`${s.sizes} ${s.size150}`}>
                    <span>150</span>
                  </div>
                  <div className={`${s.sizes} ${s.size170}`}>
                    <span>170</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Recycle.Layout = Layout
