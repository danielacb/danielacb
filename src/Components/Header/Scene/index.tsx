import { useState } from 'react'
import { Canvas } from '@react-three/fiber'

import Title from './Title'
import Sphere from './Sphere'
import Loading from '@/Components/Loading'

import styles from './../styles.module.scss'

export default function Scene() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && (
        <div className={styles.loaderContainer}>
          <Loading />
        </div>
      )}

      <Canvas onCreated={() => setIsLoading(false)} style={{ height: '100vh' }}>
        <Title />
        <Sphere />
      </Canvas>
    </>
  )
}
