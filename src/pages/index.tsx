import Head from 'next/head'
import { DM_Mono, Krona_One } from 'next/font/google'
import Header from '@/Components/Header'

const dm_mono = DM_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-mono',
})

const krona_one = Krona_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-krona-one',
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Daniela Barbosa - Front-end Developer</title>
        <meta
          name="description"
          content="Daniela Barbosa - Front-end Developer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${krona_one.variable} ${dm_mono.variable}`}>
        <Header />
      </main>
    </>
  )
}
