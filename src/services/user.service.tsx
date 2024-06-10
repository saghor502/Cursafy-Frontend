import http from './http-commons'

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
	getUsuarios(pais: string, estados: string[], competencias: string[]) {
		return http.get('/usuarios', {
			params: {
				pais: pais,
				estados: estados,
				competencias: competencias,
			},
		})
	}
}

const userDataService = new UserDataService()
export default userDataService
