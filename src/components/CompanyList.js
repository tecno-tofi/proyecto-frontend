import React, { Component, Fragment } from 'react';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Item from './CompanyItem';
import SelectMultiple from './SelectMultiple';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        marginTop: theme.spacing.unit * 2
      }
});

class List extends Component{

    // constructor(props){
    //     super(props);
        state = {
            listado: [],
            categorias: [],
            tipos: [],
            searchName: '',
            selectedCategory: [],
            selectedType: []
        }
    // }

    async componentWillMount(){
        // console.log('companyId, mount', this.props);
        this.getInfo();
    }

    async componentWillReceiveProps(){
        // console.log('recibe', this.props);
        // console.log('flag', this.props.flag)
        this.getInfo();
    }

    async getInfo(){
        
        // let listado = [];
        // if(!this.props.company && this.props.company !== 0){
            // console.log('companyId', this.props.company);
            let listado = await this.props.getContent();
        // }
        // else
        //     listado = await this.props.getContent();
        let categorias = await this.props.getCategories();
        // let tipos = [];
        // if(this.props.flag === 'companias')
            let tipos = await this.props.getTipos();
        await this.setState({
            listado: listado,
            categorias: categorias,
            tipos: tipos
        });
    }

    onSearchNameChange = (e) => {
        this.setState({
            searchName: e.target.value
        });
    };

    handleSelectCategories = (seleccionados) => {
        let selectedCategory = seleccionados.map(selected => {
            return selected.id;
        })
        this.setState({selectedCategory: selectedCategory});
    }

    handleSelectTypes = (seleccionados) => {
        let selectedType = seleccionados.map(selected => {
            return selected.id;
        })
        this.setState({selectedType: selectedType});
    }

    render(){
        const { classes } = this.props;
        console.log('listado completo: ', this.state.listado);
        let filteredList = this.state.listado.filter((item) => {
            return item.name.toLowerCase().indexOf(this.state.searchName.toLowerCase()) !== -1;
        });

        if(this.state.selectedCategory.length > 0){
            filteredList = filteredList.filter(item => {
                console.log('categorias seleccionadas: ', this.state.selectedCategory);
                return this.state.selectedCategory.includes(item.categoryId);
            });
        }

        if(this.state.selectedType.length > 0){
            filteredList = filteredList.filter(item => {
                return this.state.selectedType.includes(item.typeId);
            })
        }

        return(
            <Fragment>
                {filteredList ? (
                    <Fragment>
                        <div className={classes.container}>
                            <TextField
                                // margin='dense'
                                className={classes.textField}
                                name='searchName'
                                placeholder='Nombre empresa'
                                onChange={this.onSearchNameChange}
                            />
                            <SelectMultiple
                                flagType={this.props.flag}
                                flagForm={false}
                                content={this.state.categorias}
                                onChange={this.handleSelectCategories}
                            />
                            {this.props.flag === 'companias' ? (
                                <SelectMultiple
                                    flagType={this.props.flag}
                                    titulo='Tipo/s'
                                    flagForm={false}
                                    content={this.state.tipos}
                                    onChange={this.handleSelectTypes}
                                />
                            ) : null}
                        </div>
                        <Grid container spacing={24} style={{padding: 24}}>
                            {filteredList.map(item => (
                                <Grid item key={item.id} xs={12} sm={6} lg={4} xl={3}>
                                    <Item item={item} flag={this.props.flag} onCompanyClick={this.props.onCompanyClick} />
                                </Grid>
                            ))}
                        </Grid>
                    </Fragment>
                ) : `No hay ${this.props.flag} registradas aun` }
            </Fragment>
        );
    }
}

List.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(List);