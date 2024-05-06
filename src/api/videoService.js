// src/services/videoService.js dosyası
import { firestore } from "../firabase/firebase";

const videoCollection = firestore.collection("videoViews");

export const increaseViewCount = async (videoId) => {
    const videoDoc = videoCollection.doc(videoId);
    const videoSnapshot = await videoDoc.get();
    const currentViews = videoSnapshot.exists ? videoSnapshot.data().views : 0;
    await videoDoc.set({ views: currentViews + 1 }, { merge: true });
};

export const getViewCount = async (videoId) => {
    const videoDoc = videoCollection.doc(videoId);
    const videoSnapshot = await videoDoc.get();
    return videoSnapshot.exists ? videoSnapshot.data().views : 0;
};
