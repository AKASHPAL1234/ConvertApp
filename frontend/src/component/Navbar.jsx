import React from "react";

function Navbar() {
  return (
    <>
      <div className=" bg-red-500 fixed w-full  max-w-screen-2xl mx-auto cotainer py-3 px-6 md:px-40 shadow-lg h-16  ">
        <div className="flex justify-between  ">
          <h1 className="text-2xl cursor-pointer font-bold hover:scale-125 duration-300 ">
            world<span className="text-3xl text-green-500">To</span>pdf
          </h1>
          <h1 className="text-2xl cursor-pointer font-bold hover:scale-125 duration-300">
            Home
          </h1>
        </div>
      </div>
    </>
  );
}

export default Navbar;
