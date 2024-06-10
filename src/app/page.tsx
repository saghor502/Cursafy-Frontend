'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import userDataService from '../services/user.service'
import { usuario } from '@/services/interface'
import { Select } from 'antd'
import UserLabel from '@/components/usersLabel/UserLabel'
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/modal'

export default function Home() {
	const [loading, isLoading] = useState(false)

	const [paises, setPaises] = useState<string[]>([])
	const [estados, setEstados] = useState<string[]>([])
	const [competencias, setCompetencias] = useState<string[]>([])

	const [usuarios, setUsuarios] = useState<usuario[]>([])
	const [selectedUser, setSelectedUser] = useState<usuario>()

	const [selectedPais, setSPais] = useState<string>()
	const [selectedEstados, setSEstados] = useState<string[]>([])
	const [selectedCompetencias, setSComp] = useState<string[]>([])

	const [isMexican, setIsMexican] = useState(false)

	const { isOpen, onOpen, onClose } = useDisclosure()

	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if ((event.target as Element).classList.contains('overlay')) {
			onClose()
		}
	}

	useEffect(() => {
		onOpen()
	}, [selectedUser])

	const handleSubmit = () => {
		isLoading(true)
		selectedPais
			? selectedCompetencias.length != 0
				? isMexican
					? selectedEstados.length != 0
						? userDataService
								.getUsuarios(
									selectedPais,
									selectedEstados,
									selectedCompetencias
								)
								.then((response) => {
									setUsuarios(response.data.usuarios)
								})
								.catch(() => {
									alert(
										'Error intentando mandar los datos, porfavor intente más tarde.'
									)
								})
						: alert('Porfavor señale los estados requeridos.')
					: userDataService
							.getUsuarios(selectedPais, selectedEstados, selectedCompetencias)
							.then((response) => {
								setUsuarios(response.data.usuarios)
							})
							.catch(() => {
								alert(
									'Error intentando mandar los datos, porfavor intente más tarde.'
								)
							})
				: alert('Porfavor señale las competencias requeridas.')
			: alert('Porfavor ingrese un país.')

		isLoading(false)
	}

	useEffect(() => {
		userDataService
			.getPaises()
			.then((response) => {
				let temp = []
				for (var i in response.data.Paises) {
					temp.push(response.data.Paises[i].pais)
				}
				setPaises(temp)
				return
			})
			.catch((error) => {
				console.log(error)
			})
		userDataService
			.getEstados()
			.then((response) => {
				let temp = []
				for (var i in response.data.Estados) {
					temp.push(response.data.Estados[i].estado)
				}
				setEstados(temp)
				return
			})
			.catch((error) => {
				console.log(error)
			})
		userDataService
			.getCompetencias()
			.then((response) => {
				let temp = []
				for (var i in response.data.Competencias) {
					temp.push(response.data.Competencias[i].comp)
				}
				setCompetencias(temp)
				return
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	useEffect(() => {
		if (selectedPais == 'Mexico') {
			setIsMexican(true)
		} else {
			setIsMexican(false)
		}
	}, [selectedPais])

	return (
		<main>
			{isOpen && <div className="overlay" onClick={handleOverlayClick}></div>}
			<div className="navbar">
				<div className="link">
					<Link href="../">
						<img src="./cursafyLogo.png" alt="Coursafy Logo" />
					</Link>
				</div>
			</div>

			<div className="searchbar">
				<div className="searchbar-item">
					<Select
						size="large"
						style={{
							width: '100%',
							height: '70px',
							overflow: 'hidden',
							backgroundColor: 'white',
							borderRadius: '10px',
						}}
						placeholder="Pais"
						onChange={(selectedValue) => {
							setSPais(selectedValue)
						}}
					>
						{paises.map((pais, index) => {
							return (
								<Select.Option key={index} value={pais}>
									{pais}
								</Select.Option>
							)
						})}
					</Select>
				</div>
				<div className="searchbar-item">
					<Select
						size="large"
						style={{
							width: '100%',
							height: '70px',
							overflow: 'hidden',
							backgroundColor: isMexican ? 'white' : 'transparent',
							borderRadius: '10px',
						}}
						mode="multiple"
						placeholder="Estados"
						disabled={!isMexican}
						onChange={(selectedValues) => {
							setSEstados(selectedValues)
						}}
					>
						{estados.map((estado, index) => {
							return (
								<Select.Option key={index} value={estado}>
									{estado}
								</Select.Option>
							)
						})}
					</Select>
				</div>
				<div className="searchbar-item">
					<Select
						size="large"
						style={{
							width: '100%',
							height: '70px',
							overflow: 'hidden',
							backgroundColor: 'white',
							borderRadius: '10px',
						}}
						mode="multiple"
						placeholder="Competencias"
						onChange={(selectedValues) => {
							setSComp(selectedValues)
						}}
					>
						{competencias.map((competencia, index) => {
							return (
								<Select.Option key={index} value={competencia}>
									{competencia}
								</Select.Option>
							)
						})}
					</Select>
				</div>
			</div>
			<div className="searchbar">
				<button type="button" onClick={handleSubmit} className="button">
					Generate
				</button>
			</div>

			<div className="labelContainer">
				<div className="usercontainer">
					{loading ? (
						<div style={{ textAlign: 'center' }}>
							<p style={{ fontSize: 'xx-large' }}>Loading...</p>
						</div>
					) : (
						<div>
							{usuarios.map((usuario, index) => (
								<div onClick={() => setSelectedUser(usuario)}>
									<UserLabel
										id={index}
										name={usuario.nombre}
										email={usuario.email}
										telefono={usuario.telefono}
										porcentaje={usuario.porcentaje}
									/>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
			<div>
				<Modal backdrop="opaque" isOpen={isOpen} className="customModal">
					<ModalContent className="customModalContent">
						<>
							<ModalHeader className="flex flex-col gap-1">
								<p style={{ fontSize: 'x-large', display: 'inline-grid' }}>
									{selectedUser?.nombre}
								</p>
							</ModalHeader>
							<ModalBody>
								<div>
									<p style={{ display: 'inline-grid', paddingRight: '50px' }}>
										{selectedUser?.telefono}
									</p>
									<p style={{ display: 'inline-grid' }}>
										{selectedUser?.email}
									</p>
								</div>
								<div
									style={{
										overflowY: 'scroll',
										height: '100px',
										padding: '25px',
									}}
								>
									{selectedUser?.cursos.map((curso, index) => (
										<div
											style={{
												display: 'flex',
												alignItems: 'flex-end',
											}}
										>
											<p
												id={index.toString()}
												style={{
													padding: '10px',
													fontWeight: 'bolder',
													fontSize: 'large',
												}}
											>
												{index}
											</p>
											<p id={index.toString()}>{curso.curso}</p>
										</div>
									))}
								</div>
							</ModalBody>
						</>
					</ModalContent>
				</Modal>
			</div>
		</main>
	)
}
