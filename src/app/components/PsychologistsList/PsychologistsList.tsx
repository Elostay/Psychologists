import { FC } from 'react';
import PsychologistItem from '../PsychologistItem';
import { Psychologist } from '@/interfaces/interfaces';
import Loading from '@/app/loading';
interface PsychologistsListProps {
  data: Psychologist[];
}

const PsychologistsList: FC<PsychologistsListProps> = ({ data }) => {
  return (
    <ul>
      {data ? (
        data.map((psycholog: Psychologist) => (
          <PsychologistItem key={psycholog.id} data={psycholog} />
        ))
      ) : (
        <Loading />
      )}
    </ul>
  );
};

export default PsychologistsList;
