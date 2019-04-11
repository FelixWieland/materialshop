import React, { Component } from 'react';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        height: "calc(100vh - 86px)",
    },
    text: {
        textTransform: "uppercase",
        color: '#333333',

    },
    largerText: {
        fontSize: 120,
    },
    smallerText: {
        fontSize: 100,
    },
    centerText: {
        position: "relative",
        top: "calc(50% - 86px)",
        transform: "translateY(-50%)",
    }
});

class NotFound extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    chooseFromColors = () => {
        var colors = [
            'transparent'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root} style={{ backgroundColor: this.chooseFromColors() }}>
                <div className={classes.centerText}>
                    <Typography className={classNames(classes.text, classes.largerText)}>
                        404
                    </Typography>
                    <Typography className={classNames(classes.text, classes.smallerText)}>
                        Page not found
                    </Typography>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(NotFound);