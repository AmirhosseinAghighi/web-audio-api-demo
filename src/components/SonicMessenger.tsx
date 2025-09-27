import React, { useEffect, useState } from "react";
import "../lib/build/sonicnet.js";

const SonicMessenger: React.FC = () => {
  const SonicNet = (window as any).SonicNet;
  const [server, setServer] = useState<InstanceType<
    typeof SonicNet.SonicServer
  > | null>(null);
  const [socket, setSocket] = useState<InstanceType<
    typeof SonicNet.SonicSocket
  > | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [messageToSend, setMessageToSend] = useState<string>("hello world");
  const [alphabet, setAlphabet] = useState<string>(
    "\n abcdefghijklmnopqrstuvwxyz0123456789,.!?@*"
  );
  const [audible, setAudible] = useState<boolean>(false);

  useEffect(() => {
    // Initialize receiver
    const srv = new SonicNet.SonicServer({
      debug: true,
      alphabet,
      freqMin: audible ? 1000 : 18500,
      freqMax: audible ? 2000 : 19500,
    });
    srv.on("message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });
    srv.start();
    setServer(srv);

    // Initialize sender
    const sock = new SonicNet.SonicSocket({
      alphabet,
      freqMin: audible ? 1000 : 18500,
      freqMax: audible ? 2000 : 19500,
    });
    setSocket(sock);

    return () => {
      srv.stop();
    };
  }, [alphabet, audible]); // eslint-disable-line react-hooks/exhaustive-deps

  const sendMessage = () => {
    if (socket && messageToSend.trim()) {
      socket.send(messageToSend.trim(), () => {
        console.log("Message sent!");
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">🔊 Sonic Messenger</h1>
      <div className="mb-4 w-full max-w-md">
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="audible"
            checked={audible}
            onChange={(e) => setAudible(e.target.checked)}
            className="mr-2"
          />
          <label
            htmlFor="audible"
            className="text-sm font-medium text-gray-700"
          >
            Make frequencies audible
          </label>
        </div>
        <input
          type="text"
          value={alphabet}
          onChange={(e) => setAlphabet(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-xl shadow-lg mb-2"
          placeholder="Alphabet"
        />
        <input
          type="text"
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-xl shadow-lg mb-2"
          placeholder="Enter message"
        />
        <button
          onClick={sendMessage}
          className="w-full px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg"
        >
          Send Message
        </button>
      </div>

      <div className="mt-6 w-full max-w-md bg-gray-800 rounded-xl p-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-2">📥 Received Messages:</h2>
        {messages.length === 0 ? (
          <p className="text-gray-400">No messages yet...</p>
        ) : (
          <ul className="space-y-2">
            {messages.map((msg, idx) => (
              <li
                key={idx}
                className="p-2 bg-gray-700 rounded-md text-green-300"
              >
                {msg}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SonicMessenger;
