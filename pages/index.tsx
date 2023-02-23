import NavBar from "@/components/NavBar";
import UploadAudio from "@/components/UploadAudio";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <div className="hero min-h-screen bg-base-300 overflow-hidden ">
        <NavBar />

        <div className="hero-content text-center relative w-full">
          <div className="hidden md:flex absolute -z-10 top-0 -left-32 w-96 h-96 bg-[#6366f1] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="hidden md:flex absolute -z-10 top-0 -right-72 w-96 h-96 bg-[rgb(49,140,165)] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="hidden md:flex absolute -z-10 -bottom-8 left-48 w-96 h-96 bg-[#6366f1] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
          <div className=" relative card-body justify-center items-center">
            <div className="w-full flex justify-center items-center flex-col">
              <h1 className="text-5xl font-bold">Say it, transcribe it, share it</h1>
              <p className="py-6 md:mb-6">Wavscriber simplifies audio transcription, so you can focus on <br /> what you do best.</p>
              <UploadAudio />
              <Toaster />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
