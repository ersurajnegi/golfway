import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { createClient } from 'contentful'
import s from '../assets/pages/checkout.module.scss'
import { useEffect } from 'react'

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

export default function Checkout(
  { home, products }: { products: any; home: any },
  {}: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { heroImage, heroText, firstSection } = home[0].fields

  useEffect(() => {
    const testCheckout = async () => {
      const module = await (window as any).checkoutKitLoader.load(
        'checkout-sdk'
      )
      const url =
        (window as any).checkoutUrl ||
        'https://masters-golf-company-store-2.mybigcommerce.com/cart.php?embedded=1&action=loadInCheckout&id=8a8f2fdc-d673-4694-96a0-1abf6b8d1cb6&token=533fed504d932f42d9303dc4cdab499dd84a0286ad6f76f40ef3dee9c6a16a07'
      const service = module.embedCheckout({
        containerId: 'golfway-checkout',
        url,
      })
    }
    testCheckout()
  }, [])
  return (
    <div className={s.pageWrap}>
      <div className={s.checkout}>
        <h1>Temporary Checkout</h1>
      </div>
      <div id="golfway-checkout"></div>
    </div>
  )
}

Checkout.Layout = Layout
