import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        //boxShadow: "none",
        zIndex: theme.zIndex.drawer + 2,
    },
    logo: {
        height: 25,
    },
    grow: {
        flexGrow: 1,
        textAlign: "right",
        fontWeight: 700,
        paddingTop: 3,
    },

});

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navbar: false,
        };
    }

    render() {
        const { classes } = this.props;

        var currentClass = this.state.navbar ? classes.extended : classes.hidden;

        return (
            <AppBar position="fixed" className={classes.root}>
                <Toolbar>
                    <img className={classes.logo} src="https://www.suedpack.com/typo3conf/ext/abdskin/Resources/Public/Images/suedpack-logo.svg" />
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Materialshop
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Navbar);