import React from "react"
import {Link} from "react-router-dom"
import styles from "./style.module.scss"

export default class TypeItem extends React.Component{

  render(){
    const {type, url} = this.props
    return (
      <div className={styles.HomePageItem}>
        <div className={styles.name}>
          {type}
        </div>
        <div className={styles.action}>
          {url?<Link to={"/types/"+type}>See pokemons</Link>:<span>Action</span>}
        </div>
      </div>
    )
  }
}
