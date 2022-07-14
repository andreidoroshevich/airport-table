import React, {FC, useEffect, useState} from 'react';
import data from '../json/data.json'
import {convertDateToUTC, filteredEmptyFields, sortMethod} from "../utils/helpers";
import {DataType, FieldNameType, SortDirectionType, TablePropsType} from "../types/types";
import s from '../common/styles/Table.module.css'
import {defaultSortDirection} from "../common/variables/sortDirectionVariables";

export const DepartureTable: FC<TablePropsType> = ({children}) => {

    const [sortDepData, setSortDepData] = useState<DataType[] | undefined>(convertDateToUTC(data, 'sched'))
    const [sortDirection, setSortDirection] = useState<SortDirectionType>(defaultSortDirection)
    const [windowScreen, setWindow] = useState<number | null>(window.innerWidth)
    const isTablet = (windowScreen || 0) >= 600 && (windowScreen || 0) <= 959
    const isPhone = (windowScreen || 0) <= 599

    const sortHandler = (fieldName: FieldNameType) => {
        if (sortDepData) {
            const arr = [...sortDepData]
            const sortedArr = sortMethod(arr, fieldName, sortDirection[fieldName])
            if (sortedArr) {
                setSortDepData(filteredEmptyFields(sortedArr, fieldName))
            }
        }
        setSortDirection(value => ({...value, [fieldName]: value[fieldName] === "up" ? 'down' : 'up'}));
    }

    useEffect(() => {
        window.addEventListener('resize', () => setWindow(window.innerWidth))
    }, [window.innerWidth])

    return (
        <div className={s.tableContainer}>
            <div className={s.tableTitle}><span>Departures | </span> {children}</div>
            <table className={s.table}>
                <tbody>
                <tr>
                    <th onClick={() => sortHandler('fnr')}>Flight number</th>

                    {isTablet ?
                        <th className={s.tabletCell}>
                            <div onClick={() => sortHandler('apname')}>Flight destination</div>
                            <div onClick={() => sortHandler('sched')}>Departure time</div>
                        </th> :
                        <>
                            <th onClick={() => sortHandler('apname')}>Flight destination</th>
                            <th onClick={() => sortHandler('sched')}>Departure time</th>
                        </>}

                    {isPhone
                        ? null
                        :<>
                            <th onClick={() => sortHandler('gate')}>Departure gate</th>
                            <th onClick={() => sortHandler('status')}>Status</th>
                        </>}
                </tr>

                {sortDepData && sortDepData.map((el, index) => {
                    return (
                        <tr key={index}>
                            <td>{el.fnr}</td>

                            {isTablet
                                ? <td className={s.tabletCell}>
                                    <div className={s.opacity}>{el.apname}</div>
                                    <div>{el.sched}</div>
                                </td>
                                : <>
                                    <td>{el.apname}</td>
                                    <td>{el.sched}</td>
                                </>}

                            {isPhone
                                ? null
                                : <>
                                    <td>{el.gate}</td>
                                    <td>{el.status}</td>
                                </>}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
};
