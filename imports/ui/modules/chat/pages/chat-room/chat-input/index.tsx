import { Meteor } from "meteor/meteor";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useSendMessage } from "../../../hooks/use-messages";
import FileInputs from "./components/file-inputs";
import MediaOutput from "./components/media-output";
import MessageForm from "./components/message-form";
import { useMediaUpload } from "./hooks/use-media-upload";
import { TMessageType } from "/imports/collections/message";
import { TRooms } from "/imports/collections/room";

interface IProps {
  room: TRooms;
}

export interface IFormValues {
  message: string;
  media: File | Blob | null;
  mediaType: TMessageType;
}

type TMediaUploadResult = {
  fileId: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileMimeType: string;
};

const ChatInput: React.FC<IProps> = ({ room }) => {
  const sendMessage = useSendMessage();
  const mediaUpload = useMediaUpload();

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

    let fileUrl: string | undefined;
    let fileId: string | undefined;
    let fileName: string | undefined;
    let fileSize: number | undefined;
    let fileMimeType: string | undefined;
    const mediaFile = data.media;

    if (mediaFile) {
      fileName = mediaFile instanceof File ? mediaFile.name : `media.${mediaFile.type.split("/")[1]}`;
      fileSize = mediaFile.size;
      fileMimeType = mediaFile.type;

      try {
        const uploadResult: TMediaUploadResult = await mediaUpload.mutateAsync({
          file: mediaFile,
          fileName: fileName,
          meta: {
            roomId: room._id,
            userId: currentUserId || "",
          },
        });
        fileUrl = uploadResult.fileUrl;
        fileId = uploadResult.fileId;
      } catch (e) {
        console.log(e);
        throw new Error("Failed to upload media");
      }
    }

    try {
      await sendMessage.mutateAsync({
        from: currentUserId || "",
        to: otherUser || "",
        roomId: room._id,
        content: {
          type: data.mediaType,
          text: data.message,
          fileUrl,
          fileId,
          fileName,
          fileSize,
          fileMimeType,
        },
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
