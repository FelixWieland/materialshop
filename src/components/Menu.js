import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, Icon, Divider, ListItemText } from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: 250,
        flexShrink: 0,
    },
    drawerPaper: {
        backgroundColor: theme.palette.primary.light,
        width: 250,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,

});

class Menu extends React.Component {

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
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <List>
                    <Link to="/ordermat" className="clearAll">
                        <ListItem button key={"bestmat"}>
                            <ListItemIcon><Icon>shopping_basket</Icon></ListItemIcon>
                            <ListItemText primary={"Material bestellen"} />
                        </ListItem>
                    </Link>
                    <Link to="/stdat" className="clearAll">
                        <ListItem button key={"stdat"}>
                            <ListItemIcon><Icon>ballot</Icon></ListItemIcon>
                            <ListItemText primary={"Stammdaten"} />
                        </ListItem>
                    </Link>
                    <Link to="/acceptorder" className="clearAll">
                        <ListItem button key={"stdat"}>
                            <ListItemIcon><Icon>check</Icon></ListItemIcon>
                            <ListItemText primary={"Bestellungen bestätigen"} />
                        </ListItem>
                    </Link>
                    <Link to="/lastorders" className="clearAll">
                        <ListItem button key={"stdat"}>
                            <ListItemIcon><Icon>history</Icon></ListItemIcon>
                            <ListItemText primary={"Letzte Bestellungen"} />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <ListItem button key={"exit"}>
                        <ListItemIcon><Icon>logout</Icon></ListItemIcon>
                        <ListItemText primary={"Ausloggen"} />
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

export default withStyles(styles)(Menu);