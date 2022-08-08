import type { GetServerSideProps, NextPage } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: 'https://www.lostark.party',
      permanent: false,
    },
  }
}

const Home: NextPage = () => {
  return (
    <div>
      <p>Something</p>
    </div>
  )
}

export default Home
