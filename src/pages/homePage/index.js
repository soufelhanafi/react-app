import React from "react"
import {Spin,} from "antd"
import axios from "axios"
import ErrorComponent from "../../components/errorComponent"
import ListComponent from "../../components/listComponent"
import styles from "./style.module.scss"

export default class HomePage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      data: [],
      current:1
    }
  }

  componentDidMount(){
    this.getPokemons(1)
  }

  getPokemons = (page)=>{
    const offset = (page - 1) * 25, limit=25
    this.setState({loading: true})
    axios({
      method:'get',
      url:"pokemon",
      params:{
        limit,
        offset
      }
    }).then(response=>{
      this.setState({data:response.data.results,showErrorMessage:false, totalElements:response.data.count,loading:false,current:page})
    }).catch(err=>{
      this.setState({showErrorMessage:true,loading:false})
    })
  }

  render(){
    const {loading,data,showErrorMessage, totalElements,current} = this.state
    return (
      <Spin spinning={loading} >
        <div className={styles.homePageContainer}>
          <div className={styles.description}>
            <h3>What are Pokémons?</h3>
            <p>
              Pokémon are the creatures that inhabit the world of the Pokémon games. They can be caught using
              Pokéballs and trained by battling with other Pokémon. Each Pokémon belongs to a specific species but may
              take on a variant which makes it differ from other Pokémon of the same species, such as base stats,
              available abilities and typings.
            </p>
          </div>
        </div>
        <div className={styles.homePageContainer}>
          {
            !showErrorMessage?
            <ListComponent
              data={data}
              current={current}
              pageSize={20}
              totalElements={totalElements}
              name={"Pokemon Name"}
              changePagination={this.getPokemons}
              baseUrl="/view-pokemon/"
              />
        :
          <ErrorComponent message={"An error occured, please try again by reloading the page"} />
        }
        </div>
      </Spin>
    )

  }
}
