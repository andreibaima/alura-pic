import Vue from 'vue';

// Global View Objetive cria uma diretiva; segundo parametro obj com as configurações da diretiva
Vue.directive('meu-transform', {
    // cancho toda vez que a diretiva associa ao elemento do dom
    bind(el, binding, vnode) {
        // primeiro uma referencia ao elemento do dom onde a diretiva foi associada
        let current = 0;

        el.addEventListener('dblclick', function () {

            let incremento = binding.value || 90;
            let efeito;

            if (!binding.arg || binding.arg == 'rotate') {
                if (binding.modifiers.reverse) {
                    current -= incremento
                } else {
                    current += incremento;
                }

                efeito = `rotate(${current}deg)`
            } else if (binding.arg == "scale") {
                efeito = `scale(${incremento})`;
            }

            el.style.transform = efeito;

            if (binding.modifiers.animate) el.style.transition = `transform 0.5s`
        })
    }
});