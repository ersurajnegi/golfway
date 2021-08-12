import s from './Logo.module.scss'

const Logo = ({ className = '', ...props }) => (
  <div className={s.imageWrap}>
    <img src="/Golfway-Grey-500.png" alt="Golfway Logo" width="180" />
  </div>
)

export default Logo
