import React from "react";
import MostPopularTools from "@/components/home/MostPopularTools";

// Import all home page sections as components
import HeroSection from "@/components/home/HeroSection";
import FeaturedToolsSection from "@/components/home/FeaturedToolsSection";
import DesignToolsSection from "@/components/home/DesignToolsSection";
import AIToolsSection from "@/components/home/AIToolsSection";
import QuickAccessGrid from "@/components/home/QuickAccessGrid";
import DeveloperToolsSection from "@/components/home/DeveloperToolsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import ValuePropositionSection from "@/components/home/ValuePropositionSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedSpotlightSection from "@/components/home/FeaturedSpotlightSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TrustSecuritySection from "@/components/home/TrustSecuritySection";
import NewsletterSection from "@/components/home/NewsletterSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* Breadcrumb */}
      <div className="container px-4 mx-auto py-3">
        <DynamicBreadcrumb 
          items={[{ label: "Home", href: "/" }]} 
          variant="minimal"
        />
      </div>

      {/* Hero Section - Main landing with ModernSearchBar */}
      <HeroSection />

      {/* Most Popular Tools - High CTR section */}
      <MostPopularTools />

      {/* Featured Tools Showcase */}
      <FeaturedToolsSection />

      {/* Design Tools Category Section */}
      <DesignToolsSection />

      {/* AI Tools Section */}
      <AIToolsSection />

      {/* Quick Access Grid - Converters */}
      <QuickAccessGrid />

      {/* Developer Tools Section */}
      <DeveloperToolsSection />

      {/* Categories Section */}
      <CategoriesSection />

      {/* Value Proposition Section */}
      <ValuePropositionSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Interactive Stats Section */}
      <StatsSection />

      {/* Featured Tool Spotlight */}
      <FeaturedSpotlightSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Trust & Security Section */}
      <TrustSecuritySection />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
