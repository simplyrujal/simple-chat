import React from "react";
import { useFormContext, UseFormReturn } from "react-hook-form";
import SubmitButton from "./submit-button";
import { TMessageType } from "/imports/collections/message";
type IData = {
  message: string;
  media: File | Blob | null;
  mediaType: TMessageType;
};

interface IProps {
  onSubmit: (data: IData) => Promise<void>;
  onTyping?: () => void;
  onBlur?: () => void;
}

export type MessageFormRef = UseFormReturn<{ message: string }, any>;

const MessageForm: React.FC<IProps> = ({ onSubmit, onTyping, onBlur }) => {
  const { register, handleSubmit } = useFormContext<IData>();


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2 group">
        <input
          type="text"
          placeholder="Type a message..."
          {...register("message")}
          onChange={(e) => {
            register("message").onChange(e);
            onTyping?.();
          }}
          onBlur={(e) => {
            register("message").onBlur(e);
            onBlur?.();
          }}
          className="input-field w-4/5 rounded-xl border border-gray-600/50 bg-gray-800/40 hover:bg-gray-800/60 group-focus-within:bg-gray-800 transition-all duration-300 focus:shadow-glow"
        />

        <SubmitButton />
      </div>
    </form>
  );
};

export default MessageForm;
