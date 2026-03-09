import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import dynamic from 'next/dynamic'

import Navbar   from '../components/Navbar'
import Hero     from '../components/Hero'
import About    from '../components/About'
import Research from '../components/Research'
import Work     from '../components/Work'
import Projects from '../components/Projects'
import Contact  from '../components/Contact'

// Preloader only runs client-side
const Preloader = dynamic(() => import('../components/Preloader'), { ssr: false })

const Home: NextPage = () => {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Head>
        <title>Ahmed Tareque — Software Engineer &amp; AI Researcher</title>
        <meta name="description" content="Software Engineer and AI Researcher focused on trustworthy, adversarially robust machine learning for healthcare. PhD applicant 2026." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Preloader */}
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* Site */}
      <div style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Research />
          <Work />
          <Projects />
          <Contact />
        </main>
      </div>
    </>
  )
}

export default Home
