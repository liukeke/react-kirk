const arryIson = (state , action) => {
    let arrayOn = state.find((data)=> {
        return data.tag == action.text
    })
    if(arrayOn){
        alert('数据重复');
        return [
            ...state
        ]
    }else{
        return [
            {
                count: 4,
                tag: action.text
            },
            ...state
        ]
    }
}
const words = (state , action) => {
    if(!state){
        state= []
    }
    switch (action.type) {
        case 'ADD_AJAX':
            return [
                ...state,
                ...action.word
            ];
        case 'ADD_WORD':
            return arryIson(state , action);
        default:
            return state
    }
};
export default words