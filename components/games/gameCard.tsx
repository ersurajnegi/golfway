import s from './gameCard.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function GameCard({ g }: { g: any }) {
  const { heroText, thumbnail, slugs } = g.fields

  const title = heroText.toUpperCase()

  // Map all the games into a resonsive grid
  // Create a filter that removes unselected games
  // the filter should have the following boxes
  //

  return (
    <div className={s.gameCard}>
      <Link href={'/games/' + slugs}>
        <a>
          <div className={s.imageWrap}>
            <Image
              layout="responsive"
              src={'https:' + thumbnail.fields.file.url}
              width={thumbnail.fields.file.details.image.width}
              height={thumbnail.fields.file.details.image.height}
              alt={thumbnail.fields.title}
            />
          </div>
          <div className={s.titleWrap}>
            <h3>{title}</h3>
          </div>
        </a>
      </Link>
    </div>
  )
}
