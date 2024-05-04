import React, { useState } from "react";

import { downloadInstagramVideo } from "./api/api";
import "./index.css";

import { CgSpinner } from "react-icons/cg";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

function App() {
    const [videoUrl, setVideoUrl] = useState("");
    const [videoData, setVideoData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleView = async () => {
        if (videoUrl) {
            setIsLoading(true);
            try {
                const data = await downloadInstagramVideo(videoUrl);
                setVideoData(data);
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        }
    };

    const handleDownload = async () => {
        if (videoData && videoData[0]?.link) {
            const videoLink = videoData[0].link;
            window.open(videoLink, "_blank");
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center lg:bg-black sm:bg-slate-900 max-sm:bg-slate-900 md:bg-slate-900">
            <div
                className={
                    videoData && videoData[0]?.link
                        ? "w-[50rem] h-[30rem] max-sm:h-full transition-all duration-400 bg-slate-900 flex flex-col items-center justify-center rounded-xl overflow-hidden"
                        : "w-[40rem] h-[15rem] max-sm:h-full transition-all duration-400 bg-slate-900 flex flex-col items-center justify-center rounded-xl overflow-hidden"
                }
            >
                <div className="flex items-start flex-col">
                    <h1 className="text-xl max-sm:text-lg font-semibold text-slate-400 flex items-center">
                        <span>
                            <FaInstagram size={23} className="mr-2" />
                        </span>
                        Instagram Reel or Post Downloader
                    </h1>
                    <div className="flex max-sm:flex-col items-center mt-5">
                        <input
                            autoFocus
                            type="text"
                            className="w-[25rem] text-slate-300 bg-slate-800 p-4 border-2 border-slate-700 rounded-xl max-sm:w-[20rem] max-sm:mr-0 mr-4 outline-none transition-all duration-300 focus:border-slate-400"
                            placeholder="Reel or Post Url"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                        />
                        <button
                            className="bg-gradient-to-r flex items-center disabled:opacity-50 justify-center  max-sm:mt-4 transition-all duration-300 from-[#833AB4] border-2 border-slate-900 text-white to-[#C13584] max-sm:w-[20rem] w-32 h-14 rounded-xl"
                            onClick={videoData ? handleDownload : handleView}
                            disabled={!videoUrl}
                        >
                            {isLoading && <CgSpinner size={22} className="animate-spin mr-2" />} {videoData ? "Download" : "View"}
                        </button>
                        {videoData && (
                            <button
                                className="flex ml-2 bg-slate-800 hover:bg-slate-800 items-center active:scale-105 justify-center max-sm:mt-3 transition-all duration-300 border-2 border-slate-900 text-white max-sm:w-[20rem] w-32 h-14 rounded-xl"
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
                        videoData[0].type === "jpg" && (
                            <div className="w-full flex flex-col items-center justify-start">
                                <span className="w-full h-[1.5px] bg-slate-800 mt-7 mb-7 rounded-xl"></span>
                                <div className="w-48 h-48 bg-slate-800 rounded-2xl overflow-hidden">
                                    <img src={videoData[0]?.thumb} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        )
                    )}
                    <div className="w-full flex items-center justify-center mt-10">
                        <p
                            onClick={() => window.open("https://github.com/mustafakaracuha", "_blank")}
                            className="text-slate-400 flex items-center justify-center cursor-pointer transition-all duration-300 hover:text-slate-300"
                        >
                            <FaGithub size={22} className="mr-2" />
                            mustafakaracuha
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
