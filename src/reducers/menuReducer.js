const menuReducer = {
    category: [
        { title: 'Project 01', children: [{ title: 'Sub Project' }] },
        { title: 'Project 02', children: [{ title: 'Sub Project' }] },
        { title: 'Project 03', children: [{ title: 'Sub Project' }] },
        { title: 'Project 04', children: [{ title: 'Sub Project' }] },
        { title: 'Project 05', children: [{ title: 'Sub Project' }] }
    ]
};

export default (state = menuReducer,action ) =>{

    switch(action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                category:[...state.category,action.item],
            }
        case 'REINITIALIZEMENU_ITEM':
            return {
                ...state,
                category:[...action.item],
            }
        case 'REMOVE_MAIN_CATEGORY':
            const categroy = state.category.filter((cat,key) => key != action.data.catkey);
            return {
                ...state,
                category:[...categroy],
            }
        case 'MODIFY_MAIN_CATEGORY':

            var categoryItem = state.category.map((item,key) => {
                var changeItem = { title: action.data.title, children: item.children }
                if(action.data.key == key) {
                    return {
                        ...item,
                        ...changeItem
                    }
                } else {
                    return item;
                }
            });
            return {
                ...state,
                category:[...categoryItem],
            }
            
        default:
            return {
                ...state
            }
    }

}