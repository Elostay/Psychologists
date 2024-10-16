import { FC } from 'react';
import Button from './components/Button';
import Arrow from '@public/images/Arrow.svg';
interface HomeProps {}

const HomeName: FC<HomeProps> = () => {
  return (
    <div className="">
      <h1>
        The road to the <span>depths</span> of the human soul
      </h1>
      <p>
        We help you to reveal your potential, overcome challenges and find a
        guide in your own life with the help of our experienced psychologists.
      </p>
      <Button background="bg-primary-orange" color="text-white">
        Get started
      </Button>
    </div>
  );
};

export default HomeName;
