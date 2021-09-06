import { Layout } from '@components/common'
import Story from '../components/story/Story'
import s from '../assets/pages/page.module.scss'

export default function Test() {
  return (
    <div className={s.pageWrap}>
      {/* <Story /> */}
      Test
    </div>
  )
}

Test.Layout = Layout
