
<template>
  <div class="painel">
    <h2 class="painel-titulo" v-on:dblclick="visivel = !visivel">
      {{ titulo }}
    </h2>
    <!--o componente transition deliminta o elemento no qual vue js fica adicionando uma classe, fica adicionando e removendo veja no css também-->
    <!-- mais usando quando quer fazer uma transição; -->
    <transition name="painel-fade">
      <!-- slot recebe dentro ta tag os que ta dentro do componente que ta chamando, assim caindo no slot;; -->
      <div class="painel-conteudo" v-show="visivel">
        <!-- v-show faz com que o elemento ganho um display none -->
        <slot></slot>
        <!-- não pode conter v-show no slot, no caso tem que ser uma div ou otro elemento que cubra ele -->
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visivel: true,
    };
  },

  //neste arrei dizemos qual propriedade nossos componentes aceitam receber, no caso titulo ta vindo do Home.vue onde estão
  //chamando este componente
  props: ["titulo"],
};
</script>

<style scoped>
/* o scoped faz com que esse estilo seja usado somente para este componente;
  
  /* .imagem-responsiva {
    width: 100%;
  } */

/* estilo do painel */

.painel {
  padding: 0 auto;
  border: solid 2px grey;
  display: inline-block;
  margin: 5px;
  box-shadow: 5px 5px 10px grey;
  width: 200px;
  height: 100%;
  vertical-align: top;
  text-align: center;
}

.painel .painel-titulo {
  text-align: center;
  border: solid 2px;
  background: lightblue;
  margin: 0 0 15px 0;
  padding: 10px;
  text-transform: uppercase;
}

* {
  box-shadow: 5px 5px 5px;
}
/* painel-fade-enter /*antes do elemento ser incluido ou removido, o estado atual
    painel-fade-enter active -> quando o elemento esta sendo incluido
    painel-fade-leave-active ->  quando o elemento esta sendo removido
  */
.painel-fade-enter,
.painel-fade-leave-active {
  opacity: 0;
}

.painel-fade-enter-active,
.painel-fade-leave-active {
  transition: opacity 0.4s;
}

.painel-conteudo {
  overflow: hidden;
}
</style>
