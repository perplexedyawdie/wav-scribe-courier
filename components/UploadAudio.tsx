import axios from 'axios';
import React, { useState } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'

function UploadAudio() {
    const [selectedFile, setSelectedFile] = useState<File | null>();

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
                const resp = await axios.post('/api/upload-audio', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                      },
                });
                console.log(resp.statusText)
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
                    <div className="card-actions justify-center mt-4">
                        <button className="btn btn-primary btn-outline" onClick={handleTranscribeBtnClick}>Transcribe</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UploadAudio