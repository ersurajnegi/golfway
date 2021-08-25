import cn from 'classnames'
import s from '../assets/pages/products.module.scss'
import type { SearchPropsType } from '@lib/search-props'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { createClient } from 'contentful'
import { Layout, NewsLetter } from '@components/common'
import { ProductCard } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Container, Skeleton } from '@components/ui'
import useSearch from '@framework/product/use-search'

import getSlug from '@lib/get-slug'
import rangeMap from '@lib/range-map'

const SORT = {
  'trending-desc': 'Trending',
  'latest-desc': 'Latest arrivals',
  'price-asc': 'Low to high',
  'price-desc': 'High to low',
}

import {
  filterQuery,
  getCategoryPath,
  getDesignerPath,
  useSearchMeta,
} from '@lib/search'
import products from 'pages/api/catalog/products'

export default function Search({ categories, brands }: SearchPropsType) {
  const [activeFilter, setActiveFilter] = useState('')
  const [toggleFilter, setToggleFilter] = useState(false)

  const router = useRouter()
  const { asPath, locale } = router
  const { q, sort } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const query = filterQuery({ sort })

  const { pathname, category, brand } = useSearchMeta(asPath)
  const activeCategory = categories.find((cat: any) => cat.slug === category)
  const activeBrand = brands.find(
    (b: any) => getSlug(b.node.path) === `brands/${brand}`
  )?.node

  const { data } = useSearch({
    search: typeof q === 'string' ? q : '',
    categoryId: activeCategory?.id,
    brandId: (activeBrand as any)?.entityId,
    sort: typeof sort === 'string' ? sort : '',
    locale,
  })

  const handleClick = (event: any, filter: string) => {
    // console.log(
    //   `Filter value ${filter} : , activeFilter : ${activeFilter}, activeCategory: ${JSON.stringify(
    //     activeCategory
    //   )}`
    // )
    if (filter !== activeFilter) {
      setToggleFilter(true)
    } else {
      setToggleFilter(!toggleFilter)
    }
    setActiveFilter(filter)
  }

  // console.log('checking categories', categories)

  const getBannerBasedOnActiveCategory = () => {
    if (activeCategory && activeCategory.id == '26') {
      return (
        <div className={s.heroContainer}>
          <div className={s.banner}>
            <div className={s.textWrap}>
              <h2>CHAMPION</h2>
              <p>
                We haven’t just revised junior golf, we’ve re-examined, resized,
                and redesigned it. Oh, and it’s for adults too.
              </p>
              <Link href="/discover-champion">
                <a className={s.link}>Discover</a>
              </Link>
            </div>
            <div className={s.polygon}></div>
          </div>
        </div>
      )
    } else if (activeCategory && activeCategory.id == '27') {
      return (
        <div className={s.heroContainer}>
          <div className={s.banner}>
            <div className={s.textWrap}>
              <h2>PLAY</h2>
              <p>
                Golfway Play is a fast-paced exciting game based on traditional
                golf and perfect for learning and enjoying the game.
              </p>
              <Link href="/discover-play">
                <a className={s.link}>Discover</a>
              </Link>
            </div>
            <div className={s.polygon}></div>
          </div>
        </div>
      )
    } else {
      return (
        <>
          <div className={s.heroContainer}>
            <div className={s.titleDiv}>
              <h1>All Products</h1>
            </div>
            <div className={s.productsHero}>
              <Link
                href={{
                  pathname: getCategoryPath(categories[0].path, brand),
                  query,
                }}
              >
                <a onClick={(e) => handleClick(e, 'categories')}>
                  <div className={s.banners}>
                    <div className={s.textWrap}>
                      <h2>CHAMPION</h2>
                      <p>
                        We haven’t just revised junior golf, we’ve re-examined,
                        resized, and redesigned it. Oh, and it’s for adults too.
                      </p>
                    </div>
                    <div className={s.imageWrap}>
                      <div className={s.polygon}></div>
                      <div className={s.image}>
                        <Image
                          layout="responsive"
                          src="/Driver.png"
                          width={100}
                          height={100}
                          alt="Golway Champion Driver"
                        />
                      </div>
                    </div>
                  </div>
                </a>
              </Link>

              <Link
                href={{
                  pathname: getCategoryPath(categories[1].path, brand),
                  query,
                }}
              >
                <a onClick={(e) => handleClick(e, 'categories')}>
                  <div className={s.banners}>
                    <div className={s.textWrap}>
                      <h2>PLAY</h2>
                      <p>
                        Golfway Play is a fast-paced exciting game based on
                        traditional golf and perfect for learning and enjoying
                        the game.
                      </p>
                    </div>
                    <div className={s.imageWrap}>
                      <div className={s.polygon}></div>
                      <div className={`${s.image} ${s.imagePlay}`}>
                        <Image
                          layout="responsive"
                          src="/Putter.png"
                          width={100}
                          height={100}
                          alt="Golway Champion Driver"
                        />
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <Container>
      <div className={s.searchWrap}>
        {getBannerBasedOnActiveCategory()}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-3 mb-20">
          <div className="col-span-8 lg:col-span-2 order-1 lg:order-none">
            {/* Categories */}
            <div className="relative inline-block w-full">
              <div className="lg:hidden">
                <span className="rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={(e) => handleClick(e, 'categories')}
                    className={s.category}
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    {activeCategory?.name
                      ? `Category: ${activeCategory?.name}`
                      : 'All Categories'}
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              </div>
              <div
                className={`${
                  s.dropDown
                } origin-top-left absolute lg:relative left-0 mt-2 w-full rounded-md shadow-lg lg:shadow-none z-10 mb-10 lg:block ${
                  activeFilter !== 'categories' || toggleFilter !== true
                    ? 'hidden'
                    : ''
                }`}
              >
                <div className="rounded-sm shadow-xs lg:bg-none lg:shadow-none">
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <ul>
                      <li
                        className={cn(
                          `${s.link}`,
                          'block leading-5 lg:text-base lg:no-underline lg:font-bold lg:tracking-wide lg:hover:bg-transparent hover:--seconday focus:outline-none focus:bg-accent-1 focus:text-accent-01',
                          {
                            underline: !activeCategory?.name,
                          }
                        )}
                      >
                        <Link
                          href={{ pathname: getCategoryPath('', brand), query }}
                        >
                          <a
                            onClick={(e) => handleClick(e, 'categories')}
                            className={
                              'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                            }
                          >
                            All Categories
                          </a>
                        </Link>
                      </li>
                      {categories.map((cat: any) => (
                        <li
                          key={cat.path}
                          className={cn(
                            `${s.link}`,
                            'block leading-5 hover:bg-accent-1 lg:hover:bg-transparent hover:text-accent-8 focus:outline-none focus:bg-accent-1 focus:text-accent-8',
                            {
                              underline: activeCategory?.id === cat.id,
                            }
                          )}
                        >
                          <Link
                            href={{
                              pathname: getCategoryPath(cat.path, brand),
                              query,
                            }}
                          >
                            <a
                              onClick={(e) => handleClick(e, 'categories')}
                              className={
                                'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                              }
                            >
                              {cat.name}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Products */}
          <div className="col-span-8 order-3 lg:order-none m-8">
            {(q || activeCategory || activeBrand) && (
              <div className="mb-12 transition ease-in duration-75">
                {data ? (
                  <>
                    <span
                      className={cn('animated', {
                        fadeIn: data.found,
                        hidden: !data.found,
                      })}
                    >
                      Showing {data.products.length} results{' '}
                      {q && (
                        <>
                          for "<strong>{q}</strong>"
                        </>
                      )}
                    </span>
                    <span
                      className={cn('animated', {
                        fadeIn: !data.found,
                        hidden: data.found,
                      })}
                    >
                      {q ? (
                        <>
                          There are no products that match "<strong>{q}</strong>
                          "
                        </>
                      ) : (
                        <>
                          There are no products that match the selected
                          category.
                        </>
                      )}
                    </span>
                  </>
                ) : q ? (
                  <>
                    Searching for: "<strong>{q}</strong>"
                  </>
                ) : (
                  <>Searching...</>
                )}
              </div>
            )}
            {data ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {console.log(data.products)}
                {data.products.map((product: Product) => (
                  <ProductCard
                    variant="simple"
                    key={product.path}
                    className="animated fadeIn"
                    product={product}
                    imgProps={{
                      width: 480,
                      height: 480,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rangeMap(12, (i) => (
                  <Skeleton key={i}>
                    <div className="w-60 h-60" />
                  </Skeleton>
                ))}
              </div>
            )}{' '}
          </div>

          {/* Sort */}
          <div className="col-span-8 lg:col-span-2 order-2 lg:order-none">
            <div className="relative inline-block w-full">
              <div className="lg:hidden">
                <span className="rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={(e) => handleClick(e, 'sort')}
                    className={s.category}
                    // className="flex justify-between w-full rounded-sm border border-accent-3 px-4 py-3 bg-accent-0 text-sm leading-5 font-medium text-accent-4 hover:text-accent-5 focus:outline-none focus:border-blue-300 focus:shadow-outline-normal active:bg-accent-1 active:text-accent-8 transition ease-in-out duration-150"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    {sort ? SORT[sort as keyof typeof SORT] : 'Relevance'}
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              </div>
              <div
                className={`${
                  s.dropDown
                } origin-top-left absolute lg:relative left-0 mt-2 w-full rounded-md shadow-lg lg:shadow-none z-10 mb-10 lg:block ${
                  activeFilter !== 'sort' || toggleFilter !== true
                    ? 'hidden'
                    : ''
                }`}
              >
                <div className="shadow-xs lg:bg-none lg:shadow-none">
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <ul>
                      <li
                        className={cn(
                          `${s.link}`,
                          'block leading-5 lg:text-base lg:no-underline lg:font-bold lg:tracking-wide hover:bg-accent-1 lg:hover:bg-transparent hover:text-accent-8 focus:outline-none focus:bg-accent-1 focus:text-accent-8',
                          {
                            underline: !sort,
                          }
                        )}
                      >
                        <Link href={{ pathname, query: filterQuery({ q }) }}>
                          <a
                            onClick={(e) => handleClick(e, 'sort')}
                            className={
                              'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                            }
                          >
                            Relevance
                          </a>
                        </Link>
                      </li>
                      {Object.entries(SORT).map(([key, text]) => (
                        <li
                          key={key}
                          className={cn(
                            `${s.link}`,
                            'block leading-5 hover:bg-accent-1 lg:hover:bg-transparent hover:text-accent-8 focus:outline-none focus:bg-accent-1 focus:text-accent-8',
                            {
                              underline: sort === key,
                            }
                          )}
                        >
                          <Link
                            href={{
                              pathname,
                              query: filterQuery({ q, sort: key }),
                            }}
                          >
                            <a
                              onClick={(e) => handleClick(e, 'sort')}
                              className={
                                'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                              }
                            >
                              {text}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.joinTheTeam}>
        {/* <h2>JOIN THE TEAM.</h2>
        <p>
          We’re a vibrant community of players always looking for new ways to
          play. Sign-up for exclusive product deals and ideas for gameplay.
        </p>
        <NewsLetter /> */}
      </div>
    </Container>
  )
}

Search.Layout = Layout
