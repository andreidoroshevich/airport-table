import {DataType, DirectionType, FieldNameType} from "../types/types";

export const sortMethod = (arr: DataType[], fieldName: FieldNameType, direction: DirectionType) => {
    if (direction === 'down' || !direction) {
        return arr.sort((a: DataType, b: DataType) => {
            if (a[fieldName] < b[fieldName]) {
                return -1
            }
            if (a[fieldName] > b[fieldName]) {
                return 1
            }
            return 0
        })
    } else if (direction === 'up') {
        return arr.sort((a: DataType, b: DataType) => {
            if (b[fieldName] < a[fieldName]) {
                return -1
            }
            if (b[fieldName] > a[fieldName]) {
                return 1
            }
            return 0
        })
    }
}

export const convertDateToUTC = (data: DataType[], fieldName: FieldNameType) => {
    return data.map(el => {
        return {...el, [fieldName]: el[fieldName] ? new Date(el[fieldName]).toUTCString() : ''}
    })
}

export const filteredEmptyFields = (data: DataType[], fieldName: FieldNameType) => {
    return [...data.filter(el => el[fieldName]), ...data.filter(el => !el[fieldName])]
}




