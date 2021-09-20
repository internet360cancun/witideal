//Landing button group section
import './buttons.css'
import React from 'react';

export const Buttons = (props)=>{
    let obj = props.opc.map((e,index)=>{
        return (
        <div className="col-md-5 roundButton" key={index}>
                <span>{e}</span>
        </div>);
    })
    return (
        <div className="row">
            {obj}
        </div>
    );
}