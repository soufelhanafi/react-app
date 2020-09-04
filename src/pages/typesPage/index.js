import React from "react"
import axios from "axios"
import {Spin} from "antd"
import ListComponent from "../../components/listComponent"
import ErrorComponent from "../../components/errorComponent"
import styles from "./style.module.scss"

export default class TypesPage extends React.Component{
  state = {
    loading:true,
    showError:false,
    types:[],
    totalElements:0
  }
  componentDidMount(){
    axios({
      method:'get',
      url:'/type/',
    }).then((response)=>{
      this.setState({loading:false, types:response.data.results,totalElements:response.data.count, showError:false})
    }).catch((err)=>{
      this.setState({loading:false, showError:false})
    })
  }
  render(){
    const {loading, types, totalElements, showError} = this.state
    return (
      <Spin spinning={loading}>
        <div className={styles.typesPageContainer}>
          <div className={styles.description}>
            <h3>What are Types?</h3>
            <p>
              Types are properties for Pokémon and their moves. Each type has three properties: which types of Pokémon it is super effective against,
              which types of Pokémon it is not very effective against, and which types of Pokémon it is completely ineffective against.
            </p>
          </div>
        </div>
        <div className={styles.typesPageContainer}>
          {
            !showError?
            <ListComponent
              current={1}
              pageSize={20}
              onChange={()=>{return}}
              data={types}
              name={"Types"}
              totalElements={totalElements}
              baseUrl={"/types/"}
              />
        :
          <ErrorComponent message={"An error occured, please try again by reloading the page"} />
        }
        </div>
      </Spin>
    )
  }
}
