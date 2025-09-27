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
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-2xl card overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-extrabold mb-6 text-center">Oscillator Demo</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium muted">Gain: {gain}</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={gain}
                      onChange={handleGainChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium muted">Frequency: {freq} Hz</label>
                    <input
                      type="range"
                      min="20"
                      max="2000"
                      step="1"
                      value={freq}
                      onChange={handleFreqChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium muted">Waveform</label>
                    <select
                      value={type}
                      onChange={handleTypeChange}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="sine">Sine</option>
                      <option value="square">Square</option>
                      <option value="sawtooth">Sawtooth</option>
                      <option value="triangle">Triangle</option>
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={start} disabled={isStarted} className="btn btn-primary disabled:opacity-60">Start</button>
                    <button onClick={stop} disabled={!isStarted} className="btn btn-ghost disabled:opacity-60">Stop</button>
                  </div>
                </div>

                <div>
                  <div className="card-plain">
                    <canvas ref={canvasRef} width={800} height={300}></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
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
