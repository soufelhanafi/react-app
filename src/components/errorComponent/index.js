import React from "react"
import styles from "./style.module.scss"

class ErrorComponent extends React.Component{

  render(){
    const {message} = this.props
    return(
      <div className={styles.errorContainer}>{message}</div>
    )
  }
}

export default ErrorComponent
