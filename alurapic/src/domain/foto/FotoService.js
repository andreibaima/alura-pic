export default class FotoService {

    constructor(resource) {
        this._resource = resource('v1/fotos{/id}');
    }

    lista() {
        return this._resource
            .query() //devolve uma promisse que é o retorno
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possivel obter as Fotos')
            }) //esse retorno é a resposta e é convertida em json
    }

    cadastrar(foto) {

        if (foto._id) {
            return this._resource
                .update({ id: foto._id }, foto)
        } else {
            return this._resource
                .save(foto)
        }
    }

    apaga(id) {
        return this._resource.delete({ id })
            .then(null, err => {
                console.log(err);
                throw new Error("Não foi possivel remover a foto;")
            })
    }

    busca(id) {
        return this._resource
            .get({ id })
            .then(res => res.json())
    }

}