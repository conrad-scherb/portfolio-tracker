import type { NextPage } from 'next'
import DisplayRow from '../components/DisplayRow'

const Home: NextPage = () => {
  return (
    <div className="border-blue-500 border-2">
      <DisplayRow symbol="cbt"/>
    </div>
  )
}

export default Home
