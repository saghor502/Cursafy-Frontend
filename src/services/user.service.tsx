import axios from 'axios'
import http from './http-commons'

class UserDataService {
	getPaises() {
		return http.get('/paises')
	}
	getNiveles() {
		return http.get('/niveles')
	}
	getEstados() {
		return http.get('/estados')
	}
	getCompetencias() {
		return http.get('/competencias')
	}
	getCursos() {
		return http.get('/cursos')
	}
	getUsuarios(pais: string, competencias: string[], niveleducativo: string) {
		return http.get('/usuarios', {
			params: {
				pais: pais,
				competencias: competencias,
				niveleducativo: niveleducativo,
			},
		})
	}
	getUsuariosMexicanos(
		pais: string,
		estados: string[],
		competencias: string[],
		niveleducativo: string
	) {
		return http.get('/usuariosMexicanos', {
			params: {
				pais: pais,
				estados: estados,
				competencias: competencias,
				niveleducativo: niveleducativo,
			},
		})
	}
}

const userDataService = new UserDataService()
export default userDataService
