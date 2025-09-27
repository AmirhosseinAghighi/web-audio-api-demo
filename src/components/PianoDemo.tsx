import { useCallback, useRef } from "react";
import { Link } from "@tanstack/react-router";

function PianoDemo() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const play = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const { current: audioContext } = audioContextRef;
    if (!audioRef.current) {
      audioRef.current = document.createElement("audio");
      audioRef.current.src = "/piano.mp3";
      audioRef.current.play();

      const source = audioContext.createMediaElementSource(audioRef.current);

      source.connect(audioContext.destination);
    } else {
      audioRef.current.pause();
      audioContext.close();
      audioContextRef.current = audioContextRef.current = null;
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl card overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-extrabold text-center mb-6">
            Piano Demo
          </h1>

          <div className="flex flex-col items-center gap-4 mb-6">
            <button onClick={play} className="btn btn-primary">
              Play Piano
            </button>
            <Link to="/" className="btn btn-ghost">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PianoDemo;
