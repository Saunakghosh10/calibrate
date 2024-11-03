import dynamic from 'next/dynamic'
import { Navbar } from "@/components/navbar";

// Dynamically import client components
const LoadingScreen = dynamic(() => import("@/components/loading-screen").then(mod => mod.LoadingScreen), {
  ssr: false
})
const Hero = dynamic(() => import("@/components/sections/hero").then(mod => mod.Hero), {
  ssr: false
})
const Features = dynamic(() => import("@/components/sections/features").then(mod => mod.Features), {
  ssr: false
})
const Integrations = dynamic(() => import("@/components/sections/integrations").then(mod => mod.Integrations), {
  ssr: false
})
const UseCases = dynamic(() => import("@/components/sections/use-cases").then(mod => mod.UseCases), {
  ssr: false
})
const Testimonials = dynamic(() => import("@/components/sections/testimonials").then(mod => mod.Testimonials), {
  ssr: false
})
const Footer = dynamic(() => import("@/components/sections/footer").then(mod => mod.Footer), {
  ssr: false
})

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <LoadingScreen />
      <div className="opacity-0 animate-fade-in">
        <Navbar />
        <Hero />
        <Features />
        <Integrations />
        <UseCases />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}
