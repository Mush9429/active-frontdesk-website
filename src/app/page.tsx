import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import ProblemStatement from "@/components/ProblemStatement";
import BeforeAfter from "@/components/BeforeAfter";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import WhyWeBuiltThis from "@/components/WhyWeBuiltThis";
import IdealFor from "@/components/IdealFor";
import AudioExplainer from "@/components/AudioExplainer";
import Pricing from "@/components/Pricing";
import ROICalculator from "@/components/ROICalculator";
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
        <LogoMarquee />
        <ProblemStatement />
        <BeforeAfter />
        <HowItWorks />
        <Features />
        <WhyWeBuiltThis />
        <IdealFor />
        <Pricing />
        <ROICalculator />
        <FAQ />
        <BlogPreview posts={posts} />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
