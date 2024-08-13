import { Dispatch, SetStateAction } from 'react'
import { Canvas } from '@react-three/fiber'

import Title from './Title'
import Sphere from './Sphere'
import Loading from '@/Components/Loading'

import styles from './../styles.module.scss'

type Props = {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export default function Scene({ isLoading, setIsLoading }: Props) {
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
