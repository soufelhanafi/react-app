import React from "react"
import {Spin} from "antd"
import {withRouter} from "react-router-dom"
import axios from "axios"

import styles from "./style.module.scss"

class ViewPokemonPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loading:true,
      pokemon:{}
    }
  }
  componentDidMount(){
    const {id} = this.props.match.params
    axios({
      method:'get',
      url:`/pokemon/${id}`,
    }).then(response=>{
      this.setState({pokemon:response.data,loading:false})
    }).catch(err=>{
      console.log(err);
    })
  }
  render(){
    const {loading, pokemon} = this.state
    return (
      <Spin spinning={loading}>
        <div className={styles.pokemonViewContainer}>
            <div className={styles.pokemonViewContent}>
              <div className={styles.imgContainer}>
                {pokemon.sprites &&
                  <img src={pokemon.sprites.dream_world?pokemon.sprites.dream_world.front_default:pokemon.sprites.front_default} alt="pokemon"/>
                }
              </div>
              <h3 className={styles.name}>{pokemon.name}</h3>
              <div className={styles.generalInfomrations}>
                <p className={styles.title}>General informations</p>
                <p className={styles.item}>Height: {pokemon.height}</p>
                <p className={styles.item}>Weight: {pokemon.weight}</p>
                <p className={styles.item}>Experience: {pokemon.base_experience}</p>
              </div>
            </div>
        </div>
      </Spin>
    )
  }
}

export default withRouter(ViewPokemonPage)
