import type { NextPage } from 'next'
import AssetDisplayTable from '../components/portfolio/AssetDisplayTable'

const Home: NextPage = () => {
  return (
    <AssetDisplayTable
      user={"acir"}
    />
  )
}

export default Home
