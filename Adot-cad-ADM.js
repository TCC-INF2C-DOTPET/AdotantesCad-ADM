// Array para armazenar os adotantes
const employees = [];

document.addEventListener("DOMContentLoaded", function () {
    // Função para adicionar um adotante
    function addEmployee() {
        const name = document.getElementById("name").value;
        const sexo = document.getElementById("sexo").value;
        const numero = document.getElementById("numero").value;
        const complemento = document.getElementById("complemento").value;
        const cep = document.getElementById("cep").value;
        const logradouro = document.getElementById("logradouro").value;
        const bairro = document.getElementById("bairro").value;
        const cidade = document.getElementById("cidade").value;
        const uf = document.getElementById("uf").value;
        const dt = document.getElementById("dt").value;
        const tipo = document.getElementById("tipo").value;
        const telefone = document.getElementById("telefone").value;
        const email = document.getElementById("email").value;
        const cpf = document.getElementById("cpf").value;
        const trabalha = document.getElementById("trabalha").value;
        const periodo = document.getElementById("periodo").value;
        const usuario = document.getElementById("usuario").value;


       

        if (name && sexo && numero && complemento && cep && logradouro && bairro && cidade && uf && dt && tipo && telefone && email && cpf && trabalha && periodo && usuario) {
            // Cria um objeto adotante
            const employee = {
                name: name,
                sexo: sexo,
                numero: numero,
                complemento: complemento,
                cep: cep,
                logradouro: logradouro,
                bairro: bairro,
                cidade: cidade,
                uf: uf,
                dt_nasc: dt,
                Tipo_reside: tipo,
                telefone: telefone,
                email: email,
                cpf: cpf,
                trabalha: trabalha,
                periodo_trab: periodo,
                usuario_id:usuario,

            };

            // Adiciona o adotante ao array
            employees.push(employee);

            // Limpa os campos do formulário
            document.getElementById("name").value = "";
            document.getElementById("sexo").value = "";
            document.getElementById("numero").value = "";
            document.getElementById("cep").value = "";
            document.getElementById("logradouro").value = "";
            document.getElementById("bairro").value = "";
            document.getElementById("cidade").value = "";
            document.getElementById("uf").value = "";
            document.getElementById("dt").value = "";
            document.getElementById("tipo").value = "";
            document.getElementById("telefone").value = "";
            document.getElementById("email").value = "";
            document.getElementById("cpf").value = "";
            document.getElementById("trabalha").value = "";
            document.getElementById("periodo").value = "";
            document.getElementById("usuario").value = "";

            // Atualiza a lista de adotantes
            displayEmployees();
        } else {
            alert("Por favor, preencha todos os campos do formulário.");
        }
    }

    // Função para exibir os detalhes de um adotantes
    function toggleEmployeeDetails(index) {
        const detailsDiv = document.querySelectorAll(".employee-details")[index];
        if (detailsDiv.style.display === "none" || detailsDiv.style.display === "") {
            detailsDiv.style.display = "block";
        } else {
            detailsDiv.style.display = "none";
        }
    }

    // Função para excluir um adotante
    function excluirAdotante(button) {
        const employeeDiv = button.parentElement;
        const employeeList = employeeDiv.parentElement;
        const index = Array.from(employeeList.children).indexOf(employeeDiv);

        // Remove o adotante da lista
        employees.splice(index, 1);

        // Remove o elemento HTML do adotante
        employeeDiv.remove();

        // Atualiza a lista de adotantes
        displayEmployees();
    }

    // Função para exibir os adotantes na lista
    function displayEmployees() {

        sortEmployeesByName(); // Chama a função para ordenar os adotantes por nome


        const employeeList = document.getElementById("employeeList");
        employeeList.innerHTML = ""; // Limpa a lista antes de atualizar

        employees.forEach((employee, index) => {
            const employeeDiv = document.createElement("div");
            employeeDiv.className = "employee";

            // Título do adotante (nome)
            const employeeTitle = document.createElement("h3");
            employeeTitle.textContent = "Adot: " + employee.name; // Adicione o nome aqui
            employeeTitle.addEventListener("click", () => {
                toggleEmployeeDetails(index);
            });

            // Container para detalhes do adotante (inicialmente oculto)
            const detailsDiv = document.createElement("div");
            detailsDiv.className = "employee-details";
            detailsDiv.style.display = "none";

            // Adiciona as informações do adotante aos detalhes
            for (const key in employee) {
                if (employee.hasOwnProperty(key)) {
                    const label = document.createElement("p");
                    label.textContent = key.toUpperCase() + ": " + employee[key];
                    detailsDiv.appendChild(label);
                }
            }

           // Botão de Excluir
           const deleteButton = document.createElement("button");
           deleteButton.textContent = "Excluir";
           deleteButton.className = "btn-excluir";
           deleteButton.onclick = function () {
               excluirAdotante(deleteButton);
           };

           // Adiciona elementos ao div do adotante
           employeeDiv.appendChild(deleteButton);
           employeeDiv.appendChild(employeeTitle);
           employeeDiv.appendChild(detailsDiv);

           // Adiciona o adotante à lista
           employeeList.appendChild(employeeDiv);
       });
   }

   // Configurar o evento de input no campo de pesquisa
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", buscarAdotante);

// Função para buscar adotantes pelo cpf
function buscarAdotante() {
    const searchTerm = document.getElementById("search").value.toLowerCase();

    employees.forEach((employee, index) => {
        const employeeDiv = document.querySelectorAll(".employee")[index];

        // Verifica se o cpf do adotante inclui o termo de pesquisa
        if (employee.cpf.toLowerCase().includes(searchTerm)) {
            employeeDiv.style.visibility = "visible"; // Torna o funcionário visível
        } else {
            employeeDiv.style.visibility = "hidden"; // Torna o funcionário invisível
        }
    });
}


function sortEmployeesByName() {
    employees.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
}


   // Configurar o evento de clique no botão de adicionar
   const addButton = document.getElementById("addButton");
   addButton.addEventListener("click", addEmployee);

   // Carregar e exibir os funcionários ao iniciar a página
   displayEmployees();
});