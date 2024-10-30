export interface PsychologistReviews {
  reviewer: string;
  rating: number;
  comment: string;
}
export interface Psychologist {
  name: string;
  avatar_url: string;
  experience: string;
  reviews: PsychologistReviews[];
  price_per_hour: number;
  rating: number;
  license: string;
  specialization: string;
  initial_consultation: string;
  about: string;
}

export interface SvgProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string | null;
}
