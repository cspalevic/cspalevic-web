"use client";

import { useEffect, useRef, useState } from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  bumpMap,
  cameraPosition,
  color,
  max,
  mix,
  normalize,
  normalWorldGeometry,
  output,
  positionWorld,
  step,
  texture,
  uniform,
  uv,
  vec3,
  vec4,
} from "three/tsl";
import * as THREE from "three/webgpu";

function latLngTo3D(
  lat: number,
  lng: number,
  radius: number = 1.05
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

export default function WebGPUEarth() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const userPinpointRef = useRef<THREE.Mesh | null>(null);
  const flashUniformRef = useRef<THREE.UniformNode<number> | null>(null);
  const rendererRef = useRef<THREE.WebGPURenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const clockRef = useRef<THREE.Clock | null>(null);

  function animate() {
    if (
      !rendererRef.current ||
      !sceneRef.current ||
      !cameraRef.current ||
      !clockRef.current
    )
      return;

    // Animate pin flashing if it exists
    if (flashUniformRef.current) {
      const time = clockRef.current.getElapsedTime();
      const flashIntensity = (Math.sin(time * 0.8) + 1) * 0.5; // Slow flash from 0 to 1

      flashUniformRef.current.value = flashIntensity;
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }

  useEffect(() => {
    if (!containerRef.current) return;

    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGPURenderer;
    let globe: THREE.Mesh;
    let clock: THREE.Clock;
    let controls: OrbitControls;

    async function init() {
      const container = containerRef.current;
      if (!container) return;

      try {
        clock = new THREE.Clock();
        clockRef.current = clock;

        camera = new THREE.PerspectiveCamera(
          25,
          window.innerWidth / window.innerHeight,
          0.1,
          100
        );
        camera.position.set(4.5, 2, 3);
        cameraRef.current = camera;

        scene = new THREE.Scene();
        sceneRef.current = scene;

        const sun = new THREE.DirectionalLight("#ffffff", 2);
        sun.position.set(0, 0, 3);
        scene.add(sun);

        const atmosphereDayColor = uniform(color("#4db2ff"));
        const atmosphereTwilightColor = uniform(color("#5f3d2b"));
        const roughnessLow = uniform(0.25);
        const roughnessHigh = uniform(0.35);

        const textureLoader = new THREE.TextureLoader();

        const dayTexture = textureLoader.load("/earth_day_4096.jpg");
        dayTexture.colorSpace = THREE.SRGBColorSpace;
        dayTexture.anisotropy = 8;

        const nightTexture = textureLoader.load("earth_night_4096.jpg");
        nightTexture.colorSpace = THREE.SRGBColorSpace;
        nightTexture.anisotropy = 8;

        const bumpRoughnessCloudsTexture = textureLoader.load(
          "earth_bump_roughness_clouds_4096.jpg"
        );
        bumpRoughnessCloudsTexture.anisotropy = 8;

        const viewDirection = positionWorld.sub(cameraPosition).normalize();
        const fresnel = viewDirection
          .dot(normalWorldGeometry)
          .abs()
          .oneMinus()
          .toVar();

        const sunOrientation = normalWorldGeometry
          .dot(normalize(sun.position))
          .toVar();

        const atmosphereColor = mix(
          atmosphereTwilightColor,
          atmosphereDayColor,
          sunOrientation.smoothstep(-0.25, 0.75)
        );

        const globeMaterial = new THREE.MeshStandardNodeMaterial();
        const cloudsStrength = texture(
          bumpRoughnessCloudsTexture,
          uv()
        ).b.smoothstep(0.2, 1);
        globeMaterial.colorNode = mix(
          texture(dayTexture),
          vec3(1),
          cloudsStrength.mul(2)
        );

        const roughness = max(
          texture(bumpRoughnessCloudsTexture).g,
          step(0.01, cloudsStrength)
        );
        globeMaterial.roughnessNode = roughness.remap(
          0,
          1,
          roughnessLow,
          roughnessHigh
        );

        const night = texture(nightTexture);
        const dayStrength = sunOrientation.smoothstep(-0.25, 0.5);

        const atmosphereDayStrength = sunOrientation.smoothstep(-0.5, 1);
        const atmosphereMix = atmosphereDayStrength
          .mul(fresnel.pow(2))
          .clamp(0, 1);

        let finalOutput = mix(night.rb, output.rgb, dayStrength);
        finalOutput = mix(finalOutput, atmosphereColor, atmosphereMix);

        globeMaterial.outputNode = vec4(finalOutput, output.a);

        const bumpElevation = max(
          texture(bumpRoughnessCloudsTexture).r,
          cloudsStrength
        );
        globeMaterial.normalNode = bumpMap(bumpElevation);

        const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
        globe = new THREE.Mesh(sphereGeometry, globeMaterial);
        scene.add(globe);

        const atmosphereMaterial = new THREE.MeshBasicNodeMaterial({
          side: THREE.BackSide,
          transparent: true,
        });
        const alphaF = fresnel.remap(0.73, 1, 1, 0).pow(3);
        const alpha = alphaF.mul(sunOrientation.smoothstep(-0.5, 1));
        atmosphereMaterial.outputNode = vec4(atmosphereColor, alpha);

        const atmosphere = new THREE.Mesh(sphereGeometry, atmosphereMaterial);
        atmosphere.scale.setScalar(1.04);
        scene.add(atmosphere);

        renderer = new THREE.WebGPURenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setAnimationLoop(() => animate());
        rendererRef.current = renderer;
        container.appendChild(renderer.domElement);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.minDistance = 0.1;
        controls.maxDistance = 50;

        window.addEventListener("resize", onWindowResize);
      } catch (err) {
        console.error("Failed to initialize Earth:", err);
        setError(
          "Failed to initialize Earth animation. Please check if all textures are loaded correctly."
        );
        throw err;
      }
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    init();

    return () => {
      // Cleanup function
      if (userPinpointRef.current && sceneRef.current) {
        sceneRef.current.remove(userPinpointRef.current);
      }
      renderer?.dispose();
    };
  }, []);

  // Effect to update pinpoint when coordinates change
  useEffect(() => {
    if (!sceneRef.current) return;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          // Create simple red dot
          const dotGeometry = new THREE.SphereGeometry(0.015, 16, 16);
          const dotMaterial = new THREE.MeshBasicNodeMaterial({
            transparent: true,
          });

          // Create uniform for flash animation
          const flashUniform = uniform(1.0);
          flashUniformRef.current = flashUniform;

          // Animate from bright red to dim red with opacity
          const dimColor = color("#cc0000");
          const brightColor = color("#ff3333");
          dotMaterial.colorNode = mix(dimColor, brightColor, flashUniform);
          dotMaterial.opacityNode = flashUniform.mul(0.6).add(0.4); // Opacity from 0.4 to 1.0

          const dot = new THREE.Mesh(dotGeometry, dotMaterial);

          userPinpointRef.current = dot;
          const position = latLngTo3D(coords.latitude, coords.longitude);
          userPinpointRef.current.position.copy(position);

          sceneRef.current?.add(userPinpointRef.current);
        },
        (error) => {
          console.warn("Geolocation error:", error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    }
  }, []);

  // best effort
  if (error) return null;

  return (
    <div
      ref={containerRef}
      className="w-full h-screen relative bg-black overflow-hidden"
      style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
    />
  );
}
