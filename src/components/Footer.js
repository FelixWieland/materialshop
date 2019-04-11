import React, { Component } from 'react';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        height: 150,
        width: "100%",
        backgroundColor: theme.palette.primary.main,
    },
    grid: {
        height: "100%",
    },
    fullHeight: {
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
        fontWeight: 600,
    }

});

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            copyright: "Copyright © 2019, Felix Wieland.",
        };
    }


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid className={classes.grid} container justify="center">
                    <Grid item>
                        <Typography className={classes.fullHeight}>
                            {this.state.copyright}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Footer);