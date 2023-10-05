import React, { FormEvent, useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { IoSend } from "react-icons/io5";

interface Props {
  register: UseFormRegister<FieldValues>;
  setMessage: (message: string) => void;
}

const MessageInput: React.FC<Props> = ({ register, setMessage }) => {
  const [isMessageInputFilled, setIsMessageInputFilled] = useState(false);

  useEffect(() => {
    register("message", { required: true });
  }, [register]);

  const onChangeMessage = (e: FormEvent<HTMLDivElement>) => {
    const message = e.currentTarget.textContent || "";
    setIsMessageInputFilled(!!message);
    setMessage(message);
  };

  return (
    <div className="flex w-screen max-w-full items-end justify-between">
      <div
        contentEditable
        className={`text-white w-full max-w-full break-words bg-gray-800 outline-none px-4 py-2 text-base rounded-md overflow-x-auto`}
        inputMode="text"
        onInput={onChangeMessage}
      />
      {isMessageInputFilled && (
        <button className="bg-gradient-to-r from-pink-500 to-violet-500 px-3 py-3 flex items-center justify-center rounded-full bg-red-950 ml-2 pointer-events-none cursor-pointer">
          <IoSend />
        </button>
      )}
    </div>
  );
};

export default MessageInput;
