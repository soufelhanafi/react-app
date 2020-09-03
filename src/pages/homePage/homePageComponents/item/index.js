import React from "react"
import {Link} from "react-router-dom"
import styles from "./style.module.scss"

const baseUrl = "https://pokeapi.co/api/v2/pokemon/"
export default class HomePageItem extends React.Component{
  getIdFromUrl =(url)=>{
    let id = url.replace(baseUrl,"")
    return parseInt(id.replace("/",""))
  }
  render(){
    const {name, url} = this.props
    return (
      <div className={styles.HomePageItem}>
        <div className={styles.name}>
          {name}
        </div>
        <div className={styles.action}>
          {url?<Link to={"/view-pokemon/"+this.getIdFromUrl(url)}>See more details</Link>:<span>Action</span>}
        </div>
      </div>
    )
  }
}
