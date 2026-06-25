import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ShowcaseSection from '../components/ShowcaseSection'
import IntroSection from '../components/IntroSection'
import ServicesSection from '../components/ServicesSection'
import WorkSection from '../components/WorkSection'
import RecentWorks from '../components/RecentWorks'
import FoundersSection from '../components/FoundersSection'
import FaqSection from '../components/FaqSection'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'

const Home = ({ isLoading }) => {
  return (
    <PageTransition>
      <div className="home-page">
        <Navbar />
        <main>
          <Hero isLoading={isLoading} />
          <ShowcaseSection />
          <IntroSection />
          <ServicesSection />
          <WorkSection />
          <RecentWorks />
          <FoundersSection />
          <FaqSection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  )
}

export default Home
