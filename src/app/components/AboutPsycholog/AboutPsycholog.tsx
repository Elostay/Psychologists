import { FC } from 'react';

interface AboutPsychologProps {
  category: string;
  value: string | null;
}

const AboutPsycholog: FC<AboutPsychologProps> = ({ category, value }) => {
  return (
    <p className="py-2 px-4 bg-gray-100 rounded-3xl inline-block font-medium mr-1 mb-2">
      <span className="opacity-50">{category}</span>:&nbsp;{value}
    </p>
  );
};

export default AboutPsycholog;
