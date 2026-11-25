import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import dynamic from 'next/dynamic'

import Navbar   from '../components/Navbar'
import Hero     from '../components/Hero'
import About    from '../components/About'
import Research from '../components/Research'
import Work       from '../components/Work'
import Projects   from '../components/Projects'
import BeyondWork from '../components/BeyondWork'
import Contact    from '../components/Contact'

// Preloader only runs client-side
const Preloader = dynamic(() => import('../components/Preloader'), { ssr: false })

const Home: NextPage = () => {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Head>
        <title>Ahmed Tareque — Software Engineer &amp; AI Researcher</title>
        <meta name="description" content="Software Engineer and AI Researcher. Incoming MS student in Regional & City Planning at the University of Oklahoma (Gibbs College of Architecture), 2026." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ahmedtareque.com/" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        {/* Open Graph / Twitter */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ahmedtareque.com/" />
        <meta property="og:site_name" content="Ahmed Tareque" />
        <meta property="og:title" content="Ahmed Tareque — Software Engineer & AI Researcher" />
        <meta property="og:description" content="Software Engineer and AI Researcher. Incoming MS student in Regional & City Planning at the University of Oklahoma." />
        <meta property="og:image" content="https://ahmedtareque.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ahmed Tareque — Software Engineer & AI Researcher" />
        <meta name="twitter:description" content="Software Engineer and AI Researcher. Incoming MS student in Regional & City Planning at the University of Oklahoma." />
        <meta name="twitter:image" content="https://ahmedtareque.com/og-image.jpg" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ahmed Tareque',
              url: 'https://ahmedtareque.com/',
              image: 'https://ahmedtareque.com/og-image.jpg',
              jobTitle: 'Software Engineer & AI Researcher',
              affiliation: {
                '@type': 'CollegeOrUniversity',
                name: 'University of Oklahoma',
                url: 'https://www.ou.edu',
              },
              sameAs: [
                'https://github.com/ahmedtareque',
                'https://linkedin.com/in/ahmedtareque',
              ],
              knowsAbout: ['Software Engineering', 'Artificial Intelligence', 'Machine Learning', 'Regional & City Planning'],
            }),
          }}
        />
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
          <BeyondWork />
          <Contact />
        </main>
      </div>
    </>
  )
}

export default Home
