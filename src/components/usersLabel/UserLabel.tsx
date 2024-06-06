import { ReactNode } from 'react'
import './UserLabel.css'

interface UserLabelProps {
	name?: String
	id?: number
	porcentaje?: string
}

export default function ({ name, id, porcentaje }: UserLabelProps) {
	return (
		<div className="userLabelContainer" id={id ? id.toString() : ''}>
			<div style={{ width: '70%', display: 'inline-grid' }}>
				<p style={{ fontSize: 'xx-large' }}>{name}</p>
			</div>

			<div
				style={{
					width: '30%',
					display: 'inline-grid',
					textAlign: 'center',
					height: '100px',
				}}
			>
				<div style={{ height: '100%' }}>
					<p style={{ fontSize: 'xx-large' }}>{porcentaje}</p>
				</div>
				{/* <div style={{ overflowY: 'scroll', height: '100%' }}>
					{competencias?.map((competencia, index) => (
						<p id={index.toString()} style={{ fontSize: 'x-large' }}>
							{competencia}
						</p>
					))}
				</div> */}
			</div>
		</div>
	)
}
