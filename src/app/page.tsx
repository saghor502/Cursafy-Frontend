'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import userDataService from '../services/user.service'
import { usuario } from '@/services/interface'
import Dropdown from '@/components/dropdown/Dropdown'
import { isMap } from 'util/types'
import UserLabel from '@/components/usersLabel/UserLabel'

export default function Home() {
	const [paises, setPaises] = useState<string[]>()
	const [estados, setEstados] = useState<string[]>([])
	const [competencias, setCompetencias] = useState<string[]>([])
	const [usuarios, setUsuarios] = useState<usuario[]>([])

	const [loading, isLoading] = useState(false)

	let selectedPais: string = ''
	let selectedEstados: string[] = []
	let selectedCompetencias: string[] = []
	let selectedNivelEducativo: string = ''

	const [isMexican, setIsMexican] = useState(false)

	useEffect(() => {
		userDataService
			.getPaises()
			.then((response) => {
				setPaises(response.data)
				return
			})
			.catch((error) => {
				console.log(error)
			})
		userDataService
			.getEstados()
			.then((response) => {
				setEstados(response.data)
				return
			})
			.catch((error) => {
				console.log(error)
			})
		userDataService
			.getCompetencias()
			.then((response) => {
				setCompetencias(response.data)
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

	const handleCountry = (value: string) => {
		selectedPais = value
	}
	const handleStates = (values: string[]) => {
		selectedEstados = values
	}
	const handleCompetencias = (values: string[]) => {
		selectedCompetencias = values
	}
	const handleLevel = (value: string) => {
		selectedNivelEducativo = value
	}

	const handleSubmit = () => {
		isLoading(true)
		selectedPais
			? selectedCompetencias
				? selectedNivelEducativo
					? isMexican
						? selectedEstados
							? userDataService
									.getUsuarios(
										selectedPais,
										selectedCompetencias,
										selectedNivelEducativo
									)
									.then((response) => {
										setUsuarios(response.data)
									})
									.catch(() => {
										alert(
											'Error found while sending data: Please try again later.'
										)
									})
							: userDataService
									.getUsuariosMexicanos(
										selectedPais,
										selectedEstados,
										selectedCompetencias,
										selectedNivelEducativo
									)
									.then((response) => {
										setUsuarios(response.data)
									})
									.catch(() => {
										alert(
											'Error found while sending data: Please try again later.'
										)
									})
						: alert('Please provide a State')
					: alert('Please provide an Education Level')
				: alert('Please provide Selected Competencies')
			: alert('Please provide a Country')

		isLoading(false)
	}
	return (
		<main>
			<div className="navbar">
				<div className="link">
					<Link href="https://cursafy.com">
						<img src="./cursafyLogo.png" alt="Coursafy Logo" />
					</Link>
				</div>
			</div>

			<div className="searchbar">
				<Dropdown
					title="Pais"
					value={selectedPais ? selectedPais : 'Selecciona un país.'}
					options={['Mexico', 'Canada', 'USA']}
					handleValue={handleCountry}
				/>
				<Dropdown
					title="Estado"
					hidden={!isMexican}
					value={
						selectedEstados.length !== 0
							? selectedEstados.length == 1
								? selectedEstados[0]
								: 'Multiples estados seleccionados.'
							: 'Selecciona un estado.'
					}
					options={estados}
					multipleOption
					handleMultipleValue={handleStates}
				/>
				<Dropdown
					title="Cursos"
					value={
						selectedCompetencias.length !== 0
							? selectedCompetencias.length == 1
								? selectedCompetencias[0]
								: 'Multiples cursos seleccionados.'
							: 'Selecciona al menos un curso.'
					}
					options={competencias}
					multipleOption
				/>
				<Dropdown
					title="Competencias"
					value={
						selectedCompetencias.length !== 0
							? selectedCompetencias.length == 1
								? selectedCompetencias[0]
								: 'Multiples competencias seleccionadas.'
							: 'Selecciona al menos una competencia.'
					}
					options={competencias}
					multipleOption
					handleMultipleValue={handleCompetencias}
				/>
				<Dropdown
					title="Nivel Educativo"
					value={
						selectedNivelEducativo
							? selectedNivelEducativo
							: 'Selecciona un nivel educativo.'
					}
					handleValue={handleLevel}
				/>
				<div>
					<button type="button" onClick={handleSubmit} className="button">
						Generate
					</button>
					<button
						type="button"
						onClick={handleSubmit}
						className="button"
						disabled
					>
						Export
					</button>
				</div>
			</div>

			<div className="labelContainer">
				<div className="usercontainer">
					{loading ? (
						<div style={{ textAlign: 'center' }}>
							<p style={{ fontSize: 'xx-large' }}>Loading...</p>
						</div>
					) : (
						<div>
							<UserLabel
								id={0}
								name={'Ángel Saghir Rodríguez Fernández'}
								email={'angel.saghir.rodriguez@hotmail.com'}
								phone={'+52(1) 614-178-8130'}
								competencias={['mate', 'español']}
							/>
							<UserLabel
								id={0}
								name={'Usuario 1'}
								email={'usuario1@cursafy.com'}
								phone={'+52(1) 614-444-4444'}
								competencias={[
									'mate',
									'español',
									'inglés',
									'español',
									'español',
									'español',
									'español',
									'español',
									'español',
								]}
							/>
							{usuarios.map((usuario, index) => (
								<UserLabel
									id={index}
									name={usuario.nombre}
									email={usuario.email}
									phone={usuario.telefono}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</main>
	)
}
