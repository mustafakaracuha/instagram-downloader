import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import { CgSpinner } from "react-icons/cg";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

import { downloadInstagramVideo } from "./api/api";
import db from "./firabase/firebase.js";
import "./index.css";

function App() {
    const [videoUrl, setVideoUrl] = useState("");
    const [videoData, setVideoData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [downloadCount, setDownloadCount] = useState(0);
    const [isCountLoading, setIsCoundLoading] = useState(false);

    useEffect(() => {
        getVideoViewCount();
    }, []);

    const getVideoViewCount = async () => {
        try {
            setIsCoundLoading(true);
            const docRef = await doc(db, "videoViews", "viewCount");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setDownloadCount(docSnap.data().count);
                setTimeout(() => {
                    setIsCoundLoading(false);
                }, 1000);
            }
        } catch (error) {
            setIsCoundLoading(false);
            console.error("Error getting count:", error);
        }
    };

    const updateVideoViewCount = async (newcount) => {
        try {
            const docRef = await doc(db, "videoViews", "viewCount");
            await updateDoc(docRef, { count: newcount });
            getVideoViewCount();
        } catch (error) {
            console.error("Error updating count:", error);
        }
    };

    const handleView = async (e) => {
        e.preventDefault()
        if (videoUrl) {
            setIsLoading(true);
            try {
                const data = await downloadInstagramVideo(videoUrl);
                if (data.length === 0) {
                    toast.error("api error");
                    setIsLoading(false);
                    setVideoData(null);
                    setVideoUrl("");
                } else {
                    setVideoData(data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("hata");
            }
            setIsLoading(false);
        }
    };

    const handleDownload = async (e) => {
        e.preventDefault()
        if (videoData && videoData[0]?.link) {
            const videoLink = videoData[0].link;
            window.open(videoLink, "_blank");
            setDownloadCount((prevCount) => prevCount + 1);
            updateVideoViewCount(downloadCount + 1);
            toast.success("Downloaded Successfull");
        }
    };

    return (
        <form onSubmit={videoData ? handleDownload : handleView}>
        <div className="w-full h-screen flex flex-col items-center justify-center lg:bg-black sm:bg-slate-900 max-sm:bg-slate-900 md:bg-slate-900">
            <div
                className={
                    videoData && videoData[0]?.link
                        ? "w-[50rem] h-[30rem] max-sm:h-full transition-all duration-400 bg-slate-900 flex flex-col items-center justify-center rounded-xl overflow-hidden"
                        : "w-[40rem] h-[15rem] max-sm:h-full transition-all duration-400 bg-slate-900 flex flex-col items-center justify-center rounded-xl overflow-hidden"
                }
            >
                <div className="flex items-start flex-col">
                    <h1 className="text-xl max-sm:text-[17.5px] font-semibold text-slate-400 flex items-center justify-center">
                        <span>
                            <FaInstagram size={23} className="mr-1 text-white" />
                        </span>
                        <span className="mr-2 text-2xl from-[#8a49a1] via-[#c1558b] to-[#ffc273] bg-gradient-to-r bg-clip-text text-transparent">Instagram</span>Reel or Post Downloader
                    </h1>
                    <div className="flex max-sm:flex-col items-center mt-6">
                        <input
                            autoFocus
                            type="text"
                            className="w-[25rem] text-slate-300 placeholder:text-slate-600 bg-slate-800 p-4  border-2 border-slate-700 rounded-xl max-sm:w-[20rem] max-sm:mr-0 mr-4 outline-none transition-all duration-300 focus:border-slate-400"
                            placeholder="Reel or Post Url"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                        />
                        <button
                            className="bg-gradient-to-r font-semibold flex items-center disabled:opacity-50 disabled:cursor-not-allowed justify-center max-sm:mt-4 transition-all duration-300 bg-[#4f5bd5] text-white  border-2 border-slate-900 max-sm:w-[20rem] w-32 h-[3.8rem] rounded-xl"
                            onClick={videoData ? handleDownload : handleView}
                            disabled={!videoUrl}
                        >
                            {isLoading && <CgSpinner size={22} className="animate-spin mr-2" />} {videoData?.length > 0 ? "Download" : "View"}
                        </button>
                        {videoData?.length > 0 && (
                            <button
                                className="flex ml-2 bg-slate-800 hover:bg-slate-800 items-center active:scale-105 justify-center max-sm:mt-3 transition-all duration-300 border-2 border-slate-900 text-white max-sm:w-[20rem] w-32 h-[3.8rem] rounded-xl"
                                onClick={() => {
                                    setVideoData(null);
                                    setVideoUrl("");
                                }}
                            >
                                Clear
                            </button>
                        )}
                    </div>
                    {videoData && videoData[0] && videoData[0]?.type === "mp4" ? (
                        <div className="w-full flex flex-col items-center justify-center">
                            <span className="w-full h-[1.5px] bg-slate-800 mt-7 mb-7 rounded-xl"></span>
                            <div className="w-48 h-48 max-sm:w-full bg-slate-800 rounded-2xl overflow-hidden">
                                <video autoPlay controls className="w-full h-full object-cover">
                                    <source src={videoData[0]?.link} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    ) : (
                        videoData &&
                        videoData[0]?.type === "jpg" && (
                            <div className="w-full flex flex-col items-center justify-start">
                                <span className="w-full h-[1.5px] bg-slate-800 mt-7 mb-7 rounded-xl"></span>
                                <div className="w-48 h-48 max-sm:w-full bg-slate-800 rounded-2xl overflow-hidden">
                                    <img src={videoData[0]?.thumb} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        )
                    )}
                    <div className="w-full flex items-center justify-start mt-10 transition-all duration-300">
                        {downloadCount !== 0 &&
                            (isCountLoading ? (
                                <CgSpinner size={20} className="animate-spin mr-2 text-slate-400" />
                            ) : (
                                <p className="text-slate-400 flex items-center max-sm:text-sm text-[14px] h-6 justify-center transition-all duration-300">
                                    <FaDownload size={14} className="mr-2" />
                                    Total Download : {downloadCount}
                                </p>
                            ))}
                    </div>
                </div>
            </div>
            <div className="w-full absolute bottom-3 flex items-center justify-center gap-x-4">
                <p
                    onClick={() => window.open("https://github.com/mustafakaracuha", "_blank")}
                    className="text-slate-600 flex items-center max-sm:text-[12px] text-sm justify-center cursor-pointer transition-all duration-300 hover:text-slate-300"
                >
                    <FaGithub size={19} className="mr-2 max-sm:text-[10px]" />
                    mustafakaracuha
                </p>
                <span className="text-slate-600">|</span>
                <p
                    onClick={() => window.open("https://www.linkedin.com/in/mustafakaracuha/", "_blank")}
                    className="text-slate-600 flex items-center max-sm:text-[12px] text-sm justify-center cursor-pointer transition-all duration-300 hover:text-slate-300"
                >
                    <FaLinkedin size={19} className="mr-2" />
                    mustafakaracuha
                </p>
                <span className="text-slate-600">|</span>
                <p className="text-slate-600 flex items-center max-sm:text-[12px] text-sm justify-center cursor-pointer transition-all duration-300 hover:text-slate-300">
                    &copy; {new Date().getFullYear()} Mustafa Karaçuha
                </p>
            </div>
        </div>
        </form  >
    );
}

export default App;
