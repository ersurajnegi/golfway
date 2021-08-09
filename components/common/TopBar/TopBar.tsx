import s from './TopBar.module.scss'
import Link from 'next/link'
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
        <a href="" target="_blank" rel="noopener">
          <img src="/twitter.svg" height="20" width="20" alt="twitter icon" />
        </a>

        <a href="" target="_blank" rel="noopener">
          <img src="/facebook.svg" height="20" width="20" alt="facebook icon" />
        </a>

        <a href="" target="_blank" rel="noopener">
          <img
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
