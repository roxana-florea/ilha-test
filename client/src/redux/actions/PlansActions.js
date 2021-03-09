import axios from 'axios';

export const loadPlans = (userId) => {
  return (dispatch) => {
    //return function
    return (
      axios // request plan
        .get('https://ilha-development.herokuapp.com/plans', {
          headers: {
            'userId': userId
          }
        }) //return post request response
        //response
        .then((allPlansArray) => {
          //pass data in as a parameter, call the callback, dispatch the action.
          dispatch({
            type: 'LOAD_PLANS',
            value: allPlansArray.data,
          });
        })
    );
  };
};

export const addPlan = (planObjWithoutId) => {
  return (dispatch) => {
    //return function
    return (
      axios // request plan
        .post('https://ilha-development.herokuapp.com/plans', planObjWithoutId) //return post request response
        //response
        .then((backendResponseWithObjectWithNewId) => {
          //pass data in as a parameter, call the callback, dispatch the action.
          dispatch({
            type: 'ADD_PLAN',
            value: backendResponseWithObjectWithNewId.data,
          });
        })
    );
  };
};

export const deletePlan = (planId) => {
  return (dispatch) => {
    //return function
    return axios
      .delete(`https://ilha-development.herokuapp.com/plans/${planId}`) //return delete request response
      .then((data) => {
        //pass data in as a parameter, call the callback, dispatch the action.
        dispatch({
          type: 'DELETE_PLAN',
          value: planId,
        });
      });
  };
};

export const addTask = (task) => {
  return (dispatch) => {
    //return function
    return axios
      .post(`https://ilha-development.herokuapp.com/plans/${task.planId}/tasks`, task) //return post request response
      .then((responseFromHell) => {
        //pass data in as a parameter, call the callback, dispatch the action.
        dispatch({
          type: 'ADD_TASK',
          value: responseFromHell.data,
        });
      });
  };
};

export const deleteTask = (task) => {
  return (dispatch) => {
    //return function
    return axios
      .delete(`https://ilha-development.herokuapp.com/plans/${task.planId}/tasks/${task._id}`) //return delete request response
      .then((responseFromHell) => {
        //pass data in as a parameter, call the callback, dispatch the action.
        dispatch({
          type: 'DELETE_TASK',
          value: task,
        });
      });
  };
};

export const updateTask = (task) => {
  console.log(task);
  return (dispatch) => {
    //return function
    return axios
      .put(`https://ilha-development.herokuapp.com/plans/${task.planId}/tasks/${task._id}`, task) //return put request response
      .then((responseFromHell) => {
        //pass data in as a parameter, call the callback, dispatch the action.
        dispatch({
          type: 'UPDATE_TASK',
          value: task,
        });
      });
  };
};

export const updatePlanTitle = (plan) => {
  return (dispatch) => {
    //return function
    return axios
      .put(`https://ilha-development.herokuapp.com/plans/${plan._id}`, plan) //return put request response
      .then((responseFromHell) => {
        //pass data in as a parameter, call the callback, dispatch the action.
        dispatch({
          type: 'UPDATE_PLAN_TITLE',
          value: plan,
        });
      });
  };
};
