const plansReducer = (state = [], action) => {
  const plansArr = [...state] ;

  switch (action.type) {
    case 'ADD_PLAN':
      plansArr.push(action.value);
      return plansArr;

    case 'DELETE_PLAN':
      return plansArr.filter(plan => plan._id !== action.value);

    case 'ADD_TASK':
      const uselessPlan = plansArr.filter(plan => plan._id === action.value.planId);
      uselessPlan[0].tasks.push(action.value);
      plansArr.filter(plan => plan._id !== action.value.planId).push(uselessPlan);
       
      return plansArr;

    case 'DELETE_TASK':
      const planWhereTaskShouldBeDeleted = plansArr.filter(plan => plan._id === action.value.planId); //choose the plan we want to target
      planWhereTaskShouldBeDeleted[0].tasks = planWhereTaskShouldBeDeleted[0].tasks.filter (task => task._id !== action.value._id);//choose all tasks except action.value
      plansArr.filter(plan => plan._id !== action.value.planId).push(planWhereTaskShouldBeDeleted[0]);// choose all plans except the one we modified and push modified one
      
      return plansArr;

    case 'UPDATE_TASK':
      const planToBeUpdated = plansArr.filter(plan => plan._id === action.value.planId);// get the plan that we wanna target
      planToBeUpdated[0].tasks = planToBeUpdated[0].tasks.filter(task => task._id !== action.value._id); //get all tasks except the one we are updating
      planToBeUpdated[0].tasks.push(action.value) //push the updated task
      plansArr.filter(plan => plan._id !== action.value.planId).push(planToBeUpdated[0]); //push modified plan into state

      return plansArr;

    default:
      return state;
  }
};

export default plansReducer;
