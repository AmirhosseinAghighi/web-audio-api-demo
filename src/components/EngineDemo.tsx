import { Link } from "@tanstack/react-router";

function EngineDemo() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Engine Sound Generator
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Demo not implemented yet.
          </p>
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

export default EngineDemo;
