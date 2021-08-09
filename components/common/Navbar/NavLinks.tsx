import React from 'react'
import Link from 'next/link'
import s from './Navbar.module.scss'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  return (
    <>
      <nav className={s.navMenu}>
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
        <Link href="/">
          <a className={`${router.pathname == '/' ? s.active : s.link}`}>
            Stories
          </a>
        </Link>
        <Link href="/">
          <a className={`${router.pathname == '/' ? s.active : s.link}`}>
            Academy
          </a>
        </Link>
        <Link href="/">
          <a className={`${router.pathname == '/' ? s.active : s.link}`}>
            Tournament
          </a>
        </Link>
        <Link href="/blogs">
          <a className={`${router.pathname == '/blogs' ? s.active : s.link}`}>
            Blogs
          </a>
        </Link>
        <Link href="/">
          <a className={`${router.pathname == '/' ? s.active : s.link}`}>
            KidZone
          </a>
        </Link>
        {/* {links?.map((l) => (
          <Link href={l.href} key={l.href}>
            <a className={s.link}>{l.label}</a>
          </Link>
        ))} */}
      </nav>
    </>
  )
}
