class Cliente {
    #Nome
    #Cpf
    #DataNascimento

    constructor(nome, cpf, dataNascimento) {
        this.setNome(nome)
        this.setCpf(cpf)
        this.setDataNascimento(dataNascimento)
    }

    setNome(nome) {
        for (let i = 0; i < 2; i++) {
            if (nome.length < 50) {
                this.#Nome = nome
                i = 2
            } else {
                alert("Nome Com mais de 50 Caracteres, Digite novamente")
                nome = prompt("Digite o nome novamente:")
                i = 0
            }
        }
    }
    getNome() { return this.#Nome }

    setCpf(cpf) {
        for (let i = 0; i < 2; i++) {
            if (cpf.length != 11) {
                alert("Cpf Digitado errado.")
                cpf = prompt("Digite novamente: ")
                i = 0
            } else {
                this.#Cpf = cpf
                i = 2
            }
        }
    }
    getCpf() { return this.#Cpf }

    setDataNascimento(dataNascimento) { this.#DataNascimento = dataNascimento }
    getDataNascimento() { return this.#DataNascimento }

}

class Voo {
    #Empresa
    #Numero
    #Data
    #Horario
    #LocalPartida
    #LocalDestino

    constructor(empresa, numero, data, horario, localPartida, localDestino) {
        this.setEmpresa(empresa)
        this.setNumero(numero)
        this.setData(data)
        this.setHorario(horario)
        this.setLocalPartida(localPartida)
        this.setLocalDestino(localDestino)
    }

    setEmpresa(empresa) { this.#Empresa = empresa }
    getEmpresa() { return this.#Empresa }

    setNumero(numero) { this.#Numero = numero }
    getNumero() { return this.#Numero }

    setData(data) { this.#Data = data }
    getData() { return this.#Data }

    setHorario(horario) { this.#Horario = horario }
    getHorario() { return this.#Horario }

    setLocalPartida(localPartida) { this.#LocalPartida = localPartida }
    getLocalPartida() { return this.#LocalPartida }

    setLocalDestino(localDestino) { this.#LocalDestino = localDestino }
    getLocalDestino() { return this.#LocalDestino }
}

class PassagemArea {
    Assento
    PrimeiraClasse
    Valor
    Passageiro
    Voo

    constructor(assento, primeiraClasse, valor, nome, voo) {
        this.setAssento(assento)
        this.setPrimeiraClasse(primeiraClasse)
        this.setCalcularPassagem(primeiraClasse, valor)
        this.setPassageiro(nome)
        this.setVoo(voo)
    }

    setAssento(assento) { this.Assento = assento }
    getAssento() { return this.Assento }

    setPrimeiraClasse(primeiraClasse) { this.PrimeiraClasse = primeiraClasse }
    getPrimeiraClasse() { return this.PrimeiraClasse }

    setPassageiro(cliente) {
        this.Passageiro = cliente
    }
    getPassageiro() { return this.Passageiro }

    setCalcularPassagem(primeiraClasse, valor) {
        if (primeiraClasse == true) {
            this.Valor = valor + valor * 0.50
        } else {
            this.Valor = valor
        }
    }
    getValor() { return this.Valor }

    setVoo(voo) {
        this.Voo = voo
    }
    getVoo() { return this.Voo }

    ExibirResumo() {
        console.log("Passagem em nome de " + this.Passageiro.getNome() + ", no assento " + this.Assento + " do voo " + this.Voo.getNumero() + ", com destino para " + this.Voo.getLocalDestino())
    }
}

class PacoteViagem {
    #Titular
    #PassagemIda
    #PassagemVolta
    #ValorTotal

    constructor(cliente, passagemIda, passagemVolta) {
        this.setTitular(cliente)
        this.setPassagemIda(passagemIda)
        this.setPassagemVolta(passagemVolta)
        this.setValorTotal()
    }

    setTitular(cliente) {
        this.#Titular = cliente
    }
    getTitular() { return this.#Titular }

    setPassagemIda(passagemIda) { this.#PassagemIda = passagemIda }
    getPassagemIda() { return this.#PassagemIda }

    setPassagemVolta(passagemVolta) { this.#PassagemVolta = passagemVolta }
    getPassagemVolta() { return this.#PassagemVolta }

    setValorTotal() {
        this.#ValorTotal = this.#PassagemIda.getValor() + this.#PassagemVolta.getValor();
    }
    getValorTotal() { return this.#ValorTotal }
}


let clientes = []
let passagens = []
let voos = []
let pacotes = []

let cliente = new Cliente("Vinicius", "12783621361", "11/01/2001")

let voo = new Voo("AirPlane Company", "1234", "10/01/2023", 14, "São Paulo - SP", "Miami - FL")
let passagemIda = new PassagemArea(12, true, 500.00, cliente.getNome(), voo.getNumero())
voos.push(voo)
passagens.push(passagemIda)

voo = new Voo("AirPlane Company", "4321", "20/01/2023", 14, "Miami - FL", "São Paulo - SP")
let passagemVolta = new PassagemArea(12, false, 500.00, cliente.getNome(), voo.getNumero())
voos.push(voo)
passagens.push(passagemVolta)

var testPutPassagem = new PassagemArea(16, true, 299.99, cliente.getNome(), voo.getNumero())

let pacote = new PacoteViagem(cliente, passagemIda, passagemVolta)

clientes.push(cliente)
pacotes.push(pacote)

var apiEndpoint = "https://apigenerator.dronahq.com/api/st6ALJmJ/passagem"

async function getPassagens(){
    return fetch(apiEndpoint)
    .then(response => response.json())
    .then((passagem) => console.log(passagem))
}

async function getById(id){
    return fetch(`${apiEndpoint}/${id}`)
    .then(response => response.json())
    .then((passagem) => console.log(passagem))
}

async function createPassagem(passagem = {}){
    const response = await fetch(apiEndpoint, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(passagem)
        });
        return response.json();
}

async function deletePassagem(id){
    const response = await fetch(`${apiEndpoint}/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        });
        return response.json();
}



async function updatePassagem(id,passagem = {}){
    const response = await fetch(`${apiEndpoint}/${id}`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(passagem)
        });
        return response.json();
}

getPassagens()