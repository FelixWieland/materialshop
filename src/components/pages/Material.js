import React, { Component } from 'react';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, IconButton, Icon, CircularProgress } from '@material-ui/core';

const styles = theme => ({
    root: {

    },
    table: {
        backgroundColor: theme.palette.primary.main,
        boxShadow: theme.shadows[1],
    },
    progress: {
        marginTop: 100,
    }
});

var POSITION = 0;
var MATERIAL = undefined;

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}


class Material extends React.Component {

    constructor(props) {
        super(props);

        var mat = MATERIAL == undefined ? { arbeitsmaterial: [], bekleidung: [], werkzeug: [] } : MATERIAL;

        this.state = {
            value: POSITION,
            material: mat
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentDidMount = () => {
        this.getMaterial()
    }

    splitMaterial = (entries) => {
        //this.setState({ full: res.entries })
        var arbeitsmaterial = [];
        var werkzeug = [];
        var bekleidung = [];
        entries.map((index, elm) => {
            if (entries[elm].Typ == "Arbeitsmaterial") {
                arbeitsmaterial.push(entries[elm]);
            } else if (entries[elm].Typ == "Werkzeug") {
                werkzeug.push(entries[elm]);
            } else {
                bekleidung.push(entries[elm])
            }
        });
        MATERIAL = {
            arbeitsmaterial: arbeitsmaterial,
            bekleidung: bekleidung,
            werkzeug: werkzeug
        };
        this.setState({
            material: {
                arbeitsmaterial: arbeitsmaterial,
                bekleidung: bekleidung,
                werkzeug: werkzeug
            }
        });
    }

    getMaterial = () => {
        fetch('http://cockpit.cms.thewieland.de/api/collections/get/Material?token=8a8273ac322c89ff7eb77c76a3481d')
            .then(res => res.json())
            .then(res => this.splitMaterial(res.entries));
    }

    addToShoppingCart = (index, name) => {
        //this.state.material[name][index]

        var form = ["", 0, 0]
        var items = this.props.getShoppingCartState();
        var toadd = this.state.material[name][index]
        form[0] = toadd.Bezeichnung;
        form[1] = 1;
        form[2] = parseFloat(toadd.Preis)

        for (var i in items) {
            if (items[i][0] == toadd.Bezeichnung) {
                items[i][1] += 1;
                this.props.setShoppingCartState(items);
                return;
            }
        }

        items.push(form)
        this.props.setShoppingCartState(items);
    }

    TableTemplate = (rows, name) => {
        const classes = this.props.classes;
        return (
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Bezeichnung</TableCell>
                        <TableCell align="right">Auf Lager</TableCell>
                        <TableCell align="right">Preis pro Stück</TableCell>
                        <TableCell align="right">In den Warenkorb</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={row.index}>
                            <TableCell>{row.Bezeichnung}</TableCell>
                            <TableCell align="right">{row.Menge}</TableCell>
                            <TableCell align="right">{row.Preis} €</TableCell>
                            <TableCell align="right">
                                <IconButton aria-label="In den Einkaufswagen" onClick={() => this.addToShoppingCart(index, name)} className={classes.margin}>
                                    <Icon fontSize="small">shopping_cart</Icon>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }


    handleChange = (event, newValue) => {
        this.setState({ value: newValue })
        POSITION = newValue;
    }

    render() {
        const { classes } = this.props;
        const value = this.state.value;

        console.log(this.state);
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="Arbeitsmaterial" />
                        <Tab label="Bekleidung" />
                        <Tab label="Werkzeug" />
                    </Tabs>
                </AppBar>
                {value === 0 &&
                    <TabContainer>
                        {this.TableTemplate(this.state.material.arbeitsmaterial, "arbeitsmaterial")}
                    </TabContainer>}
                {value === 1 &&
                    <TabContainer>
                        {this.TableTemplate(this.state.material.bekleidung, "bekleidung")}
                    </TabContainer>}
                {value === 2 &&
                    <TabContainer>
                        {this.TableTemplate(this.state.material.werkzeug, "werkzeug")}
                    </TabContainer>}

                {
                    this.state.material.werkzeug.length == 0 &&
                    this.state.material.bekleidung.length == 0 &&
                    this.state.material.arbeitsmaterial.length == 0 && (
                        <CircularProgress className={classes.progress} color="secondary" />
                    )
                }
            </div>
        );
    }
}

export default withStyles(styles)(Material);