import { FC } from 'react';
import { Hearts } from 'react-loader-spinner';

interface LoadingProps {}

const Loading: FC<LoadingProps> = () => {
  return (
    <div className=" flex items-center justify-center absolute top-0 left-0 w-screen h-screen z-50 ">
      <Hearts
        height="80"
        width="80"
        color={'#FF0000'}
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
