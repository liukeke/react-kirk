import mediaLibraryService from '../../../service/userService.js'


export const addWord = (text) =>({
 type:'ADD_WORD',
     text
});
export const receivePosts = (data) => ({
    type: 'ADD_AJAX',
    word:data
})
export const fetchPostsIfNeeded = () => (dispatch, getState) => {
    mediaLibraryService.getTagAll({},function(data){
        dispatch(receivePosts(data))
    },function(){})
}