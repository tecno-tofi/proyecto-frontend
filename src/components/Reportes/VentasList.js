import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
// import HCFunctions from './Functions';
import Item from './VentasItem';

class ReporteVentas extends Component{

    state = {
        transacciones: []
    }

    //Recibir data
    async componentWillMount(){
        let transacciones = await this.props.getTransactions();
        if(transacciones) this.setState({transacciones: transacciones});
    }

    //Renderizar data
    render(){
        return(
            <Fragment>
                {this.state.transacciones.map(transaction => (
                    <Item key={transaction.id} transaction={transaction} />
                ))}
            </Fragment>
        );
    }
}

export default ReporteVentas;