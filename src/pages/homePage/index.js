import React from "react"
import {Spin} from "antd"
import axios from "axios"
import ErrorComponent from "../../components/errorComponent"
import HomePageItem from "./homePageComponents/item"
import styles from "./style.module.scss"

export default class HomePage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      data: []
    }
  }

  componentDidMount(){
    this.getPokemons(0)
  }

  getPokemons = (page)=>{
    const offset = page * 25, limit=25
    axios({
      method:'get',
      url:"pokemon",
      params:{
        limit,
        offset
      }
    }).then(response=>{
      this.setState({data:response.data.results,showErrorMessage:false})
    }).catch(err=>{
      this.setState({showErrorMessage:true})
    })
  }

  render(){
    const {loading,data,showErrorMessage} = this.state
    return (
      <Spin spinning={loading} >
        <div className={styles.homePageContainer}>
          {
            !showErrorMessage?
            <div className={styles.listContainer}>
              <HomePageItem name={"Pokemon Name"} />
              {data.length>0 ?
                data.map((item,index)=><HomePageItem key={item.url} name={item.name} url={item.url} />)
                :
                <div>there's no data, please reload the page</div>
              }
          </div>
        :
          <ErrorComponent />
        }
        </div>
      </Spin>
    )

  }
}
