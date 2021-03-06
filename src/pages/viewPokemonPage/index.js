import React from "react"
import {Spin} from "antd"
import {withRouter, Link} from "react-router-dom"
import axios from "axios"
import ErrorComponent from "../../components/errorComponent"

import styles from "./style.module.scss"

class ViewPokemonPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loading:true,
      pokemon:null,
      chain:null,
      names:[]
    }
  }
  componentDidMount(){
    this.getPokemon()
  }

  componentDidUpdate(nextProps){
    const nextId = nextProps.match.params.id
    const {id} = this.props.match.params
    if(nextId !== id){
      this.setState({names:[],loading:true,chain:null})
      this.getPokemon()
    }
  }

  getPokemon = () => {
    const {id} = this.props.match.params
    axios({
      method:'get',
      url:`/pokemon/${id}`,
    }).then(response=>{
      this.setState({pokemon:response.data,showErrorMessage:false})
      this.getEvolutions(response.data.id)
    }).catch(err=>{
      this.setState({showErrorMessage:true,loading:false})
    })
  }

  getEvolutionNames = evolves_to =>{
    let names = []
    for(let i = 0; i < evolves_to.length;i++){
      names.push(evolves_to[i].species.name)
      if(evolves_to[i].evolves_to.length>0){
        this.getEvolutionNames(evolves_to[i].evolves_to)
      }
    }
    this.setState({names:[...this.state.names, ...names]})
  }

  getEvolutions = id=>{
    axios({
      method:'get',
      url:`/evolution-chain/${id}`,
    }).then(response=>{
      this.setState({chain:response.data,loading:false,showErrorMessage:false, hideEvolutions:false})
      this.getEvolutionNames([response.data.chain])
    }).catch(err=>{
      this.setState({loading:false, hideEvolutions:true})
    })
  }

  render(){
    const {name} = this.props.match.params
    const {loading, pokemon, showErrorMessage,hideEvolutions} = this.state

    return (
      <Spin spinning={loading}>

        <div className={styles.pokemonViewContainer}>
        {!showErrorMessage?
            <div className={styles.pokemonViewContent}>
              {pokemon
                ?
                <div>
                  <div className={styles.imgContainer}>
                    {pokemon.sprites &&
                      <img src={pokemon.sprites.dream_world?pokemon.sprites.dream_world.front_default:pokemon.sprites.front_default} alt="pokemon"/>
                    }
                  </div>
                  <h1 className={styles.name}>{pokemon.name}</h1>
                  <div className={styles.generalInfomrations}>
                    <p className={styles.title}>General informations</p>
                    <p className={styles.item}>Height: {pokemon.height}</p>
                    <p className={styles.item}>Weight: {pokemon.weight}</p>
                    <p className={styles.item}>Experience: {pokemon.base_experience}</p>
                  </div>
                  {!hideEvolutions &&
                  <div className={styles.generalInfomrations}>
                    <p className={styles.title}>Evolutions</p>
                    {this.state.names.map((name,index)=>(<p className={styles.item} key={index}><Link  to={"/view-pokemon/"+name} >{name}</Link></p>))}
                  </div>}

                  <p className={styles.title1}>More informations</p>
                  <div className={styles.moreInformations}>
                    <div className={styles.moves}>
                      <p className={styles.movesTitle}>List of moves</p>
                      <small>A list of moves along with learn methods and level details pertaining to specific version groups.</small>
                      <div className={styles.listOfAbilities}>
                      {pokemon.moves.length>0?
                        pokemon.moves.map((move,index)=><div key={index}>{(index+1)+") " +move.move.name}</div>)
                        :
                        ("Pokemon has no moves to show")
                      }
                      </div>
                    </div>
                    <div className={styles.moves}>
                      <p className={styles.movesTitle}>List of abilities</p>
                      <small>A list of abilities this Pokémon could potentially have.</small>
                      {pokemon.abilities.length>0?
                        pokemon.abilities.map((ability,index)=><div key={index}>{(index+1)+") " +ability.ability.name}</div>)
                        :
                        ("Pokemon has no abilities to show")
                      }
                    </div>
                    <div className={styles.moves}>
                      <p className={styles.movesTitle}>List of types</p>
                      <small>A list of details showing types this Pokémon has.</small>
                      {pokemon.types.length>0?
                        pokemon.types.map((type,index)=><div key={index}><Link to={"/types/"+type.type.name}>{(index+1)+") " +type.type.name}</Link></div>)
                        :
                        ("Pokemon has no abilities to show")
                      }
                    </div>
                  </div>
                </div>
                :
                <div>There's no pokemon with name {name}</div>
              }
            </div>
        :
          <ErrorComponent message="An error occured, please back to home page" />
        }
        </div>

      </Spin>
    )
  }
}

export default withRouter(ViewPokemonPage)
