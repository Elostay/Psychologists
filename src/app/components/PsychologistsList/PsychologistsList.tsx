import { FC } from 'react';
import PsychologistItem from '../PsychologistItem';
import { Psychologist } from '@/interfaces/interfaces';
interface PsychologistsListProps {
  data: Psychologist[];
}

const PsychologistsList: FC<PsychologistsListProps> = ({ data }) => {
  return (
    <ul>
      {data ? (
        data.map((psycholog: Psychologist) => (
          <PsychologistItem key={psycholog.name} data={psycholog} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </ul>
  );
};

export default PsychologistsList;
