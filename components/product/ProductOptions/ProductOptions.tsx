import { memo, ReactChild } from 'react'
import s from './ProductOptions.module.scss'
import { Swatch } from '@components/product'
import type { ProductOption } from '@commerce/types/product'
import { SelectedOptions } from '../helpers'

interface ProductOptionsProps {
  options: ProductOption[]
  selectedOptions: SelectedOptions
  setSelectedOptions: React.Dispatch<SelectedOptions>
}

const colourCode = function (value: string) {
  switch (value) {
    case '90':
      return '#02e0c5'
    case '110':
      return '#fbdb65'
    case '130':
      return '#1a658f'
    case '150':
      return '#686d9f'
    case '170':
      return '#d9d9d6'
    default:
      return 'white'
  }
}
const colourCodeText = function (value: string) {
  switch (value) {
    case '110':
      return '#53575a'
    case '170':
      return '#53575a'
    default:
      return 'white'
  }
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  console.log('hello : ',  options)
  return (
    <div>
      {options.map((opt) => (
        <div className={s.optionWrap} key={opt.displayName}>
          <h2>{opt.displayName.toUpperCase()}:</h2>
          <div className={s.options}>
            {opt.values.map((v, i: number) => {
              const active = selectedOptions[opt.displayName.toLowerCase()]
              console.log(v)
              return (
                <Swatch
                  key={`${opt.id}-${i}`}
                  active={v.label.toLowerCase() === active}
                  variant={opt.displayName}
                  // className={s.colour}
                  // color={v.hexColors ? v.hexColors[0] : '#d9d9d6'}
                  color={colourCodeText(v.label)}
                  label={v.label}
                  bgcolor={colourCode(v.label)}
                  onClick={() => {
                    setSelectedOptions((selectedOptions: any) => {
                      return {
                        ...selectedOptions,
                        [opt.displayName.toLowerCase()]: v.label.toLowerCase(),
                      }
                    })
                  }}
                />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default memo(ProductOptions)
