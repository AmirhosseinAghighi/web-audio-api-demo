import { Link } from "@tanstack/react-router";

function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl card overflow-hidden">
        <div className="p-8 md:p-12">
          <h1 className="text-4xl hero-title text-center mb-6">
            Web Audio Demos
          </h1>

          <nav>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li>
                <Link
                  to="/piano"
                  className="btn btn-primary w-full text-center"
                >
                  Piano Demo
                </Link>
              </li>
              <li>
                <Link to="/audioBuffer" className="btn btn-ghost w-full">
                  Audio Buffer Demo
                </Link>
              </li>
              <li>
                <Link to="/gain" className="btn btn-ghost w-full">
                  Gain Node Demo
                </Link>
              </li>
              <li>
                <Link to="/oscillator" className="btn btn-ghost w-full">
                  Oscillator Node Demo
                </Link>
              </li>
              <li>
                <Link to="/sonicMessenger" className="btn btn-ghost w-full">
                  UltraSonic Network
                </Link>
              </li>
              <li>
                <Link to="/engine" className="btn btn-ghost w-full">
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
