import React, { useState } from "react";
import Arrow from "../Icons/Arrow";
import Hero from "img/hero.jpg";
import Users from "components/Icons/Users";
import Check from "components/Icons/Check";
import Modal from "components/Modal/Modal";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="mt-[78px] flex gap-[124px] items-center">
      <div className="max-w-[595px]">
        <h1 className="font-semibold text-[70px] leading-[102%] tracking-[0.02em]">
          The road to the <span className="text-[#3470FF] italic">depths</span>{" "}
          of the human soul
        </h1>
        <h2 className="mt-5 font-medium leading-[113%] tracking-[0.02em] text-[18px] max-w-[510px]">
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </h2>
        <button
          type="button"
          className="bg-[#3470FF] text-white py-[15px] px-[50px] rounded-3xl flex gap-[18px] items-center hover:bg-red-300 mt-10"
          onClick={openModal}
        >
          Get started
          <Arrow width="16px" height="16px" fillColor="" strokeColor="" />
        </button>
        <Modal isOpen={modalOpen} onClose={closeModal} />
      </div>
      <div className="relative shrink-0">
        <p
          className="w-12 h-12 bg-[#FBC75E] rounded-xl text-white flex items-center justify-center absolute top-[40px] -right-[35px] "
          style={{ transform: "rotate(10deg)" }}
        >
          <p style={{ transform: "rotate(-10deg)" }}>
            <Users
              width="16px"
              height="16px"
              fillColor="#FFC531"
              strokeColor="none"
            />
          </p>
        </p>
        <p
          className="w-10 h-10 bg-[#54BE96] rounded-xl text-white flex items-center justify-center absolute top-[200px] -left-[30px]"
          style={{ transform: "rotate(-20deg)" }}
        >
          ?
        </p>
        <div className=" bg-[#3470FF] absolute flex items-center gap-4 p-[32px] rounded-3xl bottom-[70px] -left-[100px]">
          <p className="w-[54px] h-[54px] rounded-xl bg-white flex items-center justify-center">
            <Check strokeColor="#3470FF" width="20px" height="15px" />
          </p>
          <div>
            <p className="text-[#97B5FD] whitespace-nowrap">
              Experienced psychologists
            </p>
            <p className="text-white font-bold text-[24px]">15,000</p>
          </div>
        </div>
        <img
          src={Hero}
          className="w-[464px] h-[526px]"
          alt="psycologist girl"
        />
      </div>
    </div>
  );
};

export default Home;
