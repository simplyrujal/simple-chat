import { useMutation } from "@tanstack/react-query";
import { MediaCollection } from "/imports/collections/media";

type TMediaUploadParams = {
  file: File | Blob;
  fileName: string;
  meta?: {
    roomId: string;
    userId: string;
  };
};

type TMediaUploadResult = {
  fileId: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileMimeType: string;
};

const createFileFromBlob = (blob: Blob, fileName: string): File => {
  return new File([blob], fileName, { type: blob.type });
};

export const useMediaUpload = () =>
  useMutation<TMediaUploadResult, Error, TMediaUploadParams>({
    mutationFn: (data: TMediaUploadParams) => {
      const file = data.file instanceof Blob
        ? createFileFromBlob(data.file, data.fileName)
        : data.file;

      return new Promise((resolve, reject) => {
        const uploadInstance: any = MediaCollection.insert(
          {
            file,
            fileName: data.fileName,
            meta: data.meta || {},
          },
          false,
        );

        uploadInstance.on("end", (error: any, fileObj: any) => {
          if (error) {
            console.error("Media upload error:", error);
            reject(error);
          } else {
            // Find the file in collection to get the proper reference
            const uploadedFile: any = MediaCollection.findOne(fileObj._id);
            if (uploadedFile) {
              resolve({
                fileId: uploadedFile._id,
                fileUrl: uploadedFile.link(),
                fileName: uploadedFile.name,
                fileSize: uploadedFile.size,
                fileMimeType: uploadedFile.type,
              });
            } else {
              resolve({
                fileId: fileObj._id,
                fileUrl: `/media/${fileObj._id}`,
                fileName: fileObj.name,
                fileSize: fileObj.size,
                fileMimeType: fileObj.type,
              });
            }
          }
        });

        uploadInstance.start();
      });
    },
  });
