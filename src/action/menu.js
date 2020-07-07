export const addCategoryItem = item =>({
    type:'ADD_ITEM',
    item
})
export const reInitializeDragandDrop = item =>({
    type:'REINITIALIZEMENU_ITEM',
    item
})
export const removeMainCategory = data =>({
    type:'REMOVE_MAIN_CATEGORY',
    data
})
export const categoryModify = data =>({
    type:'MODIFY_MAIN_CATEGORY',
    data
})