import React, { Component } from 'react';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';
import { Typography, Fab, Icon, Dialog, AppBar, Toolbar, IconButton, Button, Divider } from '@material-ui/core';
import classNames from 'classnames';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Slide from '@material-ui/core/Slide';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';

const styles = theme => ({
    root: {
        height: "calc(100vh - 86px)",
    },
    fab: {
        margin: theme.spacing.unit,
        position: "fixed",
        zIndex: 10000000,
        bottom: 15,
        right: 15,
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
    },
    dialog: {
        width: "60%",
        marginLeft: "20%",
    },
    appBar: {
        position: 'relative',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
    },
    order: {
        top: 'auto',
        bottom: 0,
        //height: 50,
    },
    grow: {
        flexGrow: 1,
        textAlign: "right",
        paddingRight: 10,
        fontSize: 20,
    },
    total: {
        fontWeight: 700,
        fontSize: "110%",
    },
    margin: {
        marginRight: 5,
        marginLeft: 5,
        fontSize: 5,
        backgroundColor: "transparent",
        boxShadow: "none",
        color: "#333333",
        '&:hover': {
            color: "#FFFFFF",
        }
    },
    flex: {
        marginLeft: 10,
    },
    badge: {

    }
});

const TAX_RATE = 0.07;

class Shoppingcart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            gesprice: 99.00,
            items: [
                /*['Paperclips (Box)', 100, 1.15],
                ['Paper (Case)', 10, 45.99],
                ['Waste Basket', 2, 17.99],*/
            ]
        };
    }

    componentWillReceiveProps = () => {
        this.setState({ items: this.props.items });
    }

    invoiceTotal = () => {
        return this.subtotal(this.state.items.map((row, id) => this.createRow(id, ...row)));
    }

    toggle = () => {
        if (this.state.open) {
            this.handleClose()
        } else {
            this.handleOpen()
        }
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    Transition = (props) => {
        return <Slide direction="up" {...props} />;
    }

    ccyFormat = (num) => {
        console.log(num);
        num = parseFloat(num)
        return `${num.toFixed(2)}`;
    }

    priceRow = (qty, unit) => {
        return qty * unit;
    }

    createRow = (id, desc, qty, unit) => {
        const price = this.priceRow(qty, unit);
        return { id, desc, qty, unit, price };
    }

    subtotal = (items) => {
        return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
    }

    addQuantity = (id) => {
        var newQuantity = this.state.items[id][1];
        newQuantity += 1;
        var items = this.state.items;
        items[id][1] = newQuantity
        this.setState({ items: items })
    }

    removeQuantity = (id) => {
        var newQuantity = this.state.items[id][1];
        if (newQuantity == 1) {
            this.deleteRow(id);
            return;
        }
        var items = this.state.items;
        newQuantity -= 1;
        items[id][1] = newQuantity
        this.setState({ items: items })
    }

    deleteRow = (id) => {
        var items = this.state.items;
        items.splice(id, 1)
        this.setState({ items: items });
    }

    getBadgeCount = () => {
        var rows = this.state.items;
        var count = 0;
        for (var i in rows) {
            count += rows[i][1];
        }
        return count;
    }

    render() {
        const { classes } = this.props;

        var icon = this.state.open ? (<Icon>close</Icon>) : (<Icon>shopping_cart</Icon>)

        const floatingShoppingcart = () => {
            return (
                <Fab color="primary" aria-label="Add" onClick={this.toggle} className={classes.fab}>
                    <Badge className={classes.badge} color="primary" badgeContent={this.getBadgeCount()}>
                        {icon}
                    </Badge>
                </Fab>
            );
        }

        const buildShoppingItems = () => {
            return (
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Material</TableCell>
                            <TableCell align="right">Menge</TableCell>
                            <TableCell align="right">
                            </TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.items.map((row, id) => this.createRow(id, ...row)).map(row => (
                            <TableRow key={row.id}>
                                <TableCell>{row.desc}</TableCell>
                                <TableCell align="right">{row.qty}</TableCell>
                                <TableCell align="right">
                                    <Fab size="small" color="secondary" aria-label="Add" onClick={() => this.addQuantity(row.id)} className={classes.margin}>
                                        <Icon>add</Icon>
                                    </Fab>
                                    <Fab size="small" color="secondary" aria-label="Remove" onClick={() => this.removeQuantity(row.id)} className={classes.margin}>
                                        <Icon>remove</Icon>
                                    </Fab>
                                    <Fab size="small" color="secondary" aria-label="Delete" onClick={() => this.deleteRow(row.id)} className={classes.margin}>
                                        <Icon>delete</Icon>
                                    </Fab>
                                </TableCell>
                                <TableCell align="right">{this.ccyFormat(row.price)} €</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell rowSpan={4} />
                            <TableCell colSpan={2} className={classes.total} >Gesamt</TableCell>
                            <TableCell align="right" className={classes.total} >{this.ccyFormat(this.invoiceTotal())} €</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            );
        }

        return (
            <React.Fragment>
                <Dialog fullScreen open={this.state.open} onClose={this.handleClose} className={classes.dialog} TransitionComponent={this.Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <Icon>close</Icon>
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                Warenkorb
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <List>
                        {buildShoppingItems()}
                        <AppBar className={classes.order}>
                            <Toolbar>
                                <Button variant="contained" color="secondary">
                                    Bestellen
                                </Button>

                            </Toolbar>
                        </AppBar>
                    </List>

                </Dialog>

                {floatingShoppingcart()}
            </React.Fragment >
        );
    }
}

/*
 <Typography variant="h3" className={classes.grow}>
                                    Gesamter Preis: {this.state.gesprice} €
                                </Typography>
*/

export default withStyles(styles)(Shoppingcart);