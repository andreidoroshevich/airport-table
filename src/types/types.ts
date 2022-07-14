import React from "react";

export type DataType = {
    ac?: string
    al?: string
    alname?: string
    apname: string
    cs?: string[]
    bag?: string[]
    length?: number
    duration?: number
    esti?: string
    flstatus?: number
    fnr: string
    gate?: any
    halle?: string
    iata?: string
    id: string
    lang?: string
    lu?: string
    reg?: string
    s?: boolean
    schalter?: string
    sched: string
    schedArr?: string
    status: string
    stops?: number
    terminal?: string
    typ?: string
}

export type DirectionType = undefined | 'up' | 'down'
export type FieldNameType =
    'fnr'
    | 'apname'
    | 'sched'
    | 'gate'
    | 'status'
    | 'flstatus'
    | 'terminal'
    | 'schedArr'
    | 'alname'
export type SortDirectionType = Record<FieldNameType, DirectionType>

export type TablePropsType = {
    children: React.ReactNode
}