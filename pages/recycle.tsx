import commerce from '@lib/api/commerce'
import { ProductCard } from '@components/product'
import { Layout } from '@components/common'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    // variables: { first: 6 },
    config,
    preview,
    ...({ featured: true } as any),
  })

  const { products } = await productsPromise

  console.log(products)

  return {
    props: {
      products,
    },
    revalidate: 60,
  }
}

export default function Recycle(
  { products }: { products: any },
  {}: InferGetStaticPropsType<typeof getStaticProps>
) {
  console.log(products)
  return (
    <div>
      <h1>Recycle</h1>

      {products.map((pro: any) => (
        <h3>{pro.name}</h3>
      ))}

      <p>{products[0].name}</p>

      {/* <ProductCard key={products} product={products} variant="slim" /> */}
    </div>
  )
}

Recycle.Layout = Layout
