import { Link } from "@tanstack/react-router";

function Index() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Web Audio Demos
          </h1>
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/piano"
                  className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Piano Demo
                </Link>
              </li>
              <li>
                <Link
                  to="/audioBuffer"
                  className="block w-full text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Audio Buffer Demo
                </Link>
              </li>
              <li>
                <Link
                  to="/gain"
                  className="block w-full text-center bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Gain Node Demo
                </Link>
              </li>
              <li>
                <Link
                  to="/oscillator"
                  className="block w-full text-center bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Oscillator Node Demo
                </Link>
              </li>
              <li>
                <Link
                  to="/engine"
                  className="block w-full text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Engine Sound Generator
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Index;
