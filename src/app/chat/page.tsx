"use client";

import MessageInput from "@/components/MessageInput";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Chat() {
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm();

  const setMessage = (message: string) => {
    setValue("message", message, { shouldValidate: true });
  };

  useEffect(() => {
    const name = localStorage.getItem("name");

    if (!name) {
      router.push("/");
      return;
    }

    const ws = new WebSocket("ws://localhost:8080/ws");
    ws.onopen = () => {
      console.log("WebSocket successfully connected!");
      ws.send(
        JSON.stringify({
          action: "joining",
          user: name,
        }),
      );
    };

    return () => {
      ws.close();
    };
  }, [router]);

  return (
    <main className="flex flex-col p-2 w-screen h-screen overflow-hidden">
      <div className="flex-grow flex flex-col overflow-y-auto">
        <div>
          <h1>Message 1</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
          <h1>Message 2</h1>
        </div>
      </div>

      <div>
        <MessageInput register={register} setMessage={setMessage} />
      </div>
    </main>
  );
}
