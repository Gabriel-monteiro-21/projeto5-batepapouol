axios.defaults.headers.common['Authorization'] = 'Ta3NEXJU43DcOsWwb8USFlxN';

let entrarSala;

let filtrar = [];

let idIntervalpararSetInterval, idIntervalPararBuscarMensagens;

function mensagemEnviada(sucesso) {

    buscarMensagens()

}

function mensagemNaoEnviada(error) {
    console.log('mensagem não foi enviada');
    alert('ocorreu um erro ao enviar a mensagem');
    window.location.reload();
}

function enviarMensagem() {
    const elemento = document.querySelector(".barra-digitar-aqui");

    const obejetoDeEnviarMensagem = {
        from: entrarSala,
        to: "Todos",
        text: elemento.value,
        type: "message" // ou "private_message" para o bônus
    };

    const promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', obejetoDeEnviarMensagem);
    promise.then(mensagemEnviada);
    promise.catch(mensagemNaoEnviada);

    elemento.value = '';
}

function erroAoDigitarOnome(error) {
    console.log('Erro ao digitar o nome');

    if (error.response.status === 400) {
        alert('Nome de usuário já cadastrado');
        window.location.reload(true);
    }
}

function filtrarMensagens() {

    const listaMensagens = document.querySelector('.mensagens-conteudo');
    listaMensagens.innerHTML = '';

    for (let i = 0; i < filtrar.length; i++) {
        let mensagens = filtrar[i];

        let carregarMensagens = `
            <div class="mensagem-dois" data-test="message">
                    <span class="horario">${mensagens.time}</span>
                    <strong>${mensagens.from}</strong>
                    <span> para </span>
                    <strong>${mensagens.to}</strong>
                    <span>${mensagens.text}</span>
            </div>
        `;

        if (mensagens.type === 'private_message') {
            carregarMensagens = `
            <div class="saida">
                    <span class="horario">${mensagens.time}</span>
                    <strong>${mensagens.from}</strong>
                    <span> reservadamente para </span>
                    <strong>${mensagens.to}</strong>
                    <span>${mensagens.text}</span>
            </div>
        `;
        } else if (mensagens.type === 'status') {
            carregarMensagens = `
            <div class="mensagem" data-test="message">
                    <span class="horario">${mensagens.time}</span>
                    <strong>${mensagens.from}</strong>
                    <span>${mensagens.text}</span>
            </div>
        `;
        }

        listaMensagens.innerHTML += carregarMensagens;
    }
}

function pegarMensagensDeuCerto(resposta) {
    console.log(resposta);
    filtrar = resposta.data;

    filtrarMensagens();

}
function pegarMensagensNaoDeuCerto(error) {
    console.log('Erro ao pegar as mensagens');
    alert('Ocorreu um erro ao pegar as mensagens do chat');
}

function buscarMensagens() {
    const promise = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promise.then(pegarMensagensDeuCerto);
    promise.catch(pegarMensagensNaoDeuCerto);
}

function sucessoAoDigitarNome(sucesso) {
    console.log('Sucesso ao digitar o nome');
    console.log(sucesso);

    const promise = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promise.then(pegarMensagensDeuCerto);
    promise.catch(pegarMensagensNaoDeuCerto);

    idIntervalPararBuscarMensagens = setInterval(buscarMensagens, 3000);
}

function entrar() {

    entrarSala = prompt('digite o seu nome');

    while (entrarSala === '' || entrarSala === null) {
        alert('digite o seu nome!');
        entrarSala = prompt('digite o seu nome');
    }

    const promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants ', { name: entrarSala });
    promise.then(sucessoAoDigitarNome);
    promise.catch(erroAoDigitarOnome);

    idIntervalpararSetInterval = setInterval(ficarNaSala, 5000);
}
function ficarNaSala() {
    promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', { name: entrarSala });
    promise.catch(erroEmFicarConectado);
}
function erroEmFicarConectado(error) {
    console.log(error)
    alert('Erro inesperado de conexão entre novamente');
    window.location.reload(true);
}
entrar();