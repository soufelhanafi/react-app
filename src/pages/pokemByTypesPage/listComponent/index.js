import React from "react"
import Item from "./item"
import {Pagination} from "antd"
import styles from "./style.module.scss"

export default class ListComponent extends React.Component{
  state = {
    current: 0,
  }

  render(){
    const {data, totalElements, pageSize, name, baseUrl} = this.props
    return (
        <div className={styles.listContainer}>
          <Item name={name} />
          {data.length>0 ?
            data.slice(this.state.current*pageSize, (this.state.current+1)*pageSize).map((item,index)=><Item key={item.url} name={item.pokemon.name} url={baseUrl} />)
            :
            <div>there's no data, please back to the home page or change the the requested page</div>
          }
          {data.length>0 &&
            <Pagination
              current={this.state.current + 1}
              pageSize={pageSize}
              className={styles.pagination}
              total={totalElements}
              onChange={(page)=>this.setState({current:page - 1 })} // page params start from 1
              />
            }
        </div>
    )
  }
}
