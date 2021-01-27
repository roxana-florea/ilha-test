export const addPlan = (planObj) => {
    return {
        type: 'ADD_PLAN',
        value: planObj
    }
}

export const deletePlan = (planId) => {
    return {
        type: 'DELETE_PLAN',
        value: planId
    }
}

export const addTask = (taskObj) => {
    return {
        type: 'ADD_TASK',
        value: taskObj
    }
}

export const deleteTask = (taskId) => {
    return {
        type: 'DELETE_TASK',
        value: taskId
    }
}

