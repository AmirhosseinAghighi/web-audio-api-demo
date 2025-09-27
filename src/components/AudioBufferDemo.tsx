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
    <>
      <h1>Audio Buffer Demo Demo</h1>
      <button onClick={play}>play</button>
      <br />
      <Link to="/">Back to Home</Link>
    </>
  );
}

export default AudioBufferDemo;
