import React from "react"
import styles from "./style.module.scss"

class ErrorComponent extends React.Component{

  render(){
    return(
      <div className={styles.errorContainer}>An error occured, please try again by reloading the page</div>
    )
  }
}

export default ErrorComponent
