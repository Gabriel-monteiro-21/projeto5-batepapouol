axios.defaults.headers.common['Authorization'] = 'Ta3NEXJU43DcOsWwb8USFlxN';

let entrarSala;

let filtrar = [];

function erroAoDigitarOnome(error){
    console.log('Erro ao digitar o nome');
    
    if(error.response.status === 400){
        alert('Nome de usuário já cadastrado');
        window.location.reload(true);
    }
}

function sucessoAoDigitarNome(sucesso){
    console.log('Sucesso ao digitar o nome');
    console.log(sucesso);

    filtrar = resposta.data;

    filtrarMensagens
}

function entrar(){

    entrarSala = prompt('digite o seu nome');

    while(entrarSala === '' || entrarSala === null){
        alert('digite o seu nome!');
        entrarSala = prompt('digite o seu nome');
    }

    const promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants ', {name:entrarSala});
    promise.then(sucessoAoDigitarNome);
    promise.catch(erroAoDigitarOnome);

    setInterval(ficarNaSala, 5000);
}
function ficarNaSala(){
    promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', {name:entrarSala});
    promise.catch(erroEmFicarConectado);
}
function erroEmFicarConectado(error){
    console.log(error)
    alert('Erro inesperado de conexão entre novamente');
    window.location.reload(true);
}
entrar();