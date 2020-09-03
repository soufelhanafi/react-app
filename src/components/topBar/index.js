import React from "react"
import styles from "./style.module.scss"

export default class TopBar extends React.Component{
  render(){
    return(
      <header className={styles.header}>
        <div className={styles.element}>Home</div>
        <div className={styles.element}>Types</div>
      </header>
    )
  }
}
