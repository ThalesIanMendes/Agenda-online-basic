var buttonNovoEvento = document.getElementById('buttonNovoEvento');
var buttonCancelar = document.getElementById('buttonCancelar');
var formNovoEvento = document.getElementById('formNovoEvento');
var inputNomeEvento = document.getElementById('nomeEvento');
var inputDataEvento = document.getElementById('dataEvento');
var mensagemErro = document.getElementById('mensagemErro');
var mensagemOk = document.getElementById('mensagemOk');
var novoEvento = document.getElementById('novoEvento');
var tabelaEventos = document.getElementById('tabelaEventos');

var listaEventos = [];

function removerEvento(event){
        var posicao = event.target.getAttribute('data-evento');
        listaEventos.splice(posicao,1);
        atualizarTabelaEventos();
}

function atualizarTabelaEventos(){
        if (listaEventos.length === 0){
                tabelaEventos.innerHTML = '<tr><td colspan="3">Nenhum evento</td></tr>';
                return;
        }
        tabelaEventos.innerHTML = '';
        for (var i = 0; i < listaEventos.length; i++){
                var evento = listaEventos[i];
                var linha = document.createElement('tr');
                var celulaNome = document.createElement('td');
                var celulaData = document.createElement('td');
                var celulaAcoes = document.createElement('td');
                var botaoExcluir = document.createElement('button');
                botaoExcluir.setAttribute('data-evento', i);
                celulaNome.innerText = evento.nome;
                celulaData.innerText = evento.data;
                celulaAcoes.appendChild(botaoExcluir);
                botaoExcluir.innerText = "Remover";
                botaoExcluir.classList.add('btn');
                botaoExcluir.classList.add('btn-danger');
                botaoExcluir.classList.add('btn-sm');
                botaoExcluir.addEventListener('click', removerEvento);
                linha.appendChild(celulaNome);
                linha.appendChild(celulaData);
                linha.appendChild(celulaAcoes);
                tabelaEventos.appendChild(linha);
        }
}

function mostraForm(){
        novoEvento.classList.remove('d-none');      
        limpaForm();
}

function escondeForm(){
        novoEvento.classList.add('d-none');
        limpaForm();
}

function limpaForm(){
        mensagemErro.classList.add('d-none');
        mensagemOk.classList.add('d-none');
        inputNomeEvento.classList.remove('is-invalid'); 
        inputDataEvento.classList.remove('is-invalid');
        inputNomeEvento.value = '';
        inputDataEvento.value = '';     
        mensagemErro.innerHTML = '';
}

function novoEventoValido(nomeEvento,dataEvento){
        var validacaook = true; //flag
        var timestampEvento = Date.parse(dataEvento);
        var timestampAtual = (new Date()).getTime();
        var erro = '';
        if (nomeEvento.trim().length === 0) {
                inputNomeEvento.classList.add('is-invalid'); 
                erro = 'O nome do evento é obrigatorio!';
                validacaook = false;
        }else{
                inputNomeEvento.classList.remove('is-invalid');
        }
        if (isNaN(timestampEvento) || timestampEvento < timestampAtual) {
                if (erro.length > 0){
                        erro += '<br>';
                }
                inputDataEvento.classList.add('is-invalid');
                erro += 'A data do evento é obrigatoria e deve estar no futuro!';
                validacaook = false;
        }else{
                inputDataEvento.classList.remove('is-invalid');
        }
        if (!validacaook){
                mensagemErro.classList.remove('d-none');
                mensagemErro.innerHTML = erro;
        }else{
                mensagemErro.classList.add('d-none');
                mensagemOk.classList.remove('d-none');
                //novoEvento.classList.add('d-none');
        }
        return validacaook;
}

function salvarNovoEvento(event){
        event.preventDefault();
        var nomeEvento =inputNomeEvento.value;
        var dataEvento = inputDataEvento.value;
        if (novoEventoValido(nomeEvento,dataEvento)){
                console.log('Evento valido!')
                listaEventos.push({
                        nome: nomeEvento,
                        data: new Date(dataEvento),
                });
                atualizarTabelaEventos();
                escondeForm();
        }else{
                console.log('Evento invalido!')
        }
}

buttonNovoEvento.addEventListener('click', mostraForm);
buttonCancelar.addEventListener('click', escondeForm);
formNovoEvento.addEventListener('submit', salvarNovoEvento);
window.addEventListener('load', atualizarTabelaEventos);
