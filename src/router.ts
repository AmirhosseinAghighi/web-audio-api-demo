import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import Index from "./components/Index";
import PianoDemo from "./components/PianoDemo";
import AudioBufferDemo from "./components/AudioBufferDemo";
import GainDemo from "./components/GainDemo";
import OscillatorDemo from "./components/OsillatorDemo";

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
});

const pianoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/piano",
  component: PianoDemo,
});

const audioBufferRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/audioBuffer",
  component: AudioBufferDemo,
});

const gainRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gain",
  component: GainDemo,
});

const oscillatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/oscillator",
  component: OscillatorDemo,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  pianoRoute,
  audioBufferRoute,
  gainRoute,
  oscillatorRoute,
]);

export const router = createRouter({ routeTree });
