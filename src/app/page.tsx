'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import userDataService from '../services/user.service'
import { usuario } from '@/services/interface'
import { Select } from 'antd'
import { Dropdown, Space } from 'antd'
import UserLabel from '@/components/usersLabel/UserLabel'

export default function Home() {
	const [loading, isLoading] = useState(false)

	const [paises, setPaises] = useState<string[]>([])
	const [estados, setEstados] = useState<string[]>([])
	const [competencias, setCompetencias] = useState<string[]>([])
	const [niveles, setNiveles] = useState<string[]>([])

	const [usuarios, setUsuarios] = useState<usuario[]>([])

	const [selectedPais, setSPais] = useState<string>()
	const [selectedEstados, setSEstados] = useState<string[]>([])
	const [selectedCompetencias, setSComp] = useState<string[]>([])
	const [selectedNivelEducativo, setSNivel] = useState<string>()

	const [isMexican, setIsMexican] = useState(false)

	const handleSubmit = () => {
		isLoading(true)
		selectedPais
			? selectedCompetencias.length != 0
				? selectedNivelEducativo
					? isMexican
						? selectedEstados.length != 0
							? userDataService
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
											'Error intentando mandar los datos, porfavor intente más tarde.'
										)
									})
							: alert('Porfavor señale los estados requeridos.')
						: userDataService
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
										'Error intentando mandar los datos, porfavor intente más tarde.'
									)
								})
					: alert('Porfavor señale el nivel educativo')
				: alert('Porfavor señale las competencias requeridas.')
			: alert('Porfavor ingrese un país.')

		isLoading(false)
	}

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
		userDataService
			.getNiveles()
			.then((response) => {
				setNiveles(response.data)
				return
			})
			.catch((error) => {
				console.log(error)
			})

		setPaises(['Mexico', 'USA'])
		setEstados(['Chihuahua', 'Durango', 'Sonora', 'Sinaloa', 'Coahuila'])
		setCompetencias([
			'Mate',
			'Ingles',
			'Español',
			'Ciencias Naturales',
			'Liderazgo',
		])
		setNiveles([
			'Primaria',
			'Secundaria',
			'Bachillerato',
			'Profesional',
			'Maestría',
			'Doctorado',
		])
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
						style={{ width: '100%' }}
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
						style={{ width: '100%' }}
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
						style={{ width: '100%' }}
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
				<div className="searchbar-item">
					<Select
						size="large"
						style={{ width: '100%' }}
						placeholder="Nivel Educativo"
						onChange={(selectedValue) => {
							setSNivel(selectedValue)
						}}
					>
						{niveles.map((nivel, index) => {
							return (
								<Select.Option key={index} value={nivel}>
									{nivel}
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
				<button
					type="button"
					onClick={handleSubmit}
					className="button"
					disabled
				>
					Export
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
