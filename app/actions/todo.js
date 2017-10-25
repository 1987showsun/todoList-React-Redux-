export function todoAction(item,status){
  return function(dispatch){
    dispatch({type:'ADD_ITEM', item: item})
  }
}

export function selectItem(allItem,selectItem,i,filterNavStatus){
  return function(dispatch){
    dispatch({type:'ADD_SELECT_ITEM', selectItemOject: allItem[i], selectEditIndex: i})
  }
}

export function editItem(allItem,checkboxStatus,name,i){
  return function(dispatch){
    allItem[i].status = checkboxStatus;
    allItem[i].text   = name;
    dispatch({type:'EDIT_ITEM', item: allItem})
  }
}

export function removeItem(allItem,selectItem,i,filterNavStatus){
  const item = allItem;
  item.splice(i, 1);
  return function(dispatch){
    dispatch({type:'ADD_ITEM', item: item})
  }
}

export function filter(status){
  return function(dispatch){
    dispatch({type:"FILTER_ITEM", filterStatus: String(status) })
  }
}

export function closeNote(status){
  return function(dispatch){
    dispatch({type:"CLOSE_NOTE"})
  }
}
