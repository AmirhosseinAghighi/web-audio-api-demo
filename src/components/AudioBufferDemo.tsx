import { useCallback, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";

function AudioBufferDemo() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    async function fetchAudio() {
      if (!audioContextRef.current) return;
      const response = await fetch("/chime.mp3");
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(
        arrayBuffer
      );
      audioBufferRef.current = audioBuffer;
    }
    fetchAudio();
  }, []);

  const play = useCallback(async () => {
    if (!audioContextRef.current) return;

    // for Edge cases and Safari (edge cases such as switching tabs or permission stuff or ...)
    await audioContextRef.current.resume();

    const { current: audioContext } = audioContextRef;
    if (audioBufferRef.current) {
      // creating new audio buffer each time
      const source = audioContext.createBufferSource();
      source.connect(audioContext.destination);
      source.buffer = audioBufferRef.current;

      source.start(0);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg card overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-extrabold mb-4 text-center">
            Audio Buffer Demo
          </h1>
          <p className="muted text-center mb-6">
            Plays a short chime loaded into an AudioBuffer.
          </p>

          <div className="flex justify-center gap-4">
            <button onClick={play} className="btn btn-primary">
              Play
            </button>
            <Link to="/" className="btn btn-ghost">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioBufferDemo;
