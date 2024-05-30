'use client'
import { useState } from 'react'
import './Dropdown.css'

interface DropdownProps {
	id?: string
	title?: string
	value?: string
	options?: string[] | undefined

	hidden?: boolean
	multipleOption?: boolean
	handleValue?: (option: string) => void
	handleMultipleValue?: (option: string[]) => void
}

export default function ({
	id,
	title,
	value,
	options,
	hidden,
	multipleOption,
	handleValue,
	handleMultipleValue,
}: DropdownProps) {
	const [isShowing, setIsShowing] = useState(true)
	const [realValue, setRealValue] = useState('')
	const [realValues, setRealValues] = useState([])

	const handleClick = () => {
		setIsShowing(!isShowing)
	}
	const alerted = (option: string) => {
		alert(option)
	}

	return (
		<div style={hidden ? { display: 'none' } : {}} className="container">
			<div className="titleLabel">
				<p>{title}</p>
			</div>
			<div className="valueContainer" onClick={handleClick}>
				<p>{value}</p>
			</div>

			<div className="optionsLabel" hidden={isShowing}>
				{multipleOption ? (
					<>
						{options?.map((option, index) => (
							<div id={index.toString()} className="multipleOption">
								<p
									className="option"
									onClick={
										handleValue ? () => handleValue(realValue) : undefined
									}
								>
									{option}
								</p>
								<input type={'checkbox'} />
							</div>
						))}
					</>
				) : (
					<>
						{options?.map((option, index) => (
							<div id={index.toString()} className="simpleOption">
								<p
									className="option"
									onClick={() =>
										handleMultipleValue
											? () => handleMultipleValue(realValues)
											: undefined
									}
								>
									{option}
								</p>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	)
}
