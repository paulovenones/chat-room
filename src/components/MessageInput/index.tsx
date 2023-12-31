import React, { FormEvent, useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { IoSend } from "react-icons/io5";

interface Props {
  register: UseFormRegister<FieldValues>;
  setMessage: (message: string) => void;
  triggerSendMessage: () => void;
}

const MessageInput: React.FC<Props> = ({
  register,
  setMessage,
  triggerSendMessage,
}) => {
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
        className={`text-white w-full max-w-full break-words bg-gray-800 outline-none px-4 py-2 text-base rounded-md max-h-32 overflow-y-auto`}
        inputMode="text"
        onInput={onChangeMessage}
        data-placeholder="Digite uma mensagem"
        id="message-input"
      />
      {isMessageInputFilled && (
        <button
          type="button"
          onClick={triggerSendMessage}
          className="bg-gradient-to-r from-pink-500 to-violet-500 px-3 py-3 flex items-center justify-center rounded-full ml-2 cursor-pointer"
        >
          <IoSend />
        </button>
      )}
    </div>
  );
};

export default MessageInput;
