import { Meteor } from "meteor/meteor";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useSendMessage } from "../../../hooks/use-messages";
import FileInputs from "./components/file-inputs";
import MediaOutput from "./components/media-output";
import MessageForm from "./components/message-form";
import { TMessageType } from "/imports/collections/message";
import { TRooms } from "/imports/collections/room";

interface IProps {
  room: TRooms;
}

export interface IFormValues {
  message: string;
  media: Blob | null;
  mediaType: TMessageType;
}

const ChatInput: React.FC<IProps> = ({ room }) => {
  const sendMessage = useSendMessage();

  const methods = useForm<IFormValues>({
    defaultValues: {
      message: "",
      media: null,
      mediaType: "text",
    },
  });

  const { reset } = methods;

  const handleMessageSend = async (data: IFormValues) => {
    if (!data.message && !data.media) return;
    const currentUserId = Meteor.userId();

    const names = room.name.split("-");
    const otherUser = names.find((name) => name !== currentUserId);

    try {
      await sendMessage.mutateAsync({
        to: otherUser || "",
        content: { type: data.mediaType, text: data.message },
        roomId: room._id,
      });

      reset({
        message: "",
        media: null,
        mediaType: "text",
      });
    } catch (e) {
      throw new Error("Failed to send message");
    }
  };

  return (
    <div className="p-3 bg-white">
      <FormProvider {...methods}>
        <MediaOutput />
        <MessageForm onSubmit={handleMessageSend} />
        <FileInputs />
      </FormProvider>
    </div>
  );
};

export default ChatInput;
