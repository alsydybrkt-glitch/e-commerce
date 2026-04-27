"use client";

import React from 'react';
import { PromoBanner } from '@/shared/ui/PromoBanner';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface PromoBannersGridProps {
  locale: string;
}

export default function PromoBannersGrid({ locale }: PromoBannersGridProps) {
  // Use client-side translation hook for consistency
  const { t } = useTranslation();

  return (
    <section className="shell section-gap">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <PromoBanner 
          title="Gaming Setup" 
          subtitle="Upgrade your battlestation with our latest high-performance accessories." 
          ctaText="Shop Now"
          imageSrc="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=80"
        />
        <PromoBanner 
          title="Smart Living" 
          subtitle="Experience the future of home automation with our curated smart devices." 
          ctaText="Explore"
          imageSrc="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1200&q=80"
        />
      </div>
    </section>
  );
}
