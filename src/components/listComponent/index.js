import React from "react"
import Item from "./item"
import {Pagination} from "antd"
import styles from "./style.module.scss"

export default class ListComponent extends React.Component{

  render(){
    const {data, totalElements, current, pageSize, name, baseUrl} = this.props
    return (
        <div className={styles.listContainer}>
          <Item name={name} />
          {data.length>0 ?
            data.map((item,index)=><Item key={item.url} name={item.name} url={baseUrl} />)
            :
            <div>there's no data, please back to the home page or change the the requested page</div>
          }
          {data.length>0 &&
            <Pagination
              current={current}
              pageSize={pageSize}
              className={styles.pagination}
              total={totalElements}
              onChange={this.props.changePagination}
              />
            }
        </div>
    )
  }
}
