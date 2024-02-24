import { Link } from "react-router-dom"
import styles from './homepage.module.css'
import cup from '../../assets/icons/taza-cocoa-marron.svg'

export const HomePage = () => {
  
  return (
    <section className={styles.container}>
      <Link to='/desayunos-basicos'>
        <div className={styles.link}>
          <img src={cup}/>
          <h1>Desayunos Básicos</h1> 
        </div>
      </Link>
      <Link to='/desayunos-completos'>
        <div className={styles.link}>
          <img src={cup}/>
          <h1>Desayunos Completos</h1> 
        </div>
      </Link>
      <Link to='/cafes'>
        <div className={styles.link}>
          <img src={cup}/>
          <h1>Cafés</h1> 
        </div>
      </Link>
      <Link to='/reposteria'>
        <div className={styles.link}>
          <img src={cup}/>
          <h1>Repostería</h1> 
        </div>
      </Link>
      <Link to='/comidas'>
        <div className={styles.link}>
          <img src={cup}/>
          <h1>Comidas</h1> 
        </div>
      </Link>
      <Link to='/bebidas'>
        <div className={styles.link}>
          <img src={cup}/>
          <h1>Bebidas</h1> 
        </div>
      </Link>
    </section>
  )
}