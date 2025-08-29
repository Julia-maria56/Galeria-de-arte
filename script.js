const blur = document.querySelector(".blur");
const form = document.querySelector(".form");
const obras = document.querySelector(".obras_de_arte");

function abrirModal() {
  blur.classList.add("mostrar");
  form.classList.add("mostrar");
}

function fecharModal() {
  blur.classList.remove("mostrar");
  form.classList.remove("mostrar");
}

// essa função lê os dados da API e joga na tela.
function buscarTarefas() {
  fetch("http://localhost:3000/obras")
    .then((res) => res.json())
    .then((res) => {
      inserirObras(res);
    });
}
buscarTarefas();

// Coloca os dados na API
function novaObra() {
  event.preventDefault();
  let obra = {
    nome: document.getElementById("titulo").value,
    imagem: document.getElementById("img").value,
    informacoes: document.getElementById("informacoes").value,
    sobre: document.getElementById("sobre").value,
  };

  fetch("http://localhost:3000/obras", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(obra),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
}

// essa função pega os dados que vêm da API e monta a interface da sua galeria.

function inserirObras(listaDeObras) {
  if (listaDeObras.length > 0) {
    obras.innerHTML = "";
    listaDeObras.map((obra) => {
      obras.innerHTML += `
                <div class="obra">
                    <img src="${obra.imagem}" alt=Foto de ${obra.nome}>
                    <div class="obra_info">
                        <h5>${obra.nome}</h5>
                        <h6>${obra.informacoes}</h6>
                        <p>${obra.sobre}</p>
                    </div>
                    <button onclick="deletarTarefa(${obra.id})">Remover obra</button>
                </div>
            `;
    });
  }
}

function deletarTarefa(id) {
  fetch(`http://localhost:3000/obras/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      alert("Obra deletada com sucesso!");
      buscarTarefas();
    });
}

// function pesquisarTarefa() {
//   const input = document.querySelector("header ul li input");
//     const obras_registradas = document.querySelectorAll(".obra")
//   if (input.value.length > 0) {
//     console.log(input.value);
//     obras_registradas.forEach(obra => {
//         const nome = document.querySelector(".obra_info h5").textContent.toLowerCase();

//         if(!nome.includes(input.value.toLowerCase())){
//             obras_registradas.classList.add("oculto")
//         } else {
//             obras_registradas.classList.remove("oculto")
//         }
//     })
//   }
// }
function pesquisarTarefa() {
  const input = document.querySelector("header ul li input");
  const obras_registradas = document.querySelectorAll(".obra");

  if (input.value.length > 0) {
    obras_registradas.forEach(obra => {
      // pega o texto do h5 dentro dessa obra
      const nome = obra.querySelector(".obra_info h5").textContent.toLowerCase();

      if (!nome.includes(input.value.toLowerCase())) {
        obra.classList.add("oculto"); // esconde só essa obra
      } else {
        obra.classList.remove("oculto"); // mostra se combina
      }
    });
  } else {
    // se o campo estiver vazio, mostra todas as obras de volta
    obras_registradas.forEach(obra => obra.classList.remove("oculto"));
  }
}

