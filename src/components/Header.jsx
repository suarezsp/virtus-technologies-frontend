'use client'

import { Suspense, useRef, useState, useEffect } from "react"
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import LogoModel from "./LogoModel"
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from "@react-three/postprocessing"
import { useInView } from "framer-motion"

function ResponsiveLogo({ inView }) {
  const meshRef = useRef()

  const maxRotation = 0.02
  const minRotation = -0.05
  const speed = 0.002
  const direction = useRef(1)

  useFrame((_, delta) => {
    if (!meshRef.current) return

    meshRef.current.rotation.y += direction.current * speed * delta
    if (meshRef.current.rotation.y > maxRotation) direction.current = -1
    if (meshRef.current.rotation.y < minRotation) direction.current = 1

    const target = inView ? 40 : 0.01
    const s = meshRef.current.scale
    s.x = THREE.MathUtils.damp(s.x, target, 2, delta)
    s.y = THREE.MathUtils.damp(s.y, target, 2, delta)
    s.z = THREE.MathUtils.damp(s.z, target, 2, delta)
  })

  const position = [1.2, -0.7, 1]

  return (
    <group ref={meshRef} scale={[0.001, 0.001, 0.001]} position={position}>
      <LogoModel />
    </group>
  )
}

function ResponsiveCamera() {
  const { camera } = useThree()
  camera.position.set(4, -0.3, 3.8)
  camera.lookAt(0, 0, 0)
  return null
}

function HeaderComponent() {
  const [scrollY, setScrollY] = useState(0)
  const headerRef = useRef()

  const inView = useInView(headerRef, { margin: "-20% 0px -20% 0px" })
  const maxScroll = 150

  useEffect(() => {
    const handleScroll = () => {
      const headerTop = headerRef.current?.offsetTop || 0
      const relativeScroll = Math.min(Math.max(window.scrollY - headerTop, 0), maxScroll)
      setScrollY(relativeScroll)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const h1Translate = Math.min(scrollY / 2, maxScroll / 2)
  const pOpacity = Math.max(1 - scrollY / maxScroll, 0)

  return (
    <div
      ref={headerRef}
      className="relative w-full h-screen bg-gradient-to-tr from-virtus-dark via-virtus-gray to-virtus-dark flex overflow-hidden"
    >
      <div className="flex-2 h-full w-3/5">
        <Canvas style={{ width: "100%", height: "100%" }} camera={{ fov: 50 }} gl={{ alpha: true }}>
          <ambientLight intensity={1} />
          <spotLight position={[5, 2, 5]} angle={0.3} penumbra={0} intensity={2} castShadow />
          <pointLight position={[-10, -3, 3]} intensity={3.5} color="virtus-blue" />
          <OrbitControls enableRotate={false} enableZoom={false} />
          <Suspense fallback={null}>
            <ResponsiveLogo inView={inView} />
          </Suspense>
          <ResponsiveCamera />
          <Environment preset="warehouse" />
          <EffectComposer>
            <DepthOfField focusDistance={0} focalLength={0.03} bokehScale={2} height={480} />
            <Bloom luminanceThreshold={1} luminanceSmoothing={1} height={300} />
            <Noise opacity={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Canvas>
      </div>
      <div className="flex-1 h-full w-2/5 flex flex-col justify-center items-start p-12 bg-transparent backdrop-blur-sm relative">
        <h1
          className="text-6xl font-bold text-virtus-light mb-2 transition-all duration-1000 ease-in-out"
          style={{ transform: `translateY(-${h1Translate}px)`, opacity: pOpacity }}
        >
          VIRTUS
        </h1>
        <p
          className="text-2xl text-virtus-light transition-all duration-1000 ease-in-out"
          style={{ opacity: pOpacity, transform: `translateY(-${h1Translate / 2}px)` }}
        >
          Improving. Learning. Deploying.
        </p>
        <div
          className="absolute top-0 left-0 w-[0.5px] h-full
                     bg-gradient-to-b from-transparent via-virtus-dark via-virtus-light via-virtus-dark to-transparent
                     animate-borderPulse"
        ></div>
      </div>
    </div>
  )
}

export default HeaderComponent