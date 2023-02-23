import axios from 'axios';
import React, { useState, useRef } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineInfoCircle } from 'react-icons/ai'

function UploadAudio() {
    const [selectedFile, setSelectedFile] = useState<File | null>();
    const [fileId, setFileId] = useState<string | null>(null)
    const [userEmail, setUserEmail] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            console.log(event.target.files.item(0))
            setSelectedFile(event.target.files.item(0))
        };
    }

    const handleTranscribeBtnClick: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        try {
            if (selectedFile && selectedFile.type && userEmail !== "") {
                setIsLoading(true)
                console.log(selectedFile)
                let formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("userEmail", userEmail);
                const resp = await axios.post('/api/upload-audio', formData);
                console.log(resp.statusText)
                if (resp.data) {
                    setFileId(resp.data?.message)
                }
                setSelectedFile(null)
                setUserEmail("")
                if (inputRef.current) {
                    inputRef.current.value = ""
                }
                toast.success("We're working on it!")
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="card w-full md:w-96 glass">
                <div className="card-body">
                    <div className="form-control w-full max-w-xs mb-2">
                        <label className="label">
                            <span className="label-text">Upload your audio here.</span>
                            <span className="label-text-alt">
                                <div className="tooltip" data-tip="We transcribe 30s of audio for free">
                                    <AiOutlineInfoCircle size={22} />
                                </div>
                            </span>
                        </label>
                        <input ref={inputRef} type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" name="audioTranscriber" onChange={changeHandler} />
                    </div>
                    <div className="form-control w-full max-w-xs mb-2">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="We'll notify you when it's done!"
                            className="input input-bordered w-full max-w-xs"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)} required />
                    </div>
                    <div className="card-actions justify-center mt-4">
                        <button className={isLoading ? "btn btn-primary btn-outline loading" : "btn btn-primary btn-outline"} onClick={handleTranscribeBtnClick} disabled={isLoading}>Transcribe</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UploadAudio