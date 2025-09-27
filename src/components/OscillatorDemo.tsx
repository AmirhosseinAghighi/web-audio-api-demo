import React, { useEffect, useRef, useState } from "react";

const OscillatorDemo: React.FC = () => {
  const [gain, setGain] = useState<number>(0.5);
  const [freq, setFreq] = useState<number>(440);
  const [type, setType] = useState<OscillatorType>("sine");
  const [isStarted, setIsStarted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // create audio graph once
    const ctx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    audioCtxRef.current = ctx;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const analyser = ctx.createAnalyser();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gainNode.gain.setValueAtTime(gain, ctx.currentTime);

    osc.connect(gainNode);
    gainNode.connect(analyser);
    analyser.connect(ctx.destination);

    oscillatorRef.current = osc;
    gainNodeRef.current = gainNode;
    analyserRef.current = analyser;

    analyser.fftSize = 2048;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      try {
        osc.disconnect();
      } catch {}
      try {
        gainNode.disconnect();
      } catch {}
      try {
        analyser.disconnect();
      } catch {}
      // do not close audio context on unmount; it's fine to keep it
    };
  }, []);

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        gain,
        audioCtxRef.current.currentTime
      );
    }
  }, [gain]);

  useEffect(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.type = type;
    }
  }, [type]);

  useEffect(() => {
    if (oscillatorRef.current && audioCtxRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(
        freq,
        audioCtxRef.current.currentTime
      );
    }
  }, [freq]);

  const start = async () => {
    if (!audioCtxRef.current) return;
    if (audioCtxRef.current.state === "suspended")
      await audioCtxRef.current.resume();
    if (!oscillatorRef.current) return;

    try {
      oscillatorRef.current.start();
    } catch (e) {
      // already started
    }
    setIsStarted(true);
    renderLoop();
  };

  const stop = () => {
    if (!oscillatorRef.current) return;
    try {
      oscillatorRef.current.stop();
    } catch (e) {
      // already stopped
    }
    // recreate oscillator so it can be started again
    if (audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.connect(gainNodeRef.current!);
      oscillatorRef.current = osc;
    }
    setIsStarted(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const renderLoop = () => {
    const analyser = analyserRef.current;
    const canvas = canvasRef.current;
    if (!analyser || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      analyser.getByteTimeDomainData(dataArray);
      ctx.fillStyle = "rgba(250,250,250,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(59,130,246,0.9)";
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        x += sliceWidth;
      }

      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl card overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-extrabold mb-6 text-center">
            Oscillator Demo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium muted">
                  Gain: {gain}
                </label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={gain}
                  onChange={(e) => setGain(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium muted">
                  Frequency: {freq} Hz
                </label>
                <input
                  type="range"
                  min={20}
                  max={2000}
                  step={1}
                  value={freq}
                  onChange={(e) => setFreq(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium muted">
                  Waveform
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as OscillatorType)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="sine">Sine</option>
                  <option value="square">Square</option>
                  <option value="sawtooth">Sawtooth</option>
                  <option value="triangle">Triangle</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={start}
                  disabled={isStarted}
                  className="btn btn-primary disabled:opacity-60"
                >
                  Start
                </button>
                <button
                  onClick={stop}
                  disabled={!isStarted}
                  className="btn btn-ghost disabled:opacity-60"
                >
                  Stop
                </button>
              </div>
            </div>

            <div>
              <div className="card-plain">
                <canvas ref={canvasRef} width={800} height={300} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OscillatorDemo;
