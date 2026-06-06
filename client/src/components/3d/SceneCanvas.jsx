import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Stars, Html } from '@react-three/drei';
import { useStore } from '../../store/store';

const SceneCanvas = ({ children }) => {
  const setMousePosition = useStore(state => state.setMousePosition);

  const handlePointerMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMousePosition(x, y);
  };

  return (
    <div 
      style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}
      className="bg-dark pointer-events-auto"
      onPointerMove={handlePointerMove}
    >
      <Canvas 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        camera={{ position: [0, 0, 10], fov: 50 }} 
        dpr={[1, 2]}
      >
        <color attach="background" args={['#0D1B2A']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Suspense fallback={<Html center className="text-light/50 font-display">Loading 3D Scene...</Html>}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneCanvas;
