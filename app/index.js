import React,{Component}    from 'react';
import ReactDOM             from 'react-dom';
import {Provider,connect}   from 'react-redux';

//reducer
import store                from "./store";
import {todoAction}         from './actions/todo';

//Component
import List                 from "./components/list";
import Note                 from "./components/note";

//style
import './public/stylesheets/style.scss';

@connect((store)=>{
  return{
    todo : store.todo
  }
})

class Todo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      filterNavStatus   : '',
      name              : '',
      item              : [],
    };
  }

  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    let item = this.state.item;
    item.push({
      status : false,
      text   : this.state.name
    });
    this.props.store.dispatch( todoAction(item,this.state.filterNavStatus) );
    this.setState({
      name : ''
    })
  }

  render(){
    return(
      <article id="wrapper">
        <article className="block">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" value={this.state.name} name="name" onChange={this.handleChange.bind(this)} placeholder="請輸入新增項目"/>
            <button type="submit">新增</button>
          </form>
        </article>
        <List/>
        <Note />
      </article>
    );
  }
}

function mapStateToProps(state){
  return {
    todo  : state.todo
  }
}

export default connect(mapStateToProps)(Todo);

ReactDOM.render(
  <Provider store={store}>
    <Todo store={store}/>
  </Provider>,
  document.getElementById('app')
);
