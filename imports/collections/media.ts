// imports/api/files/FilesCollection.ts
import { FilesCollection } from "meteor/ostrio:files";

export const MediaCollection = new FilesCollection({
  collectionName: "mediaFiles",
  storagePath: "assets/app/uploads", // server-side storage path
  allowClientCode: false,
  onBeforeUpload(file) {
    const allowedTypes = [
      "audio/mp3",
      "audio/mpeg",
      "audio/ogg",
      "audio/wav",
      "video/mp4",
      "video/webm",
      "video/ogg",
      "image/jpeg",
      "image/png",
      "image/gif",
    ];
    if (allowedTypes.includes(file.type)) {
      return true;
    }
    return "Only audio, video, and image files are allowed!";
  },
  onAfterUpload(file) {
    console.log("File uploaded:", file.name);
  },
});
