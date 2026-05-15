// ===== NAVEGAÇÃO =====
function navegarPara(telaId) {
    document.querySelectorAll('.tela').forEach(function(tela) {
        tela.classList.remove('ativa');
    });

    document.getElementById(telaId).classList.add('ativa');

    if (telaId === 'tela-horario') {
        mostrarAulas();
    }
    if (telaId === 'tela-calendario') {
        renderizarCalendario();
    }
    if (telaId === 'tela-pasta') {
        mostrarPastas();
    }
}

// ===== SLIDESHOW =====
var slideAtual = 0; // controla qual slide está aparecendo

function irParaSlide(index) {
    // esconde todos os slides
    document.querySelectorAll('.slide').forEach(function(slide) {
        slide.classList.remove('ativo');
    });
    // esconde todas as bolinhas
    document.querySelectorAll('.dot').forEach(function(dot) {
        dot.classList.remove('ativo');
    });
    // mostra só o slide escolhido
    document.querySelectorAll('.slide')[index].classList.add('ativo');
    // marca a bolinha correspondente
    document.querySelectorAll('.dot')[index].classList.add('ativo');
    // atualiza o slide atual
    slideAtual = index;
}

// troca o slide automaticamente a cada 3 segundos
setInterval(function() {
    var proximoSlide = (slideAtual + 1) % 3;
    // % 3 faz voltar para 0 quando chega no slide 3
    irParaSlide(proximoSlide);
}, 3000);

// ===== LOGIN =====
function fazerLogin() {
    var email = document.getElementById('login-email').value;
    var senha = document.getElementById('login-senha').value;

    if (email === '') {
        alert('Por favor, insira seu email.');
        return;
    }
    if (!email.includes('@')) {
        alert('Por favor, insira um email válido.');
        return;
    }
    if (senha === '') {
        alert('Por favor, insira sua senha.');
        return;
    }

    // Salva email para exibir no perfil
    document.getElementById('perfil-email').textContent = email;
    document.getElementById('perfil-nome').textContent = 'Estudante';

    alert('Login bem-sucedido!');
    navegarPara('tela-home');
}

// ===== CADASTRO =====
function fazerCadastro() {
    var email = document.getElementById('cadastro-email').value;
    var senha = document.getElementById('cadastro-senha').value;

    if (email === '') {
        alert('Por favor, insira seu email.');
        return;
    }
    if (!email.includes('@')) {
        alert('Por favor, insira um email válido.');
        return;
    }
    if (senha === '') {
        alert('Por favor, insira sua senha.');
        return;
    }

    alert('Cadastro bem-sucedido!');
    navegarPara('tela-login');
}

// ===== AULAS =====
var aulas = [
    { materia: 'Matemática', dia: 'Segunda-feira', horario: '10h' },
    { materia: 'Português', dia: 'Terça-feira', horario: '14h' },
    { materia: 'História', dia: 'Quarta-feira', horario: '9h' }
];

function mostrarAulas() {
    var lista = document.getElementById('lista-aulas');
    lista.innerHTML = '';

    aulas.forEach(function(aula) {
        var card = document.createElement('div');
        card.className = 'info-item';
        card.innerHTML = '<h3>' + aula.materia + '</h3>' +
                         '<p>' + aula.dia + ' • ' + aula.horario + '</p>';
        lista.appendChild(card);
    });
}

function adicionarAula() {
    var materia = prompt('Nome da matéria:');
    if (!materia) return;

    var dia = prompt('Dia da semana:');
    if (!dia) return;

    var horario = prompt('Horário (ex: 08:00 - 09:40):', '08:00 - 09:40');
    if (!horario) return;

    aulas.push({ materia: materia, dia: dia, horario: horario });
    mostrarAulas();
    alert('✅ Aula adicionada com sucesso!');
}

// ===== CALENDÁRIO =====
var dataAtual = new Date();
var eventos = [];

function renderizarCalendario() {
    var grid = document.getElementById('calendario-grid');
    var mesAnoEl = document.getElementById('mes-ano');

    var diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    var meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

    var ano = dataAtual.getFullYear();
    var mes = dataAtual.getMonth();

    mesAnoEl.textContent = meses[mes] + ' ' + ano;

    var primeiroDia = new Date(ano, mes, 1).getDay();
    var diasNoMes = new Date(ano, mes + 1, 0).getDate();
    var hoje = new Date();

    grid.innerHTML = '';

    diasSemana.forEach(function(dia) {
        var el = document.createElement('div');
        el.className = 'cal-header';
        el.textContent = dia;
        grid.appendChild(el);
    });

    for (var i = 0; i < primeiroDia; i++) {
        var vazio = document.createElement('div');
        grid.appendChild(vazio);
    }

    for (var dia = 1; dia <= diasNoMes; dia++) {
        var el = document.createElement('div');
        el.className = 'cal-dia';
        el.textContent = dia;

        if (dia === hoje.getDate() &&
            mes === hoje.getMonth() &&
            ano === hoje.getFullYear()) {
            el.classList.add('hoje');
        }

        el.addEventListener('click', function() {
            adicionarEvento();
        });

        grid.appendChild(el);
    }

    mostrarEventos();
}