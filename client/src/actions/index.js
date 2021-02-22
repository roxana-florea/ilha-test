import axios from 'axios';


export const addPlan = (planObjWithoutId) => {
  console.log(planObjWithoutId);

  return dispatch => { //return function
    return axios                           // request plan
      .post('http://localhost:5000/plans', planObjWithoutId) //return post request response
             //response
      .then((backendResponseWithObjectWithNewId) => { //pass data in as a parameter, call the callback, dispatch the action. 
        console.log(backendResponseWithObjectWithNewId);
        dispatch({
          type: 'ADD_PLAN',
          value: backendResponseWithObjectWithNewId.data
        })
      })
  }
}




export const deletePlan = (planId) => {
  console.log(planId);

  return dispatch => { //return function
    return axios
      .delete('http://localhost:5000/plans/'+planId ) //return post request response
      .then((data) => { //pass data in as a parameter, call the callback, dispatch the action. 
        console.log(data);

        dispatch({
          type: 'DELETE_PLAN',
          value: planId
        })
      })
  }
}


export const addTask = (task) => {
  console.log(task)
  return dispatch => { //return function
    return axios
      .post(`http://localhost:5000/plans/${task.planId}/tasks`, task) //return post request response
      .then((objectFromHell) => { //pass data in as a parameter, call the callback, dispatch the action. 
        console.log(objectFromHell);

        dispatch({
          type: 'ADD_TASK',
          value: objectFromHell.data
        })
      })
  }

};

export const deleteTask = (taskObj) => {
  return {
    type: 'DELETE_TASK',
    value: taskObj,
  };
};

export const updateTask = (taskObj) => {
  return {
    type: 'UPDATE_TASK',
    value: taskObj,
  };
};

//testing

// export const signIn = (emailPassword) => {
  // console.log(emailPassword)

//   return dispatch => { //return function
//     return axios                           // 
//       .post('http://localhost:5000/login/', emailPassword) //return post request response
//              //response
//       .then((backendResponseWithObjectWithEmPass) => { //pass data in as a parameter, call the callback, dispatch the action. 
//         console.log(backendResponseWithObjectWithEmPass);
//         dispatch({
//           type: 'ADD_PLAN',
//           value: backendResponseWithObjectWithNewId.data
//         })
//       })
//   }
// }


