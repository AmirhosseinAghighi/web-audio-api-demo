import { useCallback, useRef } from "react";
import { Link } from "@tanstack/react-router";

function GainDemo() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

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

      gainNodeRef.current = audioContext.createGain();
      gainNodeRef.current.gain.value = 0.5; // default gain value
      source.connect(gainNodeRef.current);

      gainNodeRef.current.connect(audioContext.destination);
    } else {
      audioRef.current.pause();
      audioContext.close();
      audioContextRef.current = audioContextRef.current = null;
    }
  }, []);

  const handleGainChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(event.target.value);
      if (!gainNodeRef.current || !audioContextRef.current) return;
      gainNodeRef.current.gain.setTargetAtTime(
        value,
        audioContextRef.current.currentTime,
        0.001
      );
    },
    []
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Gain Demo
          </h1>
          <div className="text-center mb-6">
            <button
              onClick={play}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Play Piano
            </button>
          </div>
          <div className="mb-6">
            <label
              htmlFor="gain"
              className="block text-gray-700 font-semibold mb-2"
            >
              Gain
            </label>
            <input
              id="gain"
              type="range"
              min="0"
              max="10"
              step="0.01"
              defaultValue="0.5"
              className="w-full"
              onChange={handleGainChange}
            />
          </div>
          <div className="text-center">
            <Link
              to="/"
              className="inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GainDemo;
