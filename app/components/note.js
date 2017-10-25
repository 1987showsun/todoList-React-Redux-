import React,{Component}  from 'react';
import {connect}          from 'react-redux';

import {editItem,closeNote}         from '../actions/todo';

class Note extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      name              : '',
      checkboxStatus    : false,
      selectEditIndex   : 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name            : (nextProps.todo.selectItemOject!='')? nextProps.todo.selectItemOject.text : '',
      selectEditIndex : nextProps.todo.selectEditIndex,
      checkboxStatus  : (nextProps.todo.selectItemOject!='')? nextProps.todo.selectItemOject.status : false,
    })
  }

  handleChange(e){
    if( e.target.name!='checkboxStatus' ){
      this.setState({
        [e.target.name] : e.target.value
      })
    }else{
      this.setState({
        [e.target.name] : e.target.checked
      })
    }
  }

  editSubmit(e){
    e.preventDefault();
    const item            = this.props.todo.item;
    const name            = this.state.name;
    const checkboxStatus  = this.state.checkboxStatus;
    const selectEditIndex = this.state.selectEditIndex;
    this.props.dispatch( editItem(item,checkboxStatus,name,selectEditIndex) );
  }

  closeNote(){
    this.props.dispatch( closeNote() );
  }

  render(){
    if( this.props.todo.selectItemOject!='' ){
      return(
        <article className="note">
          <section className="null" onClick={this.closeNote.bind(this)}></section>
          <article className="in">
            <article className="title">
              更新資料
            </article>
            <form onSubmit={this.editSubmit.bind(this)}>
              <input type="checkbox" name="checkboxStatus" onChange={this.handleChange.bind(this)} checked={this.state.checkboxStatus}/>
              <input type="text" value={this.state.name} name="name" onChange={this.handleChange.bind(this)}/>
              <button type="submit">送出</button>
            </form>
          </article>
        </article>
      );
    }else{
      return null;
    }
  }
}

function mapStateToProps(state){
  return{
    todo : state.todo
  }
}

export default connect(mapStateToProps)(Note);
