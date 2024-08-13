import { useState } from 'react'
import Nav from '../Nav'
import Scene from './Scene'
import styles from './styles.module.scss'

export default function Header() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <header className={styles.header}>
      <Nav />
      <Scene isLoading={isLoading} setIsLoading={setIsLoading} />
      <div className={styles.overlay} />
      <div className={styles.darkGradient} />
      {!isLoading && <div className={styles.orangeGradient} />}
      <h1 className={styles.hidden}>Daniela Barbosa</h1>
      <p className={styles.hidden}>Front-end Developer</p>
    </header>
  )
}
