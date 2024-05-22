import firebase_app from "../config";
import { getFirestore, doc, setDoc, DocumentData } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function addData(
  collection: string,
  id: string,
  data: DocumentData
) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, collection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
