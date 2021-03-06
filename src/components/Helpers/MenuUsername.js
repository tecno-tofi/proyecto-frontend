import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import UserIcon from '@material-ui/icons/AccountCircle';
import { NavLink } from 'react-router-dom';

const styles = theme => ({
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    link: {
        color: 'inherit',
        textDecoration: 'none'
    }
});

class MenuUsername extends React.Component {
  state = {
    anchorEl: null,
  };

  logout = () => {
      this.props.logout();
      this.handleClose();
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Button
          color='inherit'
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <UserIcon className={classes.leftIcon} />
          {this.props.userName}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <NavLink to='/profile' className={classes.link}>
            <MenuItem onClick={() => {
              this.handleClose();
            }}>
                  Perfil
            </MenuItem>
          </NavLink>
          <NavLink to='/misProductos' className={classes.link}>
            <MenuItem onClick={() => {
              this.handleClose();
            }}>
                Mis productos
            </MenuItem>
          </NavLink>
          <MenuItem onClick={this.logout}>Cerrar sesion</MenuItem>
        </Menu>
      </Fragment>
    );
  }
}

MenuUsername.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(MenuUsername);