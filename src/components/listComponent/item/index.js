import React from "react"
import {Link} from "react-router-dom"
import styles from "./style.module.scss"

export default class HomePageItem extends React.Component{

  render(){
    const {name, url} = this.props
    return (
      <div className={styles.HomePageItem}>
        <div className={styles.name}>
          {name}
        </div>
        <div className={styles.action}>
          {url?<Link to={url+name}>See more details</Link>:<span>Action</span>}
        </div>
      </div>
    )
  }
}
