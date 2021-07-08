
<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
    <!-- $event(objeto especial do vue) sabe o evento que foi disparado(no caso input) e target quem disparou(tag input) o evento e value pega o valor -->
    <!-- v-on é uma diretiva do vuejs v-on(em qual envento, no caso input execute um codigo) -->
    <input
      type="search"
      class="filtro"
      v-on:input="filtro = $event.target.value"
      placeholder="filtre por parte do titulo"
    />
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
        <!-- painel tem um bind do proprio componente -->
        <!-- v-meu-transform="{ incremento: 15, animate: true }" -->
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva
            v-meu-transform:scale.animate="1.1"
            :url="foto.url"
            :titulo="foto.titulo"
          ></imagem-responsiva>
          <router-link :to="{ name: 'altera', params: { id: foto._id } }"
            ><meu-botao tipo="button" rotulo="ALTERAR"
          /></router-link>
          <!-- <meu-botao tipo="button" rotulo="remover" @click.native="remove(foto)"/> o native é para chamadar elemento nativo(<butto>), isso só acontece porque o componente aceita o evento click -->
          <meu-botao
            tipo="button"
            rotulo="remover"
            @botaoAtivado="remove(foto)"
            :confirmacao="true"
            estilo="perigo"
          />
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
// Painel é utilizado porque no arquivo Painel.vue usar-se o export default;
import Painel from "../shared/painel/Painel.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";
import FotoService from "../../domain/foto/FotoService";

export default {
  components: {
    "meu-painel": Painel, //criando uma chace, no caso meu-painel para usar o componente painel
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao,
  },

  data() {
    return {
      // o titulo e fotos são propriedade, que podesm ser usados por interpolação
      titulo: "AluraPic",
      fotos: [],
      filtro: "", // a medida que for digitando no imput vai caindo nessa propriedade
      mensagem: "",
    };
  },

  //comuted propd -> é um metodo, que pode insolar uma logica e esses metodos são acessados na view
  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        // ESSA EXPRESÃO REGULAR TEM O QUE VOCÊ DIGITOU VARENDO A LISTA DE FOTOS E TRANCENDO O RESULTADO; IGONORA O ESPACP
        //I É PARA CASE SENCETIVE
        let exp = new RegExp(this.filtro.trim(), "i");
        return this.fotos.filter((foto) => exp.test(foto.titulo)); //filter, função do java script que filtra uma lista
      } else {
        return this.fotos;
      }
    },
  },

  methods: {
    remove(foto) {
      //parametro id tem que ta no mesmo, no resource
      this.service
        .apaga(foto._id)
        //this.resource.delete({ id: foto._id })
        .then(
          () => {
            let indice = this.fotos.indexOf(foto);
            this.fotos.splice(indice, 1);
            this.mensagem = "Foto Removida com sucesso";
          },
          (err) => {
            console.log(err);
            this.mensagem = err.message;
          }
        );
      // if (confirm('Confirmar operação?')){
      //alert("Remover a foto " + foto.titulo);
      // }

      /*this.$http.delete(`v1/fotos/${foto._id}`).then(
        () => {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1);
          this.mensagem = "Foto Removida com sucesso";
        },
        (err) => {
          console.log(err);
          this.mensagem == "Não foi possivel remover a foto";
        }
      );*/
    },
  },

  //é um cancho, um ciclo de vida
  created() {
    //CREATE QUANDO É CRIADO A APLICAÇÃO
    // promise -> é uma promessa que vai receber
    /*MODELO COM PROMISE
    let promise = this.$http.get('http://localhost:3000/v1/fotos');
    // quandos os dados chegarem, então (then) da acesso
    
    
    promise.then(res => {
      // then -> quando se quer obter o resultado da promise;(então)
      // res.json é uma promise, caso volte um json então executa fotos, assim passando para propriedade fotos, fotos;
      res.json().then(fotos => this.fotos = fotos);
    })
    promise.then(res => console.log(res));*/
    //CONSULMIDO API
    /*this.$http
      .get("v1/fotos")
      .then((res) => res.json())
      .then(
        (fotos) => (this.fotos = fotos),
        (err) => console.log(err)
      );*/

    this.service = new FotoService(this.$resource);
    this.service.lista().then(
      (fotos) => (this.fotos = fotos),
      (err) => (this.mensagem = err.message)
      // console.log(err)
    );
    /*this.resource = this.$resource("v1/fotos{/id}");
    this.resource
      .query() // quando chega no parametro ele para
      .then((res) => res.json())
      .then(
        (fotos) => (this.fotos = fotos),
        (err) => console.log(err)
      );*/
  },
};
</script>

<style>
.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 96%;
  padding: 10px;
  margin: 0 auto;
}
</style>
