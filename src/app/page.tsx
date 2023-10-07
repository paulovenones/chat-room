"use client";

import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

export default function Home() {
  const router = useRouter();

  const handleFormSumbit = (values: FieldValues) => {
    if(!values.name) {
      return
    }
    const user = {
      name: values.name,
      id: Math.random().toString(36).substring(2, 10),
    };

    localStorage.setItem("user", JSON.stringify(user));
    router.push("/chat");
  };

  const { register, handleSubmit } = useForm();

  return (
    <main className="w-screen h-full flex flex-col items-center px-8 pb-4 pt-32 text-center overflow-hidden">
      <h1 className="font-normal text-slate-200 text-4xl">
        Seja bem-vindo ao{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          PauloZap!{" "}
        </span>
        Para começar, insira seu nome abaixo:
      </h1>
      <form
        onSubmit={handleSubmit(handleFormSumbit)}
        className="flex flex-col w-full"
      >
        <input
          type="text"
          placeholder="Insira seu nome"
          className="outline-none bg-slate-200 text-slate-950 px-4 py-4 text-xl mt-8 rounded-lg"
          {...register("name")}
        />
        <button
          type="submit"
          className="text-slate-200 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg text-xl p-4 mt-4"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
