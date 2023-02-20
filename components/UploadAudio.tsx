import axios from 'axios';
import React, { useState } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'

function UploadAudio() {
    const [selectedFile, setSelectedFile] = useState<File | null>();
    const [fileId, setFileId] = useState<string | null>(null)
    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            console.log(event.target.files.item(0))
            setSelectedFile(event.target.files.item(0))
        };
    }

    const handleTranscribeBtnClick: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        try {
            if (selectedFile && selectedFile.type) {
                console.log(selectedFile)
                let formData = new FormData();
                formData.append("file", selectedFile);
                const resp = await axios.post('/api/upload-audio', formData);
                console.log(resp.statusText)
                if (resp.data) {
                    setFileId(resp.data?.message)
                }
                setSelectedFile(null)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="card w-full md:w-96 glass">
                <div className="card-body">
                    <div className="form-control w-full max-w-xs mb-2">
                        <label className="label">
                            {/* <span className="label-text">We&apos;ll let you know when it&apos;s done</span> */}
                            <span className="label-text">Upload your audio here.</span>
                            <span className="label-text-alt">
                                <div className="tooltip" data-tip="We transcribe 30s of audio for free">
                                    <AiOutlineInfoCircle size={22} />
                                </div>
                            </span>
                        </label>
                        {/* <input type="email" placeholder="Email" className="input input-bordered w-full max-w-xs" /> */}
                        <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" name="audioTranscriber" onChange={changeHandler} />
                    </div>
                    {
                        fileId ? (
                            <div className="alert alert-info shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>{fileId}</span>
                                </div>
                            </div>
                        ) : null
                    }
                    <div className="card-actions justify-center mt-4">
                        <button className="btn btn-primary btn-outline" onClick={handleTranscribeBtnClick}>Transcribe</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UploadAudio