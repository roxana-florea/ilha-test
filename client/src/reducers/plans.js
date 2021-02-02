const plansReducer = (state = {}, action) => {
  const plansObj = { ...state };

  switch (action.type) {
    case 'ADD_PLAN':
      plansObj[action.value.id] = action.value;
      return plansObj;

    case 'DELETE_PLAN':
      delete plansObj[action.value];
      return plansObj;

    case 'ADD_TASK':
      plansObj[action.value.planId].tasks[action.value.id] = action.value;
      return plansObj;

    case 'DELETE_TASK':
      const planToDeleteTask = plansObj[action.value.planId];
      delete planToDeleteTask.tasks[action.value.id];
      return plansObj;

    case 'UPDATE_TASK':
      const planToUpdateTask = plansObj[action.value.planId];
      planToUpdateTask.tasks[action.value.id] = action.value;
      return plansObj;

    default:
      return state;
  }
};

export default plansReducer;
