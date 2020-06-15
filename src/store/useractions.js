export const actions = {
    ADD_TODOS_SUCCESS : 'ADD_TODOS_SUCCESS',
    EDIT_TODOS_SUCCESS : 'EDIT_TODOS_SUCCESS',
    DELETE_TODOS_SUCCESS : 'DELETE_TODOS_SUCCESS',
    BULK_DELETE_SUCCESS : 'BULK_DELETE_SUCCESS ',
}

export const addTask = (todo) => dispatch => {

   return new Promise((resolve, reject) => {
           setTimeout(() => {
           dispatch({type: actions.ADD_TODOS_SUCCESS , payload:todo})
           resolve('success')
           },1000)
   })

}
export const editTask = (todo) => dispatch => {
    return new Promise((resolve,reject) => {
       setTimeout(() => {
             dispatch({type: actions.EDIT_TODOS_SUCCESS , payload:todo})
             resolve('success')

             },1000)
    }) 
}
export const deleteTask = (data) => dispatch => {
  return new Promise((resolve ,reject) => {

   setTimeout(() => {
         dispatch({type: actions.DELETE_TODOS_SUCCESS , payload:data})
         resolve('success')
         },1000)
  })

}
export const bulkDeleteTask = (data) => dispatch => {
    return new Promise((resolve ,reject) => {

     setTimeout(() => {
           dispatch({type: actions.BULK_DELETE_SUCCESS , payload:data})
           resolve('success')
           },1000)
    })

 }