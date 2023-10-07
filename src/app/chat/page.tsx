"use client";

import Message from "@/components/Message";
import MessageInput from "@/components/MessageInput";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface IAuthor {
  name: string;
  id: string;
}

export interface IMessage {
  text: string;
  date: string;
  author: IAuthor;
}

export default function Chat() {
  const wsRef = useRef<WebSocket | null>(null);

  const router = useRouter();

  const [messageHistory, setMessageHistory] = useState<IMessage[]>([]);
  const [user, setUser] = useState<IAuthor | null>(null);

  const { reset, register, handleSubmit, setValue } = useForm();

  const setMessage = (message: string) => {
    setValue("message", message, { shouldValidate: true });
  };

  const storeNewMessage = (message: IMessage) => {
    setMessageHistory((prevMessageHistory) => [...prevMessageHistory, message]);
    localStorage.setItem("message_history", JSON.stringify(messageHistory));
  };

  const onSendMessage = (values: FieldValues) => {
    const newMessage: IMessage = {
      text: values.message,
      date: new Date().toISOString(),
      author: user!,
    };

    storeNewMessage(newMessage);

    wsRef.current?.send(JSON.stringify(newMessage));
  };

  const triggerSendMessage = () => {
    const messageInput = document.getElementById("message-input");
    if (messageInput) {
      messageInput.textContent = "";
    }

    handleSubmit(onSendMessage)();
    reset();
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/");
      return;
    }

    setUser(JSON.parse(storedUser));

    const previousMessages = localStorage.getItem("message_history");
    console.log({ previousMessages });

    if (previousMessages && previousMessages.length) {
      setMessageHistory(JSON.parse(previousMessages));
    }

    const ws = new WebSocket("ws://localhost:8080/ws");

    ws.onopen = () => {
      console.log("WebSocket successfully connected!");
    };

    ws.onmessage = (event) => {
      const message: IMessage = JSON.parse(event.data);
      if (message.author.id === JSON.parse(storedUser).id) {
        return;
      }

      storeNewMessage(message);
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, [router]);

  return (
    <main className="flex flex-col w-screen h-full overscroll-none">
      <div className="text-white pb-4 pt-2 px-2 flex-grow flex-shrink overflow-y-auto">
        <div>
          {messageHistory.map((message, index) => (
            <Message
              isOwner={message.author.id === user?.id}
              message={message}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="bg-gray-700 p-2">
        <MessageInput
          triggerSendMessage={triggerSendMessage}
          register={register}
          setMessage={setMessage}
        />
      </div>
    </main>
  );
}
