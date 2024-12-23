import app from "../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage(app, "gs://hotel-management-009.appspot.com");

export default async function uploadMedia(file) {
  if (file == null) {
    return;
  }
  const fileRef = ref(storage, file.name);
  await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(fileRef);

  return downloadURL;
}
