import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';
import { useStore } from '../../store/store';

export const CalendarCube = () => {
  const groupRef = useRef();
  const mousePosition = useStore((state) => state.mousePosition);

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.2;
    groupRef.current.rotation.x += delta * 0.1;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Box args={[2, 2, 2]}>
        <meshStandardMaterial color="#1B2A6B" emissive="#1B2A6B" emissiveIntensity={0.2} wireframe />
      </Box>
      <Box args={[1.9, 1.9, 1.9]}>
        <meshStandardMaterial color="#0D1B2A" />
      </Box>
      <Text position={[0, 0, 1.01]} fontSize={0.8} color="#00C875">
        22
      </Text>
      <Text position={[0, 0, -1.01]} rotation={[0, Math.PI, 0]} fontSize={0.8} color="#FF6B00">
        05
      </Text>
      <Text position={[1.01, 0, 0]} rotation={[0, Math.PI / 2, 0]} fontSize={0.8} color="#F5F7FF">
        12
      </Text>
      <Text position={[-1.01, 0, 0]} rotation={[0, -Math.PI / 2, 0]} fontSize={0.8} color="#3B82F6">
        30
      </Text>
    </group>
  );
};

const EventsScene = () => {
  return <CalendarCube />;
};

export default EventsScene;
