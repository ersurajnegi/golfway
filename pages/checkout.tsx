import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import Image from 'next/image'
import Link from 'next/link'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import s from '../assets/pages/checkout.module.scss'

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

// const checkout = embedCheckout({
//   containerId: 'foo-bar-checkout',
//   url: 'https://masters-golf-company-store-2.mybigcommerce.com/cart.php?embedded=1&action=loadInCheckout&id=1cb89bf4-1f4b-47ad-b4c8-d4776cfcca61&token=fd94dcf5cee9067a069ed45af168397aa16e58ccb74b26e16966058d0995a22e',
// })

export default function Checkout(
  { home, products }: { products: any; home: any },
  {}: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { heroImage, heroText, firstSection } = home[0].fields

  return (
    <div className={s.pageWrap}>
      <div className={s.checkout}>
        <h1>Temporary Checkout</h1>
        <div id="foo-bar-checkout"></div>
      </div>
    </div>
  )
}

Checkout.Layout = Layout
