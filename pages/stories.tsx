import { Layout } from '@components/common'
import Image from 'next/image'
import Link from 'next/link'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import s from '../assets/pages/page.module.scss'

export async function getStaticProps({}: GetStaticPropsContext) {
  const client = createClient({
    space: `${process.env.CONTENTFUL_SPACE_ID}`,
    accessToken: `${process.env.CONTENTFUL_ACCESS_KEY}`,
  })

  const res = await client.getEntries({ content_type: 'stories' })

  return {
    props: {
      storiesPage: res.items,
    },
    revalidate: 60,
  }
}

export default function Stories(
  { storiesPage }: { products: any; storiesPage: any },
  {}: InferGetStaticPropsType<typeof getStaticProps>
) {
  const {
    heroImage,
    heroText,
    firstSection,
    firstSectionImage,
    secondSection,
    thirdSection,
    ProductImage,
  } = storiesPage[0].fields

  console.log(storiesPage)

  return (
    <>
      <div className={s.pageWrap}>
        <div className={s.heroContainer}>
          <Image
            // blurDataURL="true"
            // placeholder="blur"
            priority={true}
            layout="responsive"
            src={'https:' + heroImage.fields.file.url}
            width={heroImage.fields.file.details.image.width}
            height={heroImage.fields.file.details.image.height}
            alt={heroImage.fields.title}
          />
          <div className={s.heroOverlay}></div>
          <div className={s.heroTextWrap}>
            <h1 id={s.brandHeroText}>{heroText}</h1>
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

        <div id={s.storiesSecondSection} className={s.secondSection}>
          {documentToReactComponents(secondSection)}
        </div>

        <div className={s.thirdSection}>
          {documentToReactComponents(thirdSection)}
          <Image
            src={'https:' + ProductImage.fields.file.url}
            width={ProductImage.fields.file.details.image.width}
            height={ProductImage.fields.file.details.image.height}
            alt={ProductImage.fields.title}
          />
          <Link href="/">
            <a className={s.link}>Donate Clubs</a>
          </Link>
        </div>
      </div>
    </>
  )
}

Stories.Layout = Layout
