export interface HeroSlideAction {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface HeroSlideMedia {
  src: string;
  alt: string;
}

export interface HeroSlide {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  image: HeroSlideMedia;
  primaryAction: HeroSlideAction;
  secondaryAction?: HeroSlideAction;
}
