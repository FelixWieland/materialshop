import React, { Component } from 'react';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
    },
    formControl: {
        marginTop: 3,
        width: "100%",
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonProgress: {
        color: theme.palette.secondary.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

class MaterialForm extends React.Component {

    types = ["Arbeitsmaterial", "Bekleidung", "Werkzeug"];

    constructor(props) {
        super(props);
        if (this.props.data != undefined) {
            this.state = {
                name: this.props.data.Bezeichnung,
                stock: this.props.data.Menge,
                price: this.props.data.Preis,
                art: this.props.data.Typ,
                id: this.props.id,
                open: this.props.open,
                loading: false,
            };
        } else {
            this.state = {
                name: "",
                stock: "",
                price: "",
                art: "",
                id: "",
                open: this.props.open,
                loading: false,
            };
        }

    }

    materialInteraction = async (type) => {

        let dataForm;

        switch (type) {
            case "addForm":
                dataForm = {
                    data: {
                        Typ: this.state.art,
                        Bezeichnung: this.state.name,
                        Menge: this.state.stock,
                        Preis: this.state.price
                    }
                }
                break;
            default:
                dataForm = {
                    data: {
                        _id: this.state.id,
                        Typ: this.state.art,
                        Bezeichnung: this.state.name,
                        Menge: this.state.stock,
                        Preis: this.state.price
                    }
                }
                break;
        }

        this.setState({ loading: true });
        let response = await fetch('http://cockpit.cms.thewieland.de/api/collections/save/Material?token=8a8273ac322c89ff7eb77c76a3481d', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataForm)
        });
        let data = await response.json();
        this.setState({ loading: false });

        switch (type) {
            case "addForm":
                this.props.addResponse(data);
                break;
            default:
                this.props.updateResponse(data);
                break;
        }
        this.toggleDialog();
    }

    materialDeletion = async () => {
        this.setState({ loading: true });
        let response = await fetch('http://cockpit.cms.thewieland.de/api/collections/remove/Material?token=8a8273ac322c89ff7eb77c76a3481d', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                filter: {
                    _id: this.state.id,
                }
            })
        });
        let data = await response.json();

        this.setState({ loading: false });
        if (data.success == false) {
            return;
        }

        this.props.deleteResponse({ _id: this.state.id })

    }

    toggleDialog = () => {
        this.props.toggleDialog();
    }

    handleChange = (attribute, value) => {
        this.setState({ [attribute]: value });
    }

    render() {
        const { classes } = this.props;
        console.log(this.props.data);
        console.log(this.state);
        if (this.props.type != "deleteForm") {
            return (
                <Dialog open={this.state.open} onClose={this.toggleDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            value={this.state.name}
                            onChange={(e) => this.handleChange("name", e.target.value)}
                            fullWidth
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="type">Art</InputLabel>
                            <Select
                                value={this.state.art}
                                onChange={(e) => this.handleChange("art", e.target.value)}
                                displayEmpty
                                fullWidth
                                inputProps={{
                                    name: 'Art',
                                    id: 'type',
                                }}
                                className={classes.selectEmpty}
                            >
                                {this.types.map((elm, index) => {
                                    return (
                                        <MenuItem value={elm}>{elm}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="stock"
                            label="Auf Lager"
                            type="text"
                            value={this.state.stock}
                            onChange={(e) => this.handleChange("stock", e.target.value)}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="price"
                            label="Preis"
                            type="text"
                            value={this.state.price}
                            onChange={(e) => this.handleChange("price", e.target.value)}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.toggleDialog} color="secondary">
                            Abbrechen
                        </Button>
                        <div className={classes.wrapper}>
                            <Button variant="contained" onClick={() => this.materialInteraction(this.props.type)} disabled={this.state.loading} color="secondary">
                                Speichern
                            </Button>
                            {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </DialogActions>
                </Dialog>
            );
        } else {
            return (
                <Dialog open={this.state.open} onClose={this.toggleDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Sind Sie sich sicher das Sie das Material löschen wollen?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.toggleDialog} color="secondary">
                            Nein
                        </Button>
                        <div className={classes.wrapper}>
                            <Button variant="contained" onClick={this.materialDeletion} disabled={this.state.loading}  color="secondary">
                                Ja
                            </Button>
                            {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </DialogActions>
                </Dialog>
            );
        }

    }
}

export default withStyles(styles)(MaterialForm);