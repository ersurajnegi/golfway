import cn from 'classnames'
import React from 'react'
import s from './Swatch.module.scss'
import { Check } from '@components/icons'
import Button, { ButtonProps } from '@components/ui/Button'
import { isDark } from '@lib/colors'
import { serialize } from 'cookie'
interface SwatchProps {
  active?: boolean
  children?: any
  className?: string
  variant?: 'size' | 'color' | string
  color?: string
  label?: string | null
  bgcolor?: string | null
}

const Swatch: React.FC<Omit<ButtonProps, 'variant'> & SwatchProps> = React.memo(
  ({
    active,
    className,
    color = '',
    label = null,
    variant = 'size',
    bgcolor,
    ...props
  }) => {
    variant = variant?.toLowerCase()

    if (label) {
      label = label?.toLowerCase()
    }

    const swatchClassName = cn(
      s.swatch,
      {
        [s.color]: color,
        [s.active]: active,
        [s.size]: variant === 'size',
        // [s.dark]: color ? isDark(color) : false,
        [s.textLabel]: !color && label && label.length > 3,
      },
      className
    )

    console.log(label)

    return (
      <Button
        aria-label="Variant Swatch"
        className={swatchClassName}
        {...(label && color && { title: label })}
        style={bgcolor ? { backgroundColor: bgcolor } : {}}
        {...props}
      >
        {/* {color && active && (
          <span>
            <Check />
          </span>
        )} */}
        {!color ? label : null}
      </Button>
    )
  }
)

export default Swatch
