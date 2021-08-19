import React, { useState } from 'react'
import Link from 'next/link'
import s from './Navbar.module.scss'
import { useRouter } from 'next/router'

export default function Navbar() {
  const [navState, setNavState] = useState(false)
  const navButton = navState ? s.opened : ' '
  const navMenuBg = navState ? s.navShow : s.navHide
  const navMenuLinks = navState ? s.navShowLinks : s.navHideLinks

  const navigation = [
    { link: '/', text: 'Home', key: 10 },
    { link: '/games', text: 'Games', key: 20 },
    { link: '/brand', text: 'Brand', key: 30 },
    { link: '/search', text: 'Products', key: 40 },
    { link: '/stories', text: 'Stories', key: 50 },
    { link: '/recycle', text: 'Recycle', key: 60 },
    { link: '/blogs', text: 'Blogs', key: 70 },
    { link: '/kidzone', text: 'KidZone', key: 80 },
  ]

  const router = useRouter()
  return (
    <>
      <button
        className={`${s.menu} ${navButton}`}
        onClick={() => setNavState(!navState)}
        aria-label="Main Menu"
      >
        <svg width="30" height="30" viewBox="0 0 100 100">
          <path
            className={`${s.line} ${s.line1}`}
            d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
          />
          <path className={`${s.line} ${s.line2}`} d="M 20,50 H 80" />
          <path
            className={`${s.line} ${s.line3}`}
            d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
          />
        </svg>
      </button>
<div className={s.overflowHidden}>
      <nav
        className={`${s.navMenu} ${navMenuBg}`}
        onClick={() => setNavState(!navState)}
      >
        <ul className={navMenuLinks}>
          {navigation.map((nav) => (
            <Link key={nav.key} href={nav.link}>
              <a
                className={`${router.pathname == nav.link ? s.active : s.link}`}
              >
                {nav.text}
              </a>
            </Link>
          ))}
          <Link href="/">
            <a className={s.donateMob}>Donate</a>
          </Link>
          <button
            className={`${s.menuButton} ${navButton}`}
            onClick={() => setNavState(!navState)}
            aria-label="Main Menu"
          >
            <svg width="30" height="30" viewBox="0 0 100 100">
              <path
                className={`${s.line} ${s.line1}`}
                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
              />
              <path className={`${s.line} ${s.line2}`} d="M 20,50 H 80" />
              <path
                className={`${s.line} ${s.line3}`}
                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
              />
            </svg>
          </button>
        </ul>
      </nav>
      </div>
    </>
  )
}
