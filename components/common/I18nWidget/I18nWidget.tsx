import Link from 'next/link'
import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import s from './I18nWidget.module.scss'
import { Cross, ChevronUp } from '@components/icons'
import ClickOutside from '@lib/click-outside'
interface LOCALE_DATA {
  name: string
  img: {
    filename: string
    alt: string
  }
}

const LOCALES_MAP: Record<string, LOCALE_DATA> = {
  es: {
    name: 'Español',
    img: {
      filename: 'es.svg',
      alt: 'Bandera Colombiana',
    },
  },
  'en-GB': {
    name: 'English',
    img: {
      filename: 'gb.svg',
      alt: 'US Flag',
    },
  },
}

const I18nWidget: FC = () => {
  const [display, setDisplay] = useState(false)
  const [chev, setChev] = useState(false)
  const chevButton = display ? s.chev : s.chevOpen
  const {
    locale,
    locales,
    defaultLocale = 'en-GB',
    asPath: currentPath,
  } = useRouter()

  const handleClick = () => {
    setChev(!chev)
  }

  const options = locales?.filter((val) => val !== locale)
  const currentLocale = locale || defaultLocale

  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <nav className={s.root}>
        <div className={s.buttonWrap} onClick={() => setDisplay(!display)}>
          <button className={s.button} aria-label="Language selector">
            <img
              width="30"
              height="30"
              className=""
              src={`/${LOCALES_MAP[currentLocale].img.filename}`}
              alt={LOCALES_MAP[currentLocale].img.alt}
            />
            {options && (
              <span className={s.chevWrap}>
                <ChevronUp onClick={handleClick} className={chevButton} />
              </span>
            )}
          </button>
        </div>
        <div className={s.dropDownWrap}>
          {options?.length && display ? (
            <div className={s.dropDownMenu}>
              <div className="">
                <button
                  onClick={() => setDisplay(false)}
                  aria-label="Close panel"
                  className={s.closeButton}
                >
                  {/* <Cross className="" /> */}
                </button>
              </div>
              <ul>
                {options.map((locale) => (
                  <li key={locale}>
                    <Link href={currentPath} locale={locale}>
                      <a className={s.item} onClick={() => setDisplay(false)}>
                        {LOCALES_MAP[locale].name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </nav>
    </ClickOutside>
  )
}

export default I18nWidget
