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

function mostrarEventos() {
    var lista = document.getElementById('lista-eventos');
    lista.innerHTML = '';

    if (eventos.length === 0) {
        lista.innerHTML = '<p style="color:#666; text-align:center;">Nenhum evento ainda</p>';
        return;
    }

    eventos.forEach(function(ev) {
        var card = document.createElement('div');
        card.className = 'info-item';
        card.innerHTML = '<h3>' + ev.titulo + '</h3>' +
                         '<p>' + ev.data + '</p>';
        lista.appendChild(card);
    });
}

function adicionarEvento() {
    var titulo = prompt('Nome do evento:');
    if (!titulo) return;

    var data = prompt('Data do evento (ex: 11/05/2026):');
    if (!data) return;

    eventos.push({ titulo: titulo, data: data });
    mostrarEventos();
    alert('✅ Evento adicionado!');
}

function mesAnterior() {
    dataAtual.setMonth(dataAtual.getMonth() - 1);
    renderizarCalendario();
}

function proximoMes() {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    renderizarCalendario();
}

// ===== PASTAS =====
var pastas = [
    { nome: 'Matemática', arquivos: 3 },
    { nome: 'Português', arquivos: 5 },
    { nome: 'História', arquivos: 2 },
];

function mostrarPastas() {
    var lista = document.getElementById('lista-pastas');
    lista.innerHTML = '';

    pastas.forEach(function(pasta) {
        var card = document.createElement('div');
        card.className = 'info-item';
        card.innerHTML = '<h3>📁 ' + pasta.nome + '</h3>' +
                         '<p>' + pasta.arquivos + ' arquivo(s)</p>';

        card.addEventListener('click', function() {
            alert('📁 Abrindo pasta: ' + pasta.nome);
        });

        lista.appendChild(card);
    });
}

function criarPasta() {
    var nome = prompt('Nome da nova pasta:');
    if (!nome) return;

    pastas.push({ nome: nome, arquivos: 0 });
    mostrarPastas();
    alert('✅ Pasta "' + nome + '" criada!');
}

// ===== SCANNER =====
function previewImagem(event) {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function(e) {
        var preview = document.getElementById('scanner-preview');
        preview.innerHTML = '<img src="' + e.target.result + '" alt="Preview"/>';
    };
    reader.readAsDataURL(file);
}

function salvarImagem() {
    var preview = document.getElementById('scanner-preview');
    if (!preview.querySelector('img')) {
        alert('⚠️ Selecione uma imagem primeiro!');
        return;
    }
    alert('✅ Imagem salva com sucesso!');
}

// ===== AULA INTELIGENTE =====
function previewAula(event) {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function(e) {
        var preview = document.getElementById('aula-preview');
        preview.innerHTML = '<img src="' + e.target.result + '" alt="Preview"/>';
    };
    reader.readAsDataURL(file);
}

function fazerSlides() {
    alert('🖼️ Slides gerados com sucesso!');
}

function salvarGaleria() {
    alert('💾 Imagem salva na galeria!');
}

function criarResumo() {
    alert('📝 Resumo criado!\n\nSeus principais pontos foram organizados.');
}

function criarFlashcards() {
    alert('🃏 Flashcards criados!\n\n3 flashcards gerados do seu material.');
}

// ===== PERFIL =====
function editarPerfil() {
    // CORRIGIDO: removido 'nome-usuario' e 'usuarioLogado' que não existem no HTML
    var novoNome = prompt('Seu nome:', document.getElementById('perfil-nome').textContent);
    if (novoNome) {
        document.getElementById('perfil-nome').textContent = novoNome;
        alert('✅ Perfil atualizado!');
    }
}

// ===== CONFIGURAÇÕES =====
function toggleNotificacoes() {
  const ativo = document.getElementById('toggle-notif').checked;
  alert(ativo ? '🔔 Notificações ativadas!' : '🔕 Notificações desativadas.');
}

function toggleDark() {
  const dark = document.getElementById('toggle-dark').checked;
  document.documentElement.style.setProperty('--fundo', dark ? '#1a1a1a' : '#8b619c');
  document.documentElement.style.setProperty('--card', dark ? '#111' : '#2A2A2A');
}

function redefinirSenha() {
  const email = prompt('Digite seu email para redefinir a senha:');
  if (email && email.includes('@')) {
    alert('✅ Email de redefinição de senha enviado para ' + email);
  } else if (email) {
    alert('❌ Email inválido.');
  }
}

function verPrivacidade() {
  alert('🔒 Política de Privacidade\n\nSeus dados são armazenados localmente no dispositivo e não são compartilhados com terceiros.');
}

function verTermos() {
  alert('📋 Termos de Uso\n\nAo usar o JoviClass você concorda com o uso responsável da plataforma para fins educacionais.');
}

function verDeclaracao() {
  alert('🛡️ Declaração de Privacidade\n\nO JoviClass respeita sua privacidade e segue as diretrizes da LGPD.');
}

// ===== LOGOUT =====
function fazerLogout() {
    // CORRIGIDO: removido 'usuarioLogado' que não existia
    const confirmar = confirm('Tem certeza que deseja sair?');
    if (confirmar) {
        alert('Até logo! 👋');
        navegarPara('tela-splash');
    }
}