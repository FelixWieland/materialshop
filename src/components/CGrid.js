import React, { Component } from 'react';
import { Grid } from "@material-ui/core";


const CGrid = (props) => {

    if (props.item != undefined) {
        return (
            <Grid classNames={props.classNames} item style={{ padding: 10 }}>
                {props.children}
            </Grid>
        )
    }
    if (props.container != undefined) {
        return (
            <Grid classNames={props.classNames} container spacing={props.spacing} justify="center">
                {props.children}
            </Grid>
        )
    }
    return (<React.Fragment />);

}

export default CGrid;