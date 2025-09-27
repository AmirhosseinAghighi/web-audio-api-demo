import React, { useState, useRef, useEffect } from "react";

const OscillatorDemo = () => {
  const [gain, setGain] = useState(0.5);
  const [freq, setFreq] = useState(440);
  const [type, setType] = useState("sine");
  const audioCtxRef = useRef<AudioContext>(null);
  const oscillatorRef = useRef<OscillatorNode>(null);
  const gainNodeRef = useRef<GainNode>(null);
  const analyserRef = useRef<AnalyserNode>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    audioCtxRef.current = new window.AudioContext();
    oscillatorRef.current = audioCtxRef.current.createOscillator();
    gainNodeRef.current = audioCtxRef.current.createGain();
    analyserRef.current = audioCtxRef.current.createAnalyser();
    oscillatorRef.current.connect(gainNodeRef.current);
    gainNodeRef.current.connect(analyserRef.current);
    analyserRef.current.connect(audioCtxRef.current.destination);
    oscillatorRef.current.frequency.setValueAtTime(
      freq,
      audioCtxRef.current.currentTime
    );
    oscillatorRef.current.type = type as OscillatorType;
    gainNodeRef.current.gain.setValueAtTime(
      gain,
      audioCtxRef.current.currentTime
    );
    analyserRef.current.fftSize = 2048;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!analyserRef.current || !canvasRef.current || !isStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      analyserRef.current!.getByteTimeDomainData(dataArray);

      ctx.fillStyle = "rgb(240, 240, 240)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(0, 123, 255)";
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.stroke();

      if (isStarted) {
        requestAnimationFrame(draw);
      }
    };

    draw();
  }, [isStarted]);

  const start = async () => {
    if (audioCtxRef.current?.state === "suspended") {
      await audioCtxRef.current.resume();
    }
    if (!isStarted) {
      oscillatorRef.current?.start();
      setIsStarted(true);
    }
  };

  const stop = () => {
    if (isStarted) {
      oscillatorRef.current?.stop();
      setIsStarted(false);
    }
  };

  const handleGainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setGain(value);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        value,
        audioCtxRef.current?.currentTime ?? 0
      );
    }
  };

  const handleFreqChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFreq(value);
    if (oscillatorRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(
        value,
        audioCtxRef.current?.currentTime ?? 0
      );
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setType(value);
    if (oscillatorRef.current) {
      oscillatorRef.current.type = value as OscillatorType;
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Oscillator Demo</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gain: {gain}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={gain}
            onChange={handleGainChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Frequency: {freq} Hz
          </label>
          <input
            type="range"
            min="20"
            max="2000"
            step="1"
            value={freq}
            onChange={handleFreqChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Waveform:
          </label>
          <select
            value={type}
            onChange={handleTypeChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="sawtooth">Sawtooth</option>
            <option value="triangle">Triangle</option>
          </select>
        </div>
        <div className="flex space-x-2 justify-center">
          <button
            onClick={start}
            disabled={isStarted}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start
          </button>
          <button
            onClick={stop}
            disabled={!isStarted}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Stop
          </button>
        </div>
        <div className="mt-4">
          <canvas
            ref={canvasRef}
            width="400"
            height="200"
            className="border border-gray-300 rounded-md w-full"
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default OscillatorDemo;
