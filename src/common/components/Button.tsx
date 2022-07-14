import React, {FC} from 'react';

type ButtonType = {
    title: string
    callBack: () => void
    className?: string
}

export const Button: FC<ButtonType> = ({title, callBack, className}) => {
    const onClickHandler = () => {
        callBack()
    }
    return (

        <button className={className} onClick={onClickHandler}> {title} </button>

    );
};

