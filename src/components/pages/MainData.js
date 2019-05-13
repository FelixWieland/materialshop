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
import { Button, IconButton, Icon, Toolbar } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import MaterialForm from '../MaterialForm';

const styles = theme => ({
    root: {

    },
    table: {
        backgroundColor: theme.palette.primary.main,
        boxShadow: theme.shadows[1],
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade("#d2d2d2", 0.55),
        '&:hover': {
            backgroundColor: fade("#d2d2d2", 0.75),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            //marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    btn: {
        marginRight: 10,
    },
    progress: {
        marginTop: 100,
    }
});

var POSITION = 0;
var MATERIAL = undefined;


class MainData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: POSITION,
            material: [],
            searchValue: "",
            selected: undefined,
            dialog: false,
            dialogType: "",
            addForm: {
                id: "",
                name: "",
                stock: "",
                price: "",
            },
            editForm: {
                name: "",
                stock: "",
                price: ""
            }
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentDidMount = () => {
        this.getMaterial()
    }

    splitMaterial = (entries) => {
        this.setState({
            material: entries,
        });
    }

    getMaterial = () => {
        fetch('http://cockpit.cms.thewieland.de/api/collections/get/Material?token=8a8273ac322c89ff7eb77c76a3481d')
            .then(res => res.json())
            .then(res => this.splitMaterial(res.entries));
    }

    updateResponse = (data) => {
        for (var i = 0; i < this.state.material.length; i++) {
            if (this.state.material[i]._id == data._id) {
                var copy = this.state.material;
                copy[i] = data;
                this.setState({ material: copy });
                return;
            }
        }
    }

    addResponse = (data) => {
        var copy = this.state.material;
        copy.push(data)
        this.setState({ material: copy });
    }

    deleteResponse = (data) => {
        var copy = this.state.material;
        copy = copy.filter((elm) => {
            return data._id != elm._id;
        });
        this.setState({ material: copy });
    }

    selectRow = (key) => {
        if (key == this.state.selected) {
            this.setState({ selected: undefined });
            return;
        }
        this.setState({ selected: key });

        this.setState({
            editForm: {
                name: this.state.material[key].Bezeichnung,
                stock: this.state.material[key].Menge,
                price: this.state.material[key].Preis,
            }
        });
        console.log(key);
    }

    toggleDialog = (dialogType) => {
        if (this.state.dialogType != "") {
            this.setState({ dialog: !this.state.dialog, dialogType: "" });
        } else {
            this.setState({ dialog: !this.state.dialog, dialogType: dialogType });
        }
    }

    materialDialog = () => {
        var title, type, row, index, id;
        switch (this.state.dialogType) {
            case "addForm":
                title = "Material hinzufügen";
                break;
            case "editForm":
                type = this.state.dialogType;
                index = this.state.selected;
                row = this.state.material[index];
                id = row["_id"];
                title = "Material bearbeiten";
                break;
            default:
                if (this.state.selected == undefined) return;
                index = this.state.selected;
                row = this.state.material[index];
                if (row == undefined) return;
                id = row["_id"];
                title = "Material löschen";
                break;
        }

        if (this.state.dialogType.length == 0) return;
        return (<MaterialForm
            id={id}
            type={this.state.dialogType}
            data={row}
            open={this.state.dialog}
            updateResponse={this.updateResponse}
            addResponse={this.addResponse}
            deleteResponse={this.deleteResponse}
            toggleDialog={this.toggleDialog}
            title={title} />);
    }

    render() {
        const { classes } = this.props;
        const value = this.state.value;

        console.log(this.state);

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Suchen..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={this.state.searchValue}
                                onChange={(e) => this.setState({ searchValue: e.target.value })}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                <AppBar position="static">
                    <Toolbar>
                        <Button className={classes.btn} variant="contained" color="secondary" onClick={() => this.toggleDialog("addForm")}>Material hinzufügen</Button>
                        <Button className={classes.btn} variant="contained" color="secondary" disabled={this.state.selected == undefined} onClick={() => this.toggleDialog("editForm")}>Material bearbeiten</Button>
                        <Button className={classes.btn} variant="contained" color="secondary" disabled={this.state.selected == undefined} onClick={() => this.toggleDialog("deleteForm")} >Material löschen</Button>
                    </Toolbar>
                </AppBar>
                <br />
                {this.state.material.length == 0 && (
                    <CircularProgress className={classes.progress} color="secondary" />
                )}
                {this.state.material.length != 0 && (
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Bezeichnung</TableCell>
                                <TableCell align="right">Art</TableCell>
                                <TableCell align="right">Auf Lager</TableCell>
                                <TableCell align="right">Preis pro Stück</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.material.map((row, index) => {
                                if (!row.Bezeichnung.startsWith(this.state.searchValue)) {
                                    return;
                                }
                                return (
                                    <TableRow selected={this.state.selected == index} key={index} onClick={() => this.selectRow(index)}>
                                        <TableCell>{row.Bezeichnung}</TableCell>
                                        <TableCell align="right">{row.Typ}</TableCell>
                                        <TableCell align="right">{row.Menge}</TableCell>
                                        <TableCell align="right">{row.Preis} €</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
                {this.materialDialog()}
            </div >
        );
    }
}

export default withStyles(styles)(MainData);