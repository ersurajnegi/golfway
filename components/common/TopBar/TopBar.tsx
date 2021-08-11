import s from './TopBar.module.scss'
import Image from 'next/image'
// import { I18nWidget } from '@components/common'

const TopBar = () => (
  <div className={s.topbar}>
    <div className={s.currency}>{/* <I18nWidget /> */}</div>
    <div className={s.linksWrap}>
      <div className={s.login}>
        {/* trade login to be added later */}
        {/* <Link href="/">
          <a className={s.topBarLinks} href="">
            Trade Login
          </a>
        </Link> */}
        {/* <Link href="/">
          <a className={s.topBarLinks} href="">
            Coach Portal
          </a>
        </Link> */}
      </div>

      <div className={s.socialLinks}>
        <a
          href="https://twitter.com/GolfwayOfficial"
          target="_blank"
          rel="noreferrer"
        >
          <Image src="/twitter.svg" height="20" width="20" alt="twitter icon" />
        </a>

        <a
          href="https://www.facebook.com/golfway.official/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/facebook.svg"
            height="20"
            width="20"
            alt="facebook icon"
          />
        </a>

        <a
          href="https://www.instagram.com/golfway_official/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/instagram.svg"
            height="20"
            width="20"
            alt="instagram icon"
          />
        </a>
      </div>
    </div>
  </div>
)

export default TopBar
