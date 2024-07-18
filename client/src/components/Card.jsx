import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Assuming SweetAlert2 is imported

import TrashDelete from "./TrashDelete";

export function Card({
  username,
  images,
  name,
  age,
  breed,
  description,
  contact,
  handleChat,
  userId,
}) {
  const [activeChats, setActiveChats] = useState(0);

  const handleStartChat = () => {
    if (activeChats >= 2) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Only two users can chat simultaneously. Please try again later.",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } else {
      handleChat(userId);
      setActiveChats(activeChats + 1);
    }
  };

  return (
    <section className="mb-8 sm:mb-0 px-3 py-2 max-w rounded-lg shadow-xl bg-light-first sm:col-span-1">
      <div className="my-2 flex justify-between">
        <h1 className="text-light-fourth font-bold text-md">{username}</h1>
      </div>
      <hr className="border-t-4 border-light-third" />
      <div className="grid grid-cols-3 gap-1 my-3">
        <div className="col-span-2">
          <div className="grid grid-rows-2 gap-1 w-full h-40">
            <img
              src={images[0]?.imgUrl}
              alt="..."
              className="w-full h-full object-cover row-span-2"
            />
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-rows-2 gap-1 w-full h-40">
            <img
              src={images[1]?.imgUrl}
              alt="..."
              className="w-full h-full object-cover row-span-1"
            />
            <img
              src={images[2]?.imgUrl}
              alt="..."
              className="w-full h-full object-cover row-span-1"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-xl text-light-fourth">{name}</h1>
        <h3 className="font-bold text-sm text-light-fourth">({age})</h3>
        <h3 className="font-bold text-md text-light-third">{breed}</h3>
        <p className="mt-2 font-bold text-xs text-gray-500 overflow-hidden h-16">
          {description}
        </p>
      </div>
      <p className="my-4 font-bold text-sm text-gray-500 overflow-hidden text-left">
        Contact: {contact}
      </p>
      <button
        onClick={handleStartChat}
        className="bg-light-third text-white px-4 py-2 rounded-md ml-2"
      >
        <Link to={`/chat/${userId}`} className="text-white">
          Chat with {username}
        </Link>
      </button>
    </section>
  );
}

export function CardBreeds({ id, name, temperament, description }) {
  return (
    <div className="my-5 border p-7 bg-white border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 max-w-sm sm:w-80">
      <Link to={`/cat-breeds/${id}`} className="block h-full">
        <div className="grid grid-rows-5 h-full">
          <h5 className="row-span-1 mb-1 text-2xl text-center font-bold tracking-tight text-light-third dark:text-white">
            {name}
          </h5>
          <h5 className="row-span-1 mb-1 text-sm text-center font-medium tracking-tight text-light-second dark:text-white">
            {temperament}
          </h5>
          <p className="text-center text-sm row-span-2 mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description.slice(0, 150)}...
          </p>
          <div className="flex justify-center items-center py-3">
            <span className="w-full px-3 py-2 text-sm font-medium text-center text-white bg-light-third rounded-lg hover:bg-light-fourth dark:bg-blue-600 dark:hover:bg-light-third">
              <Link to={`/cat-breeds/${id}`} className="text-white">
                Details
              </Link>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function UserCatCard({
  handleChangeStatus,
  images,
  name,
  age,
  breed,
  description,
  id,
  adoptionStatus,
  handleDelete,
}) {
  return (
    <section className="mb-8 sm:mb-0 px-3 py-2 max-w rounded-lg shadow-xl bg-light-first sm:col-span-1">
      <h1 className="mt-2 text-center font-bold text-xl text-light-fourth">
        {name}
      </h1>
      <div className="grid grid-cols-3 gap-1 my-3">
        <div className="col-span-2">
          <div className="grid grid-rows-2 gap-1 w-full h-40">
            <img
              src={images[0]?.imgUrl}
              alt="..."
              className="w-full h-full object-cover row-span-2"
            />
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-rows-2 gap-1 w-full h-40">
            <img
              src={images[1]?.imgUrl}
              alt="..."
              className="w-full h-full object-cover row-span-1"
            />
            <img
              src={images[2]?.imgUrl}
              alt="..."
              className="w-full h-full object-cover row-span-1"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h3 className="font-bold text-sm text-light-fourth">({age})</h3>
        <p className="font-bold text-md text-light-third">{breed}</p>
        <p className="font-medium text-sm text-light-fourth">{description}</p>
        <div className="grid grid-cols-4 gap-4 w-full">
          <button
            onClick={() => handleChangeStatus(id)}
            className="col-span-3 h-10 shadow-md my-3 bg-light-third py-2 rounded-lg font-semibold text-sm text-white hover:bg-light-fourth"
          >
            {adoptionStatus}
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="col-span-1 h-10 shadow-md my-3 bg-red-700 py-2 rounded-lg font-semibold text-sm text-white hover:bg-red-800"
          >
            <div className="flex justify-center items-center">
              <TrashDelete />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
