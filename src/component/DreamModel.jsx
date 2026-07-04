import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage } from "@react-three/drei";

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function DreamModel({ modelFileName }) {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Canvas dpr={[1, 2]} shadows>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5}>
            <Model url={`/models/${modelFileName}`} />
          </Stage>
        </Suspense>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
