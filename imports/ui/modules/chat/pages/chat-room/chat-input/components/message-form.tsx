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
}

export type MessageFormRef = UseFormReturn<{ message: string }, any>;

const MessageForm: React.FC<IProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useFormContext<IData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          {...register("message")}
          className="input-field w-4/5"
        />

        <SubmitButton />
      </div>
    </form>
  );
};

export default MessageForm;
