import React, {Component, Fragment} from "react";
import "typeface-roboto";
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CardMedia from '@material-ui/core/CardMedia';
import CartIcon from '@material-ui/icons/AddShoppingCart';
import BackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

import { withSnackbar } from 'notistack';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const styles = theme => ({
    root: {
      width: '100%',
      overflowX: 'auto'
    },
    table: {
      minWidth: 700,
    },
    media: {
        maxWidth: 400,
    },
    padding: {
        marginLeft: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    texto: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 3,
    },
  });

class DetalleProducto extends Component{

    state = {
        producto: {},
        companyProducts:[],
        textoCarga: 'Cargando producto...'
    }

    async componentWillMount(){
        let companyProducts = await this.props.getCompanyProductsByProduct(this.props.productId);
        let producto = await this.props.getProductById(this.props.productId);

        let textoCarga = '', cargaTerminada = false;
        if(companyProducts.length === 0){
            cargaTerminada = true;
            textoCarga = 'No hay compañias que vendan este producto aun.';
        }

        await this.setState({
            companyProducts: companyProducts,
            producto: producto,
            textoCarga,
            cargaTerminada
        });
    }

    agregarAlCarrito = (i) => {
        this.props.agregarAlCarrito(this.state.companyProducts[i]);
    }

    volverAtras = () => {
        history.goBack();
    }

    render(){
        const { classes } = this.props;

        return (
            <Fragment>
                {this.state.companyProducts.length === 0 ? (
                    <div className={classes.texto}>
                        <Typography variant='h6' className={classes.texto}>
                            {this.state.textoCarga}
                        </Typography>
                        {this.state.cargaTerminada ? (
                            <Button onClick={this.volverAtras}>
                                <BackIcon />
                                Volver
                            </Button>
                        ) : <CircularProgress className={classes.progress} />}
                    </div>
                ) : (
                    <Paper className={classes.root}>
                        <div className={classes.padding}>
                            <Typography variant='h4'>{this.state.producto.name}</Typography>
                            <div>
                                <CardMedia
                                    component='img'
                                    height='10%'
                                    width='20%'
                                    className={classes.media}
                                    src={`${this.state.producto.imageUrl}`}
                                    title={this.state.producto.name}
                                />
                            </div>
                        </div>
                        <Divider variant="middle" />
                        {this.state.producto.categories ? (
                            <div className={classes.padding}>
                                <Typography variant='h6'>Categorias</Typography>
                                <div>
                                    {this.state.producto.categories.map(c => (
                                        <Chip key={c.id} label={c.name} className={classes.chip} />
                                    ))}
                                </div>
                            </div>
                        ) : null}
                        <Divider variant="middle" />
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                    </TableCell>
                                    <TableCell>
                                        Empresa
                                    </TableCell>
                                    <TableCell>
                                        Nombre
                                    </TableCell>
                                    <TableCell>
                                        Precio
                                    </TableCell>
                                    <TableCell>
                                        Descripcion
                                    </TableCell>
                                    {this.props.loggedCompany !== 0 ? (
                                        <TableCell>
                                            Acciones
                                        </TableCell>
                                    ) : null}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.companyProducts.map((product, i) => (
                                    <TableRow key={i}>
                                        <TableCell padding="checkbox">
                                        </TableCell>
                                        <TableCell>
                                            {product.companyName}
                                        </TableCell>
                                        <TableCell>
                                            {product.name}    
                                        </TableCell>
                                        <TableCell>
                                            ${product.price}    
                                        </TableCell>
                                        <TableCell>
                                            {product.description}    
                                        </TableCell>
                                        <TableCell>
                                        {product.companyId !== this.props.loggedCompany && this.props.loggedCompany !== 0 ? (
                                            <Button size="small" color="primary" 
                                            onClick={()=> this.agregarAlCarrito(i)}>
                                            <CartIcon className={classes.leftIcon} />
                                            Agregar
                                        </Button>
                                        ) : null}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                )}
            </Fragment>
        );
    }
}
DetalleProducto.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withSnackbar(DetalleProducto));