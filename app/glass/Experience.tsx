
"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import * as THREE from "three";

type ShaderSources = {
  vertex: string;
  fragment: string;
  noise: string;
};

const PALETTES: Record<
  string,
  [
    [number, number, number],
    [number, number, number],
    [number, number, number],
    [number, number, number],
    [number, number, number]
  ]
> = {
  "Neon Flux": [
    [0.02, 0.2, 0.75],
    [0.8, 0.05, 0.55],
    [0.95, 0.1, 0.15],
    [0.97, 0.48, 0.08],
    [0.2, 0.65, 0.88],
  ],
  Sunset: [
    [0.95, 0.25, 0.05],
    [0.85, 0.08, 0.35],
    [1.0, 0.6, 0.0],
    [0.55, 0.05, 0.5],
    [1.0, 0.85, 0.2],
  ],
  Aurora: [
    [0.0, 0.75, 0.45],
    [0.05, 0.45, 0.95],
    [0.55, 0.05, 0.85],
    [0.0, 0.9, 0.7],
    [0.3, 0.0, 0.65],
  ],
};

// Fixed production settings.
// These preserve the previous Flow-like / Neon Flux appearance.
const GLASS_SETTINGS = {
  palette: "Neon Flux",
  noiseScaleX: 0.35,
  noiseScaleY: 0.55,
  warpStrength: 0.4,
  grainStrength: 0.5,
  fluteWidth: 70,
  fluteStrength: 140,
  patternBrightness: 0.9,
  warpSpeed: 0.12,
  algo: "Algo2",
} as const;

export default function Experience({
  shaders,
}: {
  shaders: ShaderSources;
}) {
  const { size, gl, camera } = useThree();

  const elapsedTime = useRef(0);

  const {
    palette,
    noiseScaleX,
    noiseScaleY,
    warpStrength,
    grainStrength,
    fluteWidth,
    fluteStrength,
    patternBrightness,
    warpSpeed,
    algo,
  } = GLASS_SETTINGS;

  const grainTexture = useLoader(
    THREE.TextureLoader,
    "/textures/film_grain_contrasted.jpg"
  );

  const aspect = size.width / size.height;

  // Keep the orthographic camera fitted to the fullscreen plane.
  useEffect(() => {
    const cam = camera as THREE.OrthographicCamera;

    cam.left = -aspect;
    cam.right = aspect;
    cam.top = 1;
    cam.bottom = -1;
    cam.updateProjectionMatrix();
  }, [camera, aspect]);

  // Original film grain texture settings.
  useEffect(() => {
    grainTexture.wrapS = THREE.RepeatWrapping;
    grainTexture.wrapT = THREE.RepeatWrapping;
    grainTexture.minFilter = THREE.LinearFilter;
    grainTexture.magFilter = THREE.LinearFilter;
    grainTexture.generateMipmaps = false;
    grainTexture.needsUpdate = true;
  }, [grainTexture]);

  // Noise framebuffer.
  const noiseTarget = useMemo(() => {
    const target = new THREE.WebGLRenderTarget(256, 256, {
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    });

    target.texture.generateMipmaps = false;
    target.texture.wrapS = THREE.MirroredRepeatWrapping;
    target.texture.wrapT = THREE.MirroredRepeatWrapping;

    return target;
  }, []);

  // Uniforms required by the original vertex and noise shaders.
  const noiseUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uNoiseScaleX: { value: noiseScaleX },
      uNoiseScaleY: { value: noiseScaleY },
      uWarpSpeed: { value: warpSpeed },
      uResolution: {
        value: new THREE.Vector2(size.width, size.height),
      },
      uGrainTextureSize: {
        value: new THREE.Vector2(
          grainTexture.image.width,
          grainTexture.image.height
        ),
      },
      uPixelRatio: { value: gl.getPixelRatio() },
    }),
    [grainTexture, gl, size.width, size.height, noiseScaleX, noiseScaleY, warpSpeed]
  );

  // Separate scene used to render the animated noise texture.
  const noisePass = useMemo(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
      -1,
      1,
      1,
      -1,
      0.1,
      10
    );

    camera.position.z = 1;

    const material = new THREE.ShaderMaterial({
      vertexShader: shaders.vertex,
      fragmentShader: shaders.noise,
      uniforms: noiseUniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    return {
      scene,
      camera,
      material,
      geometry,
    };
  }, [shaders, noiseUniforms]);

  // Main glass shader uniforms.
  const uniforms = useMemo(
    () => ({
      uPixelRatio: { value: gl.getPixelRatio() },
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(size.width, size.height),
      },
      uGrainTextureSize: {
        value: new THREE.Vector2(
          grainTexture.image.width,
          grainTexture.image.height
        ),
      },
      uWarpStrength: { value: warpStrength },
      uNoiseMap: { value: noiseTarget.texture },
      uGrainTexture: { value: grainTexture },
      uGrainStrength: { value: grainStrength },
      uFluteWidth: { value: fluteWidth },
      uFluteStrength: { value: fluteStrength },
      uToneMapExposure: { value: patternBrightness },
      uC1: {
        value: new THREE.Vector3(...PALETTES[palette][0]),
      },
      uC2: {
        value: new THREE.Vector3(...PALETTES[palette][1]),
      },
      uC3: {
        value: new THREE.Vector3(...PALETTES[palette][2]),
      },
      uC4: {
        value: new THREE.Vector3(...PALETTES[palette][3]),
      },
      uC5: {
        value: new THREE.Vector3(...PALETTES[palette][4]),
      },
      uAlgo: { value: 1 },
    }),
    [
      grainTexture,
      noiseTarget,
      gl,
      size.width,
      size.height,
      palette,
      warpStrength,
      grainStrength,
      fluteWidth,
      fluteStrength,
      patternBrightness,
    ]
  );

  // Animate both passes using the same elapsed time.
  useFrame((_, delta) => {
    elapsedTime.current += delta;
    const time = elapsedTime.current;

    // Update noise pass.
    noiseUniforms.uTime.value = time;
    noiseUniforms.uNoiseScaleX.value = noiseScaleX;
    noiseUniforms.uNoiseScaleY.value = noiseScaleY;
    noiseUniforms.uWarpSpeed.value = warpSpeed;

    noiseUniforms.uResolution.value.set(size.width, size.height);

    noiseUniforms.uGrainTextureSize.value.set(
      grainTexture.image.width,
      grainTexture.image.height
    );

    noiseUniforms.uPixelRatio.value = gl.getPixelRatio();

    // Render noise into the framebuffer.
    gl.setRenderTarget(noiseTarget);
    gl.clear();
    gl.render(noisePass.scene, noisePass.camera);
    gl.setRenderTarget(null);

    // Update main glass shader.
    uniforms.uTime.value = time;
    uniforms.uResolution.value.set(size.width, size.height);
    uniforms.uPixelRatio.value = gl.getPixelRatio();

    uniforms.uGrainTextureSize.value.set(
      grainTexture.image.width,
      grainTexture.image.height
    );

    uniforms.uWarpStrength.value = warpStrength;
    uniforms.uGrainStrength.value = grainStrength;
    uniforms.uFluteWidth.value = fluteWidth;
    uniforms.uFluteStrength.value = fluteStrength;
    uniforms.uToneMapExposure.value = patternBrightness;

    const selectedPalette = PALETTES[palette];

    uniforms.uC1.value.set(...selectedPalette[0]);
    uniforms.uC2.value.set(...selectedPalette[1]);
    uniforms.uC3.value.set(...selectedPalette[2]);
    uniforms.uC4.value.set(...selectedPalette[3]);
    uniforms.uC5.value.set(...selectedPalette[4]);

    uniforms.uAlgo.value = algo === "Algo1" ? 0 : 1;
  });

  // Dispose of the resources created for the noise pass.
  useEffect(() => {
    return () => {
      noiseTarget.dispose();
      noisePass.material.dispose();
      noisePass.geometry.dispose();
    };
  }, [noiseTarget, noisePass]);

  return (
    <mesh scale={[aspect, 1, 1]}>
      <planeGeometry args={[2, 2]} />

      <shaderMaterial
        vertexShader={shaders.vertex}
        fragmentShader={shaders.fragment}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
        toneMapped={false}
      />
    </mesh>
  );
}
