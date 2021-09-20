/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import { setAlert } from '../../components/Alert/alert'
import { Modal, Grid, CircularProgress } from '@material-ui/core'
import styled from 'styled-components'
import PromoterType from '../../components/Register/promoterType'
import user from '../../firebase/user'
import useSession from '../../Hooks/useSession'

const ModalStyled = styled(Modal)`
	display: flex;
	justify-content: center;
	align-items: center;
`

const ModalBox = styled.div`
	outline: none;
	background: #fff;
	width: 95%;
	padding: 50px;
	max-width: 700px;
	border-radius: 10px;
	box-sizing: border-box;
	@media screen and (max-width:600px) {
		padding: 10px;
	}
`

const GridLoadingContainer = styled(Grid)`
	min-height: 250px;
`



const ChangeUserToPromoter = (WrappedComponent) => props => {
	const [isModalActive, setModal] = useState(false)
	const [currentView, setCurrentView] = useState('form')
	const session = useSession()

	useEffect(() => {
		if (!isModalActive) setCurrentView('form')
	}, [isModalActive])
	

	const handleClose = event => setModal(false)

	const handleOpen = event => setModal(true)

	const handleChangeIntoPromoter = event => {
		setAlert(
			handleOpen,
			'¿Quieres ser promotor?',
			'¿Estás seguro que te quieres volver promotor?',
			'information',
			'Aceptar'
		)
	}

	const handleUpdate = async ({ promoterType, companyName }) => {
		setCurrentView('loading')
		await user.changeToPromoter({ userId: session.uId, promoterType, companyName })
		await new Promise(resolve => setTimeout(resolve, 1000))
		setModal(false)
		setAlert(null, 'Éxito', 'Ya tienes cuenta promotor', 'success')
		session.refresh()
	}

	return (
		<>
			<ModalStyled open={isModalActive} onClose={handleClose} >
				<ModalBox>
					{currentView === 'form' && (<PromoterType onSet={handleUpdate} />)}
					{currentView === 'loading' && (
						<GridLoadingContainer container alignItems='center' justify='center'>
							<CircularProgress />
						</GridLoadingContainer>
					)}
				</ModalBox>
			</ModalStyled>
			<WrappedComponent {...props} onChangeToPromoter={handleChangeIntoPromoter} />
		</>
	)
}


export default ChangeUserToPromoter
