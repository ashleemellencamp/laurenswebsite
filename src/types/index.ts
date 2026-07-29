export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Gallery {
  slug: string;
  title: string;
  description?: string;
  coverImage: GalleryImage;
  images: GalleryImage[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  footerTagline: string;
  email: string;
  location: string;
  social: {
    instagram?: string;
    pinterest?: string;
  };
}
