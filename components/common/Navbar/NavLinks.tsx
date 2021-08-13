import React, { useState } from 'react'
import Link from 'next/link'
import s from './Navbar.module.scss'
import { useRouter } from 'next/router'

export default function Navbar() {
  const [navState, setNavState] = useState(false)
  const navButton = navState ? s.opened : ' '
  const navMenu = navState ? s.navShow : s.navHide

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
      <nav className={`${s.navMenu} ${navMenu}`}>
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
        <Link href="/">
          <a className={`${router.pathname == '/' ? s.active : s.link}`}>
            Home
          </a>
        </Link>
        <Link href="/games">
          <a className={`${router.pathname == '/games' ? s.active : s.link}`}>
            Games
          </a>
        </Link>
        <Link href="/brand">
          <a className={`${router.pathname == '/brand' ? s.active : s.link}`}>
            Brand
          </a>
        </Link>
        <Link href="/search">
          <a className={`${router.pathname == '/search' ? s.active : s.link}`}>
            Products
          </a>
        </Link>
        <Link href="/stories">
          <a className={`${router.pathname == '/stories' ? s.active : s.link}`}>
            Stories
          </a>
        </Link>
        {/* <Link href="/">
          <a className={`${router.pathname == '/' ? s.active : s.link}`}>
            Academy
          </a>
        </Link> */}
        {/* <Link href="/">
          <a className={`${router.pathname == '/' ? s.active : s.link}`}>
            Tournament
          </a>
        </Link> */}
        <Link href="/recycle">
          <a className={`${router.pathname == '/recycle' ? s.active : s.link}`}>
            Recycle
          </a>
        </Link>
        <Link href="/blogs">
          <a className={`${router.pathname == '/blogs' ? s.active : s.link}`}>
            Blogs
          </a>
        </Link>
        <Link href="/">
          <a className={`${router.pathname == '/kidzone' ? s.active : s.link}`}>
            KidZone
          </a>
        </Link>
        <li className={s.donate}>
          <a href="/">Donate</a>
        </li>
        {/* {links?.map((l) => (
          <Link href={l.href} key={l.href}>
            <a className={s.link}>{l.label}</a>
          </Link>
        ))} */}
      </nav>
    </>
  )
}
