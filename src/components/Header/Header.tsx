import { Link } from "react-router-dom";
import React, { useState } from "react";
import Modal from "components/Modal/Modal";

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalRegistration, setModalRegistration] = useState(false);

  const openModal = (btn: any) => {
    setModalOpen(true);
    if (btn === "login") {
      setModalRegistration(false);
      setModalLogin(true);
    }
    if (btn === "registration") {
      setModalLogin(false);
      setModalRegistration(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex justify-between  items-center container">
      <Link to="/" className="font-bold">
        <span className="text-[#3470FF]">psychologists.</span>services
      </Link>
      <div className="flex gap-5 items-center">
        <Link to="/">Home</Link>
        <Link to="/psychologists">Psychologists</Link>
        {/* <Link to="/favourites">Favourites</Link> */}
      </div>
      <div className="flex gap-5 font-medium">
        <button
          type="button"
          className="py-[10px] px-[30px] border border-gray-300 rounded-3xl"
          onClick={() => openModal("login")}
        >
          Log In
        </button>
        <button
          type="button"
          className="py-[10px] px-[30px] bg-[#3470FF] rounded-3xl text-white"
          onClick={() => openModal("registration")}
        >
          Registration
        </button>
        {/* <button
          type="button"
          className="py-[10px] px-[30px] border border-gray-300 rounded-3xl"
        >
          Log out
        </button> */}
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        login={modalLogin}
        registration={modalRegistration}
      />
    </div>
  );
};

export default Header;
