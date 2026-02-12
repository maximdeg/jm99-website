"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres.*"),
  email: z.string().email("Por favor ingrese un correo electronico valido.*"),
  bodyMessage: z
    .string()
    .nonempty("Por favor complete el mensaje para resolver su consulta.*"),
});

const EmailForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bodyMessage: "",
    },
  });

  const handleSubmitForm = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const response: Response = await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.bodyMessage,
        }),
      });

      const resData = response.json();
      console.log(resData);

      setIsLoading(false);
      alert("Mensaje enviado con exito");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="contact"
      className="w-full overflow-hidden flex justify-center align-center mt-32 px-5 md:px-10"
    >
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="bg-gray-300 opacity-75 w-full md:w-3/5 py-6 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-[#350D70] py-2 font-bold mb-2"
            htmlFor="name"
          >
            Escribinos por cualquier consulta que tengas
          </label>
          <input
            className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            id="name"
            type="name"
            placeholder="Nombre"
            {...register("name")}
          />
          {errors.name?.message && <span>{errors.name?.message}</span>}
          <label
            className="block text-[#350D70] py-2 font-bold mb-2"
            htmlFor="name"
          ></label>
          <input
            className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            id="email"
            type="email"
            {...register("email")}
            placeholder="tuemail@email.com"
          />
          {errors.email?.message && <span>{errors.email?.message}</span>}
          <label
            className="block text-[#350D70] py-2 font-bold mb-2"
            htmlFor="email"
          ></label>
          <textarea
            className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            id="bodyMessage"
            placeholder="Consulta"
            {...register("bodyMessage")}
          />
          {errors.bodyMessage?.message && (
            <span>{errors.bodyMessage?.message}</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 !place-self-end !self-end">
          {isLoading ? (
            <Button
              disabled
              className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out cursor-pointer"
            >
              <Loader2 className="animate-spin" />
              Enviando
            </Button>
          ) : (
            <button
              className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out cursor-pointer"
              type="submit"
            >
              Enviar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmailForm;
