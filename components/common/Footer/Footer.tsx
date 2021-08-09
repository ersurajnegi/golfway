import Link from 'next/link'
import { LogoWhite } from '@components/ui'
import s from './Footer.module.scss'
import Image from 'next/image'

const Footer = () => {
  const date = new Date()
  let year = date.getFullYear()
  return (
    <footer className={s.footer}>
      <div className={s.topBanner}>
        <div className={s.logoContact}>
          <div className={s.logoFooter}>
            <Link href="/">
              <a className="flex flex-initial items-center font-bold md:mr-24">
                <span className="rounded-full border border-accent-6 mr-2">
                  <LogoWhite />
                </span>
              </a>
            </Link>
          </div>
          <div className={s.contactDetails}>
            <p>Serbert Road</p>
            <p>Gordano Gate</p>
            <p>Portishead</p>
            <p>BS20 7GG</p>
            <p>United Kingdom</p>
          </div>
        </div>
        <div className={s.footerElements}>
          <h2>Products</h2>
          <Link href="/">
            <a>Test Links</a>
          </Link>
          <Link href="/">
            <a>Test Links</a>
          </Link>
        </div>
        <div className={s.footerElements}>
          <h2>Information</h2>
          <Link href="/">
            <a>Test Links</a>
          </Link>
          <Link href="/">
            <a>Test Links</a>
          </Link>
          <Link href="/">
            <a>Test Links</a>
          </Link>
          <Link href="/">
            <a>Test Links</a>
          </Link>
        </div>
        <div className={s.footerElements}>
          <h2>Quick Links</h2>
          <Link href="/">
            <a>Test Links</a>
          </Link>
          <Link href="/">
            <a>Test Links</a>
          </Link>
          <Link href="/">
            <a>Test Links</a>
          </Link>
          <Link href="/">
            <a>Test Links</a>
          </Link>
          <Link href="/">
            <a>Test Links</a>
          </Link>
        </div>
        <div className={s.footerElements}>
          <h2>Connect</h2>
          <div className={s.socialWrap}>
            <Link href="/">
              <a>Test Links</a>
            </Link>
            <Link href="/">
              <a>Test Links</a>
            </Link>
            <Link href="/">
              <a>Test Links</a>
            </Link>
          </div>
        </div>
      </div>
      <div className={s.bottomBanner}>
        <div className={s.cardsAccepted}>
          <div className={s.logos}>Cards</div>
          <div className={s.logos}>Cards</div>
          <div className={s.logos}>Cards</div>
          <div className={s.logos}>Cards</div>
          <div className={s.logos}>Cards</div>
          <div className={s.logos}>Cards</div>
          <div className={s.logos}>Cards</div>
          <div className={s.logos}>Cards</div>
          <div className={s.logos}>Cards</div>
        </div>

        <div className={s.copyrite}>
          <span>&copy; {year} Golfway, Inc. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
