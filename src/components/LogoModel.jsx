import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function LogoModel(props) {
  const { nodes } = useGLTF('/logo.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.path1.geometry}
        position={[0.014, -0.022, -0.003]}
        rotation={[1.6, 0.1, -1.4]}
      >
        <meshPhysicalMaterial
          metalness={1}          
          roughness={0.2}        
          clearcoat={1}          
          clearcoatRoughness={0.1}
          transmission={0.5}     
          thickness={0.5}       
          transparent
          opacity={0.2}
          color={0}         
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/logo.gltf')