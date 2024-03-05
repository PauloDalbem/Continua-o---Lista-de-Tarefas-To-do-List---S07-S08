// Função para ler as tarefas do arquivo JSON
function lerTarefasDoJSON() {
    return JSON.parse(localStorage.getItem('tarefas')) || [];
  }
  
  // Função para salvar as tarefas no arquivo JSON
  function salvarTarefasNoJSON(tarefas) {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }
  
  // Função para ler todas as tarefas salvas no JSON
  function lerTodasTarefasDoJSON() {
    const listaTarefas = localStorage.getItem("tarefas");
    if (listaTarefas) {
      return JSON.parse(listaTarefas);
    } else {
      console.log("Nenhuma tarefa encontrada.");
      return [];
    }
  }
  
  // Função para atualizar a quantidade de tarefas
  function atualizarQuantidadeTarefas() {
    const quantidadeTarefas = document.querySelectorAll('#myUL li').length;
    const elementoQuantidadeTarefas = document.getElementById('quantidadeTarefas');
    elementoQuantidadeTarefas.textContent = `Quantidade de tarefas: ${quantidadeTarefas}`;
  }
  
  // Função para adicionar uma nova tarefa
  function adicionarTarefa() {
    const inputTarefa = document.getElementById('myInput');
    const novaTarefaTexto = inputTarefa.value.trim();
  
    if (novaTarefaTexto !== '') {
      const listaTarefas = document.getElementById('myUL');
      const novaTarefa = document.createElement('li');
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
  
      const label = document.createElement('label');
      label.textContent = novaTarefaTexto;
  
      const closeBtn = document.createElement('span');
      closeBtn.textContent = 'X';
      closeBtn.className = 'close';
      
      closeBtn.addEventListener('click', function () {
        const confirmacao = confirm("Tem certeza que deseja excluir esta tarefa?");
        if (confirmacao) {
          excluirTarefa(this);
        }
      });
  
      novaTarefa.appendChild(checkbox);
      novaTarefa.appendChild(label);
      novaTarefa.appendChild(closeBtn);
      listaTarefas.appendChild(novaTarefa);
  
      checkbox.addEventListener('change', function () {
        if (this.checked) {
          label.style.textDecoration = 'line-through';
          // Quando a caixa de seleção é marcada, atualize a tarefa no JSON
          atualizarTarefaNoJSON(label.textContent);
        } else {
          label.style.textDecoration = 'none';
        }
      });
  
      inputTarefa.value = '';
  
      // Adiciona a nova tarefa ao JSON
      adicionarTarefaAoJSON({titulo: novaTarefaTexto, concluido: false});
  
      // Atualiza a quantidade de tarefas após adicionar uma nova
      atualizarQuantidadeTarefas();
    }
  }
  
  // Função para adicionar uma tarefa ao JSON
  function adicionarTarefaAoJSON(tarefa) {
    const tarefas = lerTarefasDoJSON();
    tarefas.push(tarefa);
    salvarTarefasNoJSON(tarefas);
  }
  
  // Função para remover uma tarefa existente do JSON
  function removerTarefaDoJSON(tituloTarefa) {
    // Ler as tarefas do localStorage
    let tarefas = lerTarefasDoJSON();
  
    // Filtrar as tarefas para remover aquela com o título especificado
    tarefas = tarefas.filter(tarefa => tarefa.titulo !== tituloTarefa);
  
    // Salvar as tarefas atualizadas no localStorage
    salvarTarefasNoJSON(tarefas);
  
    console.log(`Tarefa "${tituloTarefa}" removida.`);
  }
  
  // Função para excluir uma tarefa
  function excluirTarefa(elemento) {
    const tituloTarefa = elemento.previousElementSibling.textContent;
    elemento.parentElement.remove();
    // Remover a tarefa do JSON
    removerTarefaDoJSON(tituloTarefa);
    // Atualiza a quantidade de tarefas após excluir uma
    atualizarQuantidadeTarefas();
  }
  
  // Função para atualizar uma tarefa existente no JSON
  function atualizarTarefaNoJSON(tituloTarefa) {
    // Ler as tarefas do localStorage
    const tarefas = lerTarefasDoJSON();
  
    // Verificar se a tarefa existe pelo título
    const tarefaExistente = tarefas.find(tarefa => tarefa.titulo === tituloTarefa);
  
    // Se a tarefa existir, atualize o atributo 'concluido' para true
    if (tarefaExistente) {
      tarefaExistente.concluido = true;
  
      // Salvar as tarefas atualizadas no localStorage
      salvarTarefasNoJSON(tarefas);
  
      console.log(`Tarefa "${tituloTarefa}" marcada como concluída.`);
    } else {
      console.log(`Tarefa "${tituloTarefa}" marcada como concluída.`);
    }
  }
  
  // Chama a função ao carregar a página para inicializar a quantidade de tarefas
  window.onload = function() {
    atualizarQuantidadeTarefas();
  
    // Adicionando listener para checkboxes existentes na lista
    document.querySelectorAll('#myUL li input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        const label = this.nextElementSibling;
        if (this.checked) {
          label.style.textDecoration = 'line-through';
          // Quando a caixa de seleção é marcada, atualize a tarefa no JSON
          atualizarTarefaNoJSON(label.textContent);
        } else {
          label.style.textDecoration = 'none';
        }
      });
    });
  };