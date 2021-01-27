const plansReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_PLAN':
            const newPlansArr = [...state];
            newPlansArr.push(action.value);
            return newPlansArr;
        case 'DELETE_PLAN':
            const plansArr = [...state];
            const removeId = plansArr.map(function(plan) {return plan.id} ).indexOf(action.value);
            plansArr.splice(removeId,1);
            return plansArr;
            // console.log('deleted');

        default:
            return state;
    }
}

export default plansReducer;