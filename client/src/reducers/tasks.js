const tasksReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_TASK':
            const newTasksArr = [...state];
            newTasksArr.push(action.value);
            return newTasksArr;
        case 'DELETE_TASK':
            const tasksArr = [...state];
            const removeId = tasksArr.map(function(task) {return task.id} ).indexOf(action.value);
            tasksArr.splice(removeId,1);
            return tasksArr;
        default:
            return state;
    }
}

export default tasksReducer;

