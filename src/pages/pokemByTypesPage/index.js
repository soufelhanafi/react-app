import React from "react"
import axios from "axios"
import {Spin} from "antd"
import ListComponent from "./listComponent"
import ErrorComponent from "../../components/errorComponent"
import styles from "./style.module.scss"

export default class TypesPage extends React.Component{
  state = {
    loading:true,
    showError:false,
    pokemons:[],
    totalElements:0
  }
  componentDidMount(){
    debugger
    const name = this.props.match.params.name
    axios({
      method:'get',
      url:'/type/'+name,
    }).then((response)=>{
      this.setState({loading:false, pokemons:response.data.pokemon,totalElements:response.data.count, showError:false})
    }).catch((err)=>{
      this.setState({loading:false, showError:false})
    })
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
    const {loading, pokemons, showError} = this.state
    return (
      <Spin spinning={loading}>
        <div className={styles.typesPageContainer}>
          {
            !showError?
            <ListComponent
              pageSize={20}
              onChange={()=>{return}}
              data={pokemons}
              name={"Pokemon Name"}
              totalElements={pokemons.length}
              baseUrl={"/view-pokemon/"}
              />
        :
          <ErrorComponent message={"An error occured, please try again by reloading the page"} />
        }
        </div>
      </Spin>
    )
  }
}
