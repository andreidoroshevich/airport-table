import React, {FC, useEffect, useState} from 'react';
import data from '../json/data.json'
import {convertDateToUTC, filteredEmptyFields, sortMethod} from "../utils/helpers";
import {DataType, FieldNameType, SortDirectionType, TablePropsType} from "../types/types";
import s from '../common/styles/Table.module.css'
import {defaultSortDirection} from "../common/variables/sortDirectionVariables";

export const ArrivalTable: FC<TablePropsType> = ({children}) => {

    const [sortArrData, setSortArrData] = useState<DataType[]>(convertDateToUTC(data, 'schedArr'))
    const [sortDirection, setSortDirection] = useState<SortDirectionType>(defaultSortDirection)
    const [windowScreen, setWindow] = useState<number | null>(window.innerWidth)
    const isTablet = (windowScreen || 0) >= 600 && (windowScreen || 0) <= 959
    const isPhone = (windowScreen || 0) <= 599

    const sortHandler = (fieldName: FieldNameType) => {
        if (sortArrData) {
            const arr = [...sortArrData]
            const sortedArr = sortMethod(arr, fieldName, sortDirection[fieldName])
            if (sortedArr) {
                setSortArrData(filteredEmptyFields(sortedArr, fieldName))
            }
        }
        setSortDirection(value => ({...value, [fieldName]: value[fieldName] === "up" ? 'down' : 'up'}));
    }

    useEffect(() => {
        window.addEventListener('resize', () => setWindow(window.innerWidth))
    }, [window.innerWidth])

    return (
        <div className={s.tableContainer}>
            <div className={s.tableTitle}><span>Arrivals | </span> {children}</div>
            <table className={s.table}>
                <tbody>
                <tr>
                    <th onClick={() => sortHandler('fnr')}>Flight number</th>

                    {isTablet ?
                        <th className={s.tabletCell}>
                            <div onClick={() => sortHandler('alname')}>Airlines</div>
                            <div onClick={() => sortHandler('schedArr')}>Arrival time</div>
                        </th> :
                        <>
                            <th onClick={() => sortHandler('alname')}>Airlines</th>
                            <th onClick={() => sortHandler('schedArr')}>Arrival time</th>
                        </>}

                    {isPhone ?
                        null
                        : <>
                            <th onClick={() => sortHandler('terminal')}>Terminal</th>
                            <th onClick={() => sortHandler('flstatus')}>Status</th>
                        </>}
                </tr>

                {sortArrData && sortArrData.map((el, index) => {
                    return (
                        <tr key={index}>
                            <td>{el.fnr}</td>

                            {isTablet
                                ? <td className={s.tabletCell}>
                                    <div className={s.opacity}>{el.alname}</div>
                                    <div>{el.schedArr}</div>
                                </td>
                                : <>
                                    <td>{el.alname}</td>
                                    <td>{el.schedArr}</td>
                                </>}

                            {isPhone
                                ? null
                                : <>
                                    <td>{el.terminal}</td>
                                    <td>{el.flstatus ? 'landed' : 'expected'}</td>
                                </>}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
};
