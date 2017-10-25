import React,{Component}    from 'react';
import {connect}            from 'react-redux';

import {selectItem,removeItem,filter}         from '../actions/todo';

class List extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      filterNavStatus : '',
    }
  }

  selectItem(i,selectItemObject){
    let allItem         = this.props.todo.item,
        filterNavStatus = this.state.filterNavStatus;

    this.props.dispatch( selectItem(allItem,selectItemObject,i,filterNavStatus) );
  }

  remove(i,selectItemObject){
    let allItem         = this.props.todo.item,
        filterNavStatus = this.state.filterNavStatus;

    this.props.dispatch( removeItem(allItem,selectItemObject,i,filterNavStatus) );
  }

  status(status){
    if( !status ){
      return '未完成';
    }else{
      return '已完成';
    }
  }

  filter(status){
    this.setState({
      filterNavStatus : status,
    })
    this.props.dispatch( filter(status) );
  }

  returnfilterViews(){
    return(
      <nav className="filterNav">
        <ul className="nav">
          <li className={ (this.props.todo.filterStatus=='')? true : '' } onClick={this.filter.bind(this,'')}>全部顯示</li>
          <li className={ (this.props.todo.filterStatus=='true')? true : '' } onClick={this.filter.bind(this,'true')}>已完成</li>
          <li className={ (this.props.todo.filterStatus=='false')? true : '' } onClick={this.filter.bind(this,'false')}>未完成</li>
        </ul>
      </nav>
    )
  }

  checkStatusData(){
    let _switch = false;
    this.props.todo.item.forEach((item)=>{
      if( this.props.todo.filterStatus!='' ){
        if( String(item.status)==this.props.todo.filterStatus ){
          _switch = true;
        }
      }else{
        _switch = true;
      }
    })
    return _switch;
  }

  returnViews(){
    if( this.props.todo.item!='' ){
      let _switch = this.checkStatusData();
      if(_switch){
        return(
          <ul className={"list model1 "+this.state.filterNavStatus}>
            {this.props.todo.item.map((item,i)=>{
              return (
                <li key={i} className={item.status}>
                  <ul>
                    <li className={item.status}>
                      <span className="tag">
                        {this.status(item.status)}
                      </span>
                    </li>
                    <li>{item.text}</li>
                    <li>
                      <button className="actionBtn" onClick={this.selectItem.bind(this,i,item)}>更新</button>
                      <button className="actionBtn" onClick={this.remove.bind(this,i,item)}>刪除</button>
                    </li>
                  </ul>
                </li>
              )
            })}
          </ul>
        );
      }else{
        if( this.props.todo.filterStatus=='true' ){
          return(
            <div className="noData">無已完成資料</div>
          );
        }else if( this.props.todo.filterStatus=='false' ){
          return(
            <div className="noData">無未完成資料</div>
          );
        }
      }
    }else{
      return(
        <div className="noData">無新增項目</div>
      );
    }
  }

  render(){
    return (
      <article className="block">
        <article className="title">
          項目列表
        </article>
        {this.returnfilterViews()}
        {this.returnViews()}
      </article>
    );
  }
}

function mapStateToProps(state){
  return{
    todo : state.todo
  }
}

export default connect(mapStateToProps)(List);
