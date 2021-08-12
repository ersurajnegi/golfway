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
              <a>
                <span>
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
        <div className={s.footerElementsWrap}>
          <div className={s.footerElements}>
            <h2>Products</h2>
            <Link href="/">
              <a>Play</a>
            </Link>
            <Link href="/">
              <a>Champion</a>
            </Link>
          </div>
          <div className={s.footerElements}>
            <h2>Information</h2>
            <Link href="/">
              <a>Shipping &amp; Returns</a>
            </Link>
            <Link href="/">
              <a>Contact Us</a>
            </Link>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
            <Link href="/">
              <a>Privacy Policy</a>
            </Link>
            <Link href="/">
              <a>Sitemap</a>
            </Link>
          </div>
          <div className={s.footerElements}>
            <h2>Quick Links</h2>
            <Link href="/games">
              <a>Games</a>
            </Link>
            <Link href="/brand">
              <a>Brand</a>
            </Link>
            <Link href="/">
              <a>Stories</a>
            </Link>
            <Link href="/">
              <a>Academy</a>
            </Link>
            <Link href="/">
              <a>Kid Zone</a>
            </Link>
          </div>
          <div className={s.footerElements}>
            <h2>Connect</h2>
            <div className={s.socialWrap}>
              <a
                href="https://twitter.com/GolfwayOfficial"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/twitter.svg"
                  height="20"
                  width="20"
                  alt="twitter icon"
                />
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
      </div>
      <div className={s.bottomBanner}>
        <div className={s.cardsAccepted}>
          <div className={s.paymentsWrap}>
            <Image
              src="/payment-gateways.png"
              width={728}
              height={46}
              layout="responsive"
              alt="payment gateways logo's"
            />
          </div>
        </div>

        <div className={s.copyrite}>
          <span>&copy; Copywrite Golfway {year}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
