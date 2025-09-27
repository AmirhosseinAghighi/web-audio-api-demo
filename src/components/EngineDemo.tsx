import { Link } from "@tanstack/react-router";

function EngineDemo() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg card overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-extrabold text-center mb-4">
            Engine Sound Generator
          </h1>
          <p className="muted text-center mb-6">Demo not implemented yet.</p>

          <div className="flex justify-center">
            <Link to="/" className="btn btn-ghost">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EngineDemo;
