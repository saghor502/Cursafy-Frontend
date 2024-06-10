export interface usuario {
	nombre: string
	email: string
	telefono: string
	porcentaje: string
	cursos: curso[]
}

export interface curso {
	curso: string
}

export interface dropdowProps {
	value: string
}
