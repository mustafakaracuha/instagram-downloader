import axios from "axios";

const api = axios.create({
    baseURL: "https://instagram-post-and-reels-downloader.p.rapidapi.com",
    headers: {
        "X-RapidAPI-Key": "5a828f49a6mshda9a62005aa0a5bp1da125jsn38899f4de6b7",
        "X-RapidAPI-Host": "instagram-post-and-reels-downloader.p.rapidapi.com",
    },
});

export const downloadInstagramVideo = async (url) => {
    try {
        const response = await api.get("https://instagram-post-and-reels-downloader.p.rapidapi.com/", {
            params: {
                url: url,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
