import s from './LogoWhite.module.scss'
const LogoWhite = ({ className = '', ...props }) => (
  <div className={s.imageWrap}>
    <img src="/Golfway-White-500.png" alt="Golfway Logo" width="180" />
  </div>
)

export default LogoWhite
