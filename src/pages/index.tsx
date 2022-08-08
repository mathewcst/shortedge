import type { GetServerSideProps, NextPage } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: process.env.BASE_APP_URL!,
      permanent: false,
    },
  }
}

const Home: NextPage = () => {
  return (
    <div>
      <p>You shouldnt see this</p>
    </div>
  )
}

export default Home
