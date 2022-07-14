import React, {useState} from 'react';
import {ArrivalTable} from "./ArrivalTable";
import {Button} from "../common/components/Button";
import {DepartureTable} from "./DepartureTable";
import s from "../common/components/Button.module.css";

export const AirportTable = () => {

    const [showTable, setShowTable] = useState(true)

    return (
        <>
            {showTable
                ? <><ArrivalTable>
                    <Button className={s.button} title={'Departures'} callBack={() => {
                        setShowTable(!showTable)
                    }}/>
                </ArrivalTable></>
                : <><DepartureTable>
                    <Button className={s.button} title={'Arrivals'} callBack={() => {
                        setShowTable(!showTable)
                    }}/>
                </DepartureTable></>}
        </>
    );
};

