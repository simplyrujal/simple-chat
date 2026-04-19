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
      <div className="flex gap-2">
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
          className="input-field w-4/5"
        />

        <SubmitButton />
      </div>
    </form>
  );
};

export default MessageForm;
