import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import CGrid from '../CGrid';

const styles = theme => ({
    root: {
        marginBottom: 50,
    },
    container: {
        marginLeft: 0,
    },
    coloredElement: {
        backgroundColor: theme.palette.primary.main,
    }
});

class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>

                <Grid container justify="center" spacing={16} className={classes.container}>
                    <Grid item xs={12}>
                        test
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        test
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        test
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        test
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        test
                    </Grid>
                </Grid>
            </React.Fragment >
        );
    }
}

export default withStyles(styles)(Homepage);