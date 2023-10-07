import { IMessage } from "@/app/chat/page";
import React from "react";

interface Props {
  isOwner: boolean;
  message: IMessage;
}

const Message: React.FC<Props> = ({ message, isOwner }) => {
  return (
    <div
      className={`flex flex-col text-white mt-2 ${
        isOwner ? "items-end" : "items-start"
      }`}
    >
      {!isOwner && (
        <h3 className="text-sm mb-1 w-fit text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          {message.author.name}
        </h3>
      )}
      <div
        className={`w-fit max-w-4/5 py-1 px-2 rounded-md ${
          isOwner ? "bg-pink-500" : "bg-violet-500"
        }`}
      >
        <p className="text-base">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
