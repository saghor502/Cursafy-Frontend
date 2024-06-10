import './UserLabel.css'

interface UserLabelProps {
	name?: string
	id?: number
	telefono?: string
	email?: string
	porcentaje?: string
}

export default function ({
	name,
	id,
	porcentaje,
	telefono,
	email,
}: UserLabelProps) {
	return (
		<div className="userLabelContainer" id={id ? id.toString() : ''}>
			<div style={{ width: '70%', display: 'inline-grid' }}>
				<p style={{ fontSize: 'xx-large' }}>{name}</p>
				<div style={{ width: '100%' }}>
					<p style={{ fontSize: 'x-large', display: 'inline-grid' }}>
						{telefono}
					</p>
					<p
						style={{
							fontSize: 'x-large',
							display: 'inline-grid',
							paddingLeft: '50px',
						}}
					>
						{email}
					</p>
				</div>
			</div>
			<div
				style={{
					width: '30%',
					display: 'inline-grid',
					textAlign: 'center',
				}}
			>
				<div>
					<p style={{ fontSize: 'xxx-large' }}>{porcentaje}</p>
				</div>
			</div>
		</div>
	)
}
