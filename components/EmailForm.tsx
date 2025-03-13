"use client";
import React from "react";
import useForm from "@/utils/hooks/useForm";

const EmailForm = () => {
  const formFields = {
    name: "",
    email: "",
    message: "",
  };

  const { handleChangeInputValue, formValuesState } = useForm(formFields);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    console.log(data.get("message"));
    console.log(formValuesState);

    try {
      const response: Response = await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      const resData = response.json();
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full overflow-hidden flex justify-center align-center mt-32">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-300 opacity-75 w-full md:w-3/5 py-6 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-[#350D70] py-2 font-bold mb-2"
            htmlFor="emailaddress"
          >
            Escribinos por cualquier consulta que tengas
          </label>
          <input
            className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            id="name"
            type="name"
            name="name"
            placeholder="Nombre"
            onChange={handleChangeInputValue}
          />
          <label
            className="block text-[#350D70] py-2 font-bold mb-2"
            htmlFor="name"
          ></label>
          <input
            className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            id="email"
            type="email"
            name="email"
            placeholder="tuemail@email.com"
            onChange={handleChangeInputValue}
          />
          <label
            className="block text-[#350D70] py-2 font-bold mb-2"
            htmlFor="email"
          ></label>
          <textarea
            className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            id="message"
            placeholder="Consulta"
            name="message"
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out cursor-pointer"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailForm;
