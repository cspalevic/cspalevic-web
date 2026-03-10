import WebGPUEarth from "@/components/web-gpu-earth";

export default function HomePage() {
  return (
    <div className="relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 md:left-1/2 md:transform md:-translate-x-1/2 transform-none w-full px-4 md:w-auto md:px-0 z-10 flex flex-col items-center justify-center">
        <div className="space-y-3 w-full text-left">
          <h1 className="text-xl font-bold">Welcome</h1>
          <p className="text-secondary-foreground text-base">
            I&apos;m Charlie Spalevic. I&apos;m an engineer and a problem-solver
            with an endlessly curious mind trying to decode how the world works.
          </p>
        </div>
      </div>
      <WebGPUEarth />
    </div>
  );
}
