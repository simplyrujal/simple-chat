// imports/api/files/FilesCollection.ts
import { FilesCollection } from "meteor/ostrio:files";

export const MediaCollection = new FilesCollection({
  collectionName: "mediaFiles",
  storagePath: "assets/app/uploads",
  downloadRoute: "/media",
  allowClientCode: true,
  onBeforeUpload(file) {
    const allowedTypes = ["audio", "video", "image"];
    if (allowedTypes.some((type) => file.type.startsWith(type))) {
      return true;
    }
    return "Only audio, video, and image files are allowed!";
  },
  onAfterUpload(file) {
    console.log("File uploaded:", file.name);
  },
});
