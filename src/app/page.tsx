import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBand from "@/components/StatsBand";
import LogoMarquee from "@/components/LogoMarquee";
import ProblemStatement from "@/components/ProblemStatement";
import BeforeAfter from "@/components/BeforeAfter";
import HowItWorks from "@/components/HowItWorks";
import FeatureShowcase from "@/components/FeatureShowcase";
import Features from "@/components/Features";
import WhyWeBuiltThis from "@/components/WhyWeBuiltThis";
import IdealFor from "@/components/IdealFor";
import AudioExplainer from "@/components/AudioExplainer";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import BlogPreview from "@/components/BlogPreview";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <AudioExplainer />
        <StatsBand />
        <LogoMarquee />
        <ProblemStatement />
        <BeforeAfter />
        <HowItWorks />
        <FeatureShowcase />
        <Features />
        <WhyWeBuiltThis />
        <IdealFor />
        <Pricing />
        <FAQ />
        <BlogPreview posts={posts} />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
