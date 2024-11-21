export interface PsychologistReviews {
  reviewer: string;
  rating: number;
  comment: string;
}
export interface Psychologist {
  id: string;
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

export interface PsychologistMeeting {
  psycologName: string | null;
  avatar_url: string | null;
  price_per_hour: string | null;
  rating: string | null;
  specialization: string | null;
  id: string | null;
  meetingTime: string | undefined;
  username: string | null;
  comment: string | null;
  email: string | null;
  phone: string | null;
}
