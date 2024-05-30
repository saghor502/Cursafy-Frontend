import axios from 'axios'
import http from './http-commons'
import type { usuario} from './interface'

class UserDataService {
	getPaises() {
		return http.get('/paises')
	}
	getEstados() {
		return http.get('/estados')
	}
	getCompetencias() {
		return http.get('/competencias')
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
