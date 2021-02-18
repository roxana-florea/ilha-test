import axios from 'axios';



export const addPlan = (planObjWithoutId) => {
  return dispatch => { //return function
    return axios                           // request plan
      .post('http://localhost:5000/plans', planObjWithoutId) //return post request response
      //response
      .then((backendResponseWithObjectWithNewId) => { //pass data in as a parameter, call the callback, dispatch the action. 
        dispatch({
          type: 'ADD_PLAN',
          value: backendResponseWithObjectWithNewId.data
        })
      })
  }
};




export const deletePlan = (planId) => {
  return dispatch => { //return function
    return axios
      .delete(`http://localhost:5000/plans/${planId}`) //return delete request response
      .then((data) => { //pass data in as a parameter, call the callback, dispatch the action. 
        dispatch({
          type: 'DELETE_PLAN',
          value: planId
        })
      })
  }
};



export const addTask = (task) => {
  return dispatch => { //return function
    return axios
      .post(`http://localhost:5000/plans/${task.planId}/tasks`, task) //return post request response
      .then((responseFromHell) => { //pass data in as a parameter, call the callback, dispatch the action. 
        dispatch({
          type: 'ADD_TASK',
          value: responseFromHell.data
        })
      })
  }
};



export const deleteTask = (task) => {
  console.log(task)
  return dispatch => { //return function
    return axios
      .delete(`http://localhost:5000/plans/${task.planId}/tasks/${task._id}`) //return delete request response
      .then((responseFromHell) => { //pass data in as a parameter, call the callback, dispatch the action. 
        dispatch({
          type: 'DELETE_TASK',
          value: task
        })
      })
  }
};







export const updateTask = (taskObj) => {
  return {
    type: 'UPDATE_TASK',
    value: taskObj,
  };
};