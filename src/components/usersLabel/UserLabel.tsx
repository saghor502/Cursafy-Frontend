import { ReactNode } from 'react'
import './UserLabel.css'

interface UserLabelProps {
	name?: string
	email?: string
	phone?: string
	id?: number
	competencias?: string[]
}

export default function ({
	name,
	email,
	phone,
	id,
	competencias,
}: UserLabelProps) {
	return (
		<div className="userLabelContainer" id={id ? id.toString() : ''}>
			<div style={{ width: '70%', height: '100px', display: 'inline-grid' }}>
				<p style={{ fontSize: 'xx-large' }}>{name}</p>
				<div>
					<p
						style={{
							fontSize: 'x-large',
							display: 'inline-grid',
							padding: '10px',
						}}
					>
						{email}
					</p>
					<p
						style={{
							fontSize: 'x-large',
							display: 'inline-grid',
							padding: '10px',
						}}
					>
						{phone}
					</p>
				</div>
			</div>

			<div
				style={{
					width: '30%',
					display: 'inline-grid',
					textAlign: 'center',
					height: '100px',
				}}
			>
				<div style={{ overflowY: 'scroll' }}>
					{competencias?.map((competencia, index) => (
						<p id={index.toString()} style={{ fontSize: 'x-large' }}>
							{competencia}
						</p>
					))}
				</div>
			</div>
		</div>
	)
}
