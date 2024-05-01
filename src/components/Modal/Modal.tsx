import { IModal } from "Interface/modal.types";
import Close from "components/Icons/Close";
import EyeClose from "components/Icons/EyeClose";
import EyeOpen from "components/Icons/EyeOpen";
import React, { useState } from "react";

const Modal = ({ isOpen, onClose, login, registration }: IModal) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="z-10 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      {login && (
        <div className="bg-white  rounded-lg shadow-lg p-16 relative w-[566px] ">
          <button
            type="button"
            className="flex absolute top-0 right-0 m-6"
            onClick={onClose}
          >
            <Close width="32" height="32" />
          </button>
          <h2 className="font-bold mb-5 text-[40px]">Log In</h2>
          <p className="text-[#8A8B88] mb-10">
            Welcome back! Please enter your credentials to access your account
            and continue your search for a psychologist.
          </p>
          <div className="mb-10">
            <input
              type="text"
              placeholder="Email"
              className="mb-[18px] border border-gray-300 rounded-xl py-4 pl-5 w-full placeholder-black"
              name="email"
            />
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border border-gray-300 rounded-xl py-4 pl-5 w-full placeholder-black"
              />
              <button
                type="button"
                className="absolute top-1/3 right-5"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOpen width="20" height="20" />
                ) : (
                  <EyeClose width="20" height="20" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#3470FF] text-white py-4 w-full rounded-3xl"
          >
            Log In
          </button>
        </div>
      )}
      {registration && (
        <div className="bg-white  rounded-lg shadow-lg p-16 relative w-[566px] ">
          <button
            type="button"
            className="flex absolute top-0 right-0 m-6"
            onClick={onClose}
          >
            <Close width="32" height="32" />
          </button>
          <h2 className="font-bold mb-5 text-[40px]">Registration</h2>
          <p className="text-[#8A8B88] mb-10">
            Thank you for your interest in our platform! In order to register,
            we need some information. Please provide us with the following
            information.
          </p>
          <div className="mb-10">
            <input
              type="text"
              name="email"
              placeholder="Name"
              className="mb-[18px] border border-gray-300 rounded-xl py-4 pl-5 w-full placeholder-black"
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="mb-[18px] border border-gray-300 rounded-xl py-4 pl-5 w-full placeholder-black"
            />
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border border-gray-300 rounded-xl py-4 pl-5 w-full placeholder-black"
              />
              <button
                type="button"
                className="absolute top-1/3 right-5"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOpen width="20" height="20" />
                ) : (
                  <EyeClose width="20" height="20" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#3470FF] text-white py-4 w-full rounded-3xl"
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Modal;
