axios.defaults.headers.common['Authorization'] = 'Ta3NEXJU43DcOsWwb8USFlxN';

let entrarSala;

function entrar(){

    entrarSala = prompt('Qual o seu nome?');

    while(entrarSala === ''){
        alert('Digite o seu nome!');
    }

}