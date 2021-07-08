import Cadastro from './components/cadastro/Cadastro.vue';
import Home from './components/home/Home.vue';
// import {routes} from './routes';

// uma rota é um Objeto js com duas propriedade
export const routes = [
    {
        path: '', /* O '' significa que ele vai colocar o end. localhost:3000/#/*/
        name: 'home',
        component: Home,
        titulo: 'Home', // vai ser chamado no menu
        menu: true
    },
    {
        path: '/cadastro', /* localhost:3000/#/cadastro*/
        name: 'cadastro',
        component: Cadastro,
        titulo: 'Cadastro',
        menu: true
    },
    {
        path: '/cadastro/:id', /* localhost:3000/#/cadastro*/
        name: 'altera',
        component: Cadastro,
        titulo: 'Cadastro',
        menu: false
    },
    {
        path: '*',
        component: Home,
        menu: false
    }
];