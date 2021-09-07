import GameCard from './gameCard'

import s from './gamesGrid.module.scss'

export default function GamesGrid({ game }: { game: any }) {
  const handleChange = (event: any) => {
    console.log('handlechange: ', event.target.value)
  }

  const family = game.indexOf('family')

  console.log(family)

  // Create a filter that removes unselected games

  return (
    <div className={s.game}>
      <div className={s.gameFilter}>
        <h3>Filter Games</h3>
        <form onChange={handleChange}>
          <div className={s.preference}>
            <input type="checkbox" name="family" />
            <label htmlFor="family games">Family games</label>
          </div>
          <div className={s.preference}>
            <input type="checkbox" name="urban" />
            <label htmlFor="urban games">Urban games</label>
          </div>
          <div className={s.preference}>
            <input type="checkbox" name="indoor" />
            <label htmlFor="indoor games">Indoor games</label>
          </div>
          <div className={s.preference}>
            <input type="checkbox" name="outdoor" />
            <label htmlFor="outdoor games">Outdoor games</label>
          </div>
        </form>
      </div>
      <div className={s.gameWrap}>
        {game.map((g: any) => {
          return <GameCard key={g.sys.id} g={g} />
        })}
      </div>
    </div>
  )
}
