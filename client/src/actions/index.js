import axios from 'axios';


// export const addPlan = (planObj) => {






//   return (dispatch) => {
//     return axios
//       .post('http://localhost:5000/plans', planObj)
//       .then(res => {
//         dispatch(addPlan(res.data));
//       })
//       .catch(err => {
//         dispatch(console.log("error"));
//       });


// }





export const addPlan = (planObj) => {
  console.log(planObj);

  return dispatch => { //return function
    return axios
      .post('http://localhost:5000/plans', planObj) //return post request response
      .then((data) => { //pass data in as a parameter, call the callback, dispatch the action. 
        console.log(data);

        dispatch({
          type: 'ADD_PLAN',
          value: planObj
        })
      })
  }
}





//   return dispatch => {


//     axios.post('http://localhost:5000/plans', 
//             planObj
//         )

//         .then(res => {
//             dispatch(console.log("success"));
//         })
//         .catch(err => {
//             dispatch(console.log(planObj));
//         });

// };

// }

// export const addPlan = (planObj) => {
//   return {
//     type: 'ADD_PLAN',
//     value: planObj,
//   };
// };





export const deletePlan = (planId) => {
  return {
    type: 'DELETE_PLAN',
    value: planId,
  };
};

export const addTask = (taskObj) => {
  return {
    type: 'ADD_TASK',
    value: taskObj,
  };
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
