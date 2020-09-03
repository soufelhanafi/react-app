import React from "react"
import {Link} from "react-router-dom"
import styles from "./style.module.scss"
import {withRouter} from "react-router-dom"

class TopBar extends React.Component{

  render(){
    const {pathname} = this.props.location
    return(
      <header className={styles.header}>
        <Link to={"/"} className={`${styles.element} ${pathname==="/"?styles.element_selected:""}`}>Home</Link>
        <Link to={"/types"} className={`${styles.element} ${pathname==="/types"?styles.element_selected:""}`}>Types</Link>
      </header>
    )
  }
}

export default withRouter(TopBar)
