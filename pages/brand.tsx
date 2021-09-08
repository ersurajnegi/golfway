import { Layout } from '@components/common'
import Image from 'next/image'
import Link from 'next/link'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import s from '../assets/pages/brand.module.scss'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }

  const client = createClient({
    space: `${process.env.CONTENTFUL_SPACE_ID}`,
    accessToken: `${process.env.CONTENTFUL_ACCESS_KEY}`,
  })

  const res = await client.getEntries({ content_type: 'brand' })

  return {
    props: {
      brandPage: res.items,
    },
    revalidate: 60,
  }
}

export default function Brand(
  { brandPage }: { products: any; brandPage: any },
  {}: InferGetStaticPropsType<typeof getStaticProps>
) {
  const {
    heroImage,
    heroText,
    firstSection,
    firstSectionImage,
    secondSection,
    secondSectionBackground,
    thirdSection,
    ProductImage,
    fourthSection,
    worldWidePartners,
  } = brandPage[0].fields

  console.log(brandPage)

  return (
    <>
      <div className={s.brandPageWrap}>
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
            <h1>{heroText}</h1>
          </div>
        </div>
        <div className={s.firstSectionWrap}>
          <div className={s.firstSection}>
            {documentToReactComponents(firstSection)}
            <Link href="/games">
              <a className={s.link}>Start Now</a>
            </Link>
          </div>
          <div className={s.firstSectionImage}>
            <div className={s.imageWrap}>
              <Image
                layout="responsive"
                src={'https:' + firstSectionImage.fields.file.url}
                width={firstSectionImage.fields.file.details.image.width}
                height={firstSectionImage.fields.file.details.image.height}
                alt={firstSectionImage.fields.title}
              />
            </div>
          </div>
        </div>

        <div className={s.secondSection}>
          <div id={s.brandSecondSectionBackground}>
            <Image
              layout="responsive"
              src={'https:' + secondSectionBackground.fields.file.url}
              width={secondSectionBackground.fields.file.details.image.width}
              height={secondSectionBackground.fields.file.details.image.height}
              alt={secondSectionBackground.fields.title}
            />
          </div>
          <div id={s.brandSecondSectionText}>
            {documentToReactComponents(secondSection)}
            <Link href="/brand">
              <a className={s.link}>Discover</a>
            </Link>
          </div>
        </div>

        <div id={s.brandThirdSection} className={s.thirdSection}>
          {documentToReactComponents(thirdSection)}
          <Image
            src={'https:' + ProductImage.fields.file.url}
            width={ProductImage.fields.file.details.image.width}
            height={ProductImage.fields.file.details.image.height}
            alt={ProductImage.fields.title}
          />
        </div>
        <div id={s.brandFourthSection} className={s.fourthSection}>
          {documentToReactComponents(fourthSection)}
          <div className={s.logoWrap}>
            {worldWidePartners.map((logo: any) => (
              <div key={logo.sys.id} className={s.logo}>
                <Image
                  layout="responsive"
                  src={'https:' + logo.fields.file.url}
                  width={logo.fields.file.details.image.width}
                  height={logo.fields.file.details.image.height}
                  alt={logo.fields.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

Brand.Layout = Layout
