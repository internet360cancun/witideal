/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import useStyles from './styles'
import { Grid, TextField, Button, Checkbox, FormControlLabel, MuiThemeProvider,  useMediaQuery } from '@material-ui/core'
import { theme, ExtraNumberContent } from './styles'
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@material-ui/icons'
import GoogleFace from './googleface';
import styled from 'styled-components';
import { promoterType } from '../../constants';


const FormControlLabelStyled = styled(FormControlLabel)`
  .gray {
    color: #4e4e4ebf;
    font-weight: bold;
    font-size: .8em;
    font-style: italic;
  }
`
const ResgisterPromoter = props => {
  const classes = useStyles()
  const isMobile = useMediaQuery('(max-width:800px)')
  
  return (
    <> 
      
      {/* {props.values.promoter && (
        <Box pt={2} pb={2}>
          <Typography style={{ fontWeight: 'bold' }} align='center' variant={isMobile ? 'h6' : 'h5'}>Ingresa tus datos</Typography>
          <Typography style={{ fontWeight: 'bold', color: 'var(--blue)' }} align='center' variant={isMobile ? 'h6' : 'h5'} >para empezar a anunciar</Typography>
          <Typography style={{ fontWeight: 'bold' }} align='center' variant={isMobile ? 'h6' : 'h5'}>tus inmuebles</Typography>
        </Box>
      )} */}
      <GoogleFace
        federated={props.federated}
        handleLogInG = {props.handleLogInG}
      />
      
      <Grid item  xs={10} md={8} >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              className={classes.textField}
              id="user-name"
              label="Nombre"
              onChange={props.onChange}
              value={props.values.name !== undefined ? props.values.name : ''}
              type="text"
              name="name"
              margin="dense"
              variant="outlined"
              fullWidth={true}
              onBlur={props.onBlur}
              error={props.errors.name !== undefined}
              helperText={props.errors.name !== undefined ? props.errors.name : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              
              value={props.values.lastname !== undefined ? props.values.lastname : ''}
              onChange={props.onChange}
              id="user-lastname"
              label="Apellido"
              className={classes.textField}
              type="text"
              name="lastname"
              margin="dense"
              variant="outlined"
              fullWidth={true}
              onBlur={props.onBlur}
              error={props.errors.lastname !== undefined}
              helperText={props.errors.lastname !== undefined ? props.errors.lastname : ''}
            />
          </Grid>
        
        </Grid>

        <TextField
          className={classes.textField}
          
          onChange={props.onChangePhone}
          value={props.values.phone || ''}
          id="user-cellphone"
          label="Celular"
          
          name="phone"
          margin="dense"
          variant="outlined"
          fullWidth={true}
          onBlur={props.onBlur}
          error={props.errors.phone !== undefined}
          helperText={props.errors.phone !== undefined ? props.errors.phone : 'Teléfono principal'}
        />
        {props.extraPhones.map((phone, index) => (
          <ExtraNumberContent key={index}>
            <TextField
              error={props.extraPhoneErrors.includes(index.toString())}
              onFocus={props.onRemoveExtraPhoneError}
              label="Teléfono"
              className={classes.textField}
              onChange={props.onChangeExtraPhones}
              value={phone}
              type="text"
              name={index.toString()}
              margin="dense"
              variant="outlined"
              fullWidth={true}
            />
            <Delete onClick={() => props.onDeleteExtraPhone(index)} />
          </ExtraNumberContent>
        ))}
        {props.extraPhones.length < 2 && (
          <Button onClick={props.addExtraPhones} style={{ display: 'block', margin: 'auto', textTransform: 'none', fontWeight: 'bold' }} size='small' variant='text' color='primary'>Agregar más números</Button>
        )}
        {props.federated && (
          <TextField
            className={classes.textField}
            onChange={props.onChange}
            id="user-email"
            label="Correo Electrónico"
            value={props.values.email !== undefined ? props.values.email : ''}
            disabled={true}
            type="email"
            name="email"
            autoComplete="email"
            margin="dense"
            variant="outlined"
            fullWidth={true}
            onBlur={props.onBlur}
            error={props.errors.email !== undefined}
            helperText={props.errors.email !== undefined ? props.errors.email : ''}
            
          />
        )}
        {!props.federated && (
          <React.Fragment>
            <TextField
              className={classes.textField}
              onChange={props.onChange}
              id="user-email"
              label="Correo Electrónico"
              value={props.values.email !== undefined ? props.values.email : ''}
              disabled={false}
              type="email"
              name="email"
              autoComplete="email"
              margin="dense"
              variant="outlined"
              fullWidth={true}
              onBlur={props.onBlur}
              error={props.errors.email !== undefined}
              helperText={props.errors.email !== undefined ? props.errors.email : ''}
              
            />
            <TextField
              className={classes.textField}
              onChange={event => props.onRemailChange(event.target.value)}
              id="re_user-email"
              label="Confirmar Correo Electrónico"
              value={props.remail}
              onPaste={event => setTimeout(() => props.onRemailChange(''), 10)}
              disabled={false}
              type="email"
              name="email"
              autoComplete="email"
              margin="dense"
              variant="outlined"
              fullWidth={true}
              onBlur={() => props.onErrorRemail(false)}
              error={props.errorReMail}
              
            />
            <TextField
              className={classes.textField}
              onChange={props.onChange}
              onBlur={props.onBlur}
              value={props.values.password !== undefined ? props.values.password : ''}
              error={props.errors.password !== undefined}
              helperText={props.errors.password !== undefined ? props.errors.password : ""}
              id="user-password"
              variant="outlined"
              type={props.ShowPass ? 'text' : 'password'}
              label="Contraseña"
              name='password'
              margin="dense"
              fullWidth={true}
              
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={props.handleClickShowPassword}
                      onMouseDown={props.handleMouseDownPassword} >
                      {props.ShowPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className={classes.textField}
              onChange={props.onChange}
              onBlur={props.onBlur}
              value={props.values.cpassword !== undefined ? props.values.cpassword : ''}
              error={props.errors.cpassword !== undefined}
              helperText={props.errors.cpassword !== undefined ? props.errors.cpassword : ""}
              id="user-confirm-password"
              variant="outlined"
              type={props.ShowCPass ? 'text' : 'password'}
              label="Confirmar Contraseña"
              name='cpassword'
              margin="dense"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={props.handleClickShowCPassword}
                      onMouseDown={props.handleMouseDownPasswordConfirm}
                    >
                      {props.ShowCPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </React.Fragment>
        )}
        {props.values.promoter && (
          <TextField
            id="user-company-name"
            label="Nombre Inmobiliaria"
            className={classes.textField}
            onChange={props.onChange}
            value={props.values.companyName || promoterType[props.values.promoterType]}
            type="text"
            name="companyName"
            margin="dense"
            variant="outlined"
            fullWidth={true}
            onBlur={props.onBlur}
            helperText="Opcional"
            disabled
          />
        )}

        <Grid container spacing={0}>
          {props.values.promoter && (
            <Grid item xs={12}>
              <MuiThemeProvider theme={theme}>
                <FormControlLabelStyled
                  control={
                    <Checkbox
                      className={classes.borderColorRadioAndCheck}
                      checked={props.showMainPhone}
                      onChange={props.onChangeShowMainPhone}
                      name='mainphone'
                      color="primary"
                    />
                  }
                  className={classes.checkBox}
                  label={<span className='gray'>Mostrar teléfono principal como dato de contacto</span>}
                />
              </MuiThemeProvider>
            </Grid>
          )}

          <Grid item xs={12}>
            <MuiThemeProvider theme={theme}>
              <FormControlLabelStyled
                control={
                  <Checkbox
                    className={classes.borderColorRadioAndCheck}
                    checked={props.values.notify}
                    onChange={props.onChange}
                    name='notify'
                    color="primary"
                  />
                }
                className={classes.checkBox}
                label={<span className='gray'>Recibir correos y notificaciones.</span>}
              />
            </MuiThemeProvider>
          </Grid>

          <Grid item xs={12}>
            <MuiThemeProvider theme={theme}>
              <FormControlLabelStyled
                control={
                  <Checkbox
                    className={classes.borderColorRadioAndCheck}
                    checked={props.values.termsNconditions}
                    onChange={props.onChange}
                    name='termsNconditions'
                    color="primary"
                  />
                }
                className={classes.checkBox}
                label={<span className='gray'>Acepto términos y condiciones</span>}
              />
            </MuiThemeProvider>
          </Grid>
        </Grid>
      </Grid >

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <Button
              fullWidth
              id='btn_create'
              onClick={props.handleClickCreate}
              className={classes.buttonLogIn}
              variant='contained'
              disabled={!props.values.termsNconditions}
              size={isMobile ? 'medium' : 'large'}>Crear Cuenta
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default ResgisterPromoter