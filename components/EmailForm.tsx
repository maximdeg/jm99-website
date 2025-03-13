import React from "react";

const EmailForm = () => {
  return (
    <div className="w-full overflow-hidden flex justify-center align-center mt-32">
      <form className="bg-gray-300 opacity-75 w-full md:w-3/5 py-6 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            id="name"
            type="text"
            placeholder="Nombre"
          />
          <label
            className="block text-[#350D70] py-2 font-bold mb-2"
            htmlFor="emailaddress"
          >
            Escribinos por cualquier consulta que tengas
          </label>
          <input
            className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            id="email"
            type="text"
            placeholder="tuemail@email.com"
          />
          <label
            className="block text-[#350D70] py-2 font-bold mb-2"
            htmlFor="email"
          ></label>
          <textarea
            className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            id="bodyText"
            placeholder="Consulta"
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out !self-end"
            type="button"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailForm;
