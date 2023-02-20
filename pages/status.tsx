import NavBar from '@/components/NavBar'
import axios from 'axios'
import React, { useState } from 'react'

function Status() {
    const [scribe, setScribe] = useState<string>("")
    const [transcript, setTranscript] = useState<string>("")

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        if (scribe) {
            const resp = await axios.post("/api/get-data", {
                id: scribe
            })
            if (resp.data) {
                setTranscript(resp.data?.queryResult)
            }
        }
    }
    return (
        <div className="hero min-h-screen bg-base-300 overflow-hidden ">
            <NavBar />

            <div className="hero-content text-center relative w-full">
                <div className="hidden md:flex absolute -z-10 top-0 -left-32 w-96 h-96 bg-[#6366f1] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
                <div className="hidden md:flex absolute -z-10 top-0 -right-72 w-96 h-96 bg-[rgb(49,140,165)] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
                <div className="hidden md:flex absolute -z-10 -bottom-8 left-48 w-96 h-96 bg-[#6366f1] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
                <div className=" relative card-body justify-center items-center">
                    <div className="w-full flex justify-center items-center flex-col">
                        <h1 className="text-5xl font-bold">Say it, transcribe it, share it</h1>
                        <p className="py-6 md:mb-6">Check if your transcription is ready below!</p>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Enter your file Id</span>
                            </label>
                            <input type="text" placeholder="File ID here" value={scribe} onChange={(e) => setScribe(e.target.value)} className="input input-bordered w-full max-w-xs" />
                        </div>
                        <button onClick={handleClick} className="btn btn-accent mt-8">Check</button>
                        <textarea className="textarea textarea-primary mt-4 w-full" value={transcript} onChange={(e) => setScribe(e.target.value)} placeholder="Your transcription"></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Status