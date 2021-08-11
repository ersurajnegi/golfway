import s from './icons styles/icons.module.scss'

const Bag = ({ ...props }) => {
  return (
    <div className={s.bag}>
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        className={s.st2}
        // stroke="currentColor"
        {...props}
        version="1.1"
        id="Layer_1"
      >
        <path className={s.st0} d="M0,0h24v24H0V0z" />
        <path
          className={s.st1}
          d="M22,9h-4.8l-4.4-6.6C12.6,2.2,12.3,2,12,2s-0.6,0.1-0.8,0.4L6.8,9H2c-0.5,0-1,0.4-1,1c0,0.1,0,0.2,0,0.3
	l2.5,9.3c0.2,0.8,1,1.5,1.9,1.5h13c0.9,0,1.7-0.6,1.9-1.5l2.5-9.3l0-0.3C23,9.4,22.5,9,22,9z M12,4.8L14.8,9H9.2L12,4.8z M18.5,19
	l-13,0l-2.2-8h17.4L18.5,19z M12,13c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,13,12,13z"
        />
      </svg>
    </div>
  )
}

export default Bag
