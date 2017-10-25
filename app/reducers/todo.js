export default function todo(state={
  name            : '',
  editname        : '',
  filterStatus    : '',
  item            : [],
  editItem        : [],
  selectItemOject : [],
  selectEditIndex : 0,
  checkboxStatus  : false,
},action){
  switch ( action.type ){
    case 'ADD_ITEM' :
      state = { ...state, item: action.item}
      break;

    case 'ADD_SELECT_ITEM':
      state = { ...state, selectItemOject: action.selectItemOject, selectEditIndex: action.selectEditIndex }
      break;

    case 'EDIT_ITEM' :
      state = { ...state, item: action.item, selectItemOject:[] }
      break;

    case 'FILTER_ITEM' :
      state = { ...state, filterStatus: action.filterStatus }
      break;

    case 'CLOSE_NOTE':
      state = { ...state, selectItemOject:[] }
      break;
  }
  return state;
}
