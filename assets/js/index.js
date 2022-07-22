let sanduiche          = document.querySelector(".menu_sanduiche")
let sanduicheNavegacao = document.querySelector(".navegacao")
let carrinhoCompras    = document.querySelector(".carrinhoDeCompra")
let divMobile          = document.querySelector(".interacao_mobile")
let menuNavegacao      = document.querySelector(".navegacao ul")
let menuProdutos       = document.querySelector(".principal")
let form               = document.querySelector(".lateral_pesquisa button")
let input              = document.querySelector(".lateral_pesquisa input")
let ulCarrinho         = document.querySelector(".lateral_ul")
let spanQuantidade     = document.querySelectorAll(".contador_quantidade span")[0]
let spanValor          = document.querySelectorAll(".contador_quantidade span")[1]
let spanCor            = document.querySelector(".cor")
let mode               = document.querySelector("#mode")
let local              =window.location.href

function whiteMode(x) {
    console.log();
    if (x.target.innerText === "Mode:" ||x.target.classList.value === "botaoDark") {
            if (mode.href.includes("assets/css/style.css")) {
            mode.href ="./assets/css/styleWhite.css"
            
        } else {
             mode.href = "./assets/css/style.css"
        }
    }
   
    
}
menuNavegacao.addEventListener("click",whiteMode)

function sanduicheDisplay() {
    
    sanduicheNavegacao.classList.toggle("menu_listaDesliga")
   
}

sanduiche.addEventListener("click",sanduicheDisplay)

function carrinhoDisplay() {

    divMobile.classList.toggle("interacao_mobile")

}

carrinhoCompras.addEventListener("click",carrinhoDisplay)

function tirandoClass() {
    divMobile.classList.add("interacao_mobile")
    sanduicheNavegacao.classList.add("menu_listaDesliga")

}
function tirandoClas() {
    if (window.innerWidth > 949) {
        divMobile.classList.add("interacao_mobile")
    }
    
    sanduicheNavegacao.classList.add("menu_listaDesliga")
}
window.addEventListener("resize",tirandoClas)



function menuNavegacaoSimples(event) {
    let arrNew = []
    sanduicheDisplay()
    
    if (event.target.tagName === "A") {
        
        
        for (let i = 0; i < data.length; i++) {
            if (event.target.innerText === data[i].tag[0]) {
                arrNew.push(data[i])
            }
            
        }
        if ( event.target.innerText === "Todos" ) {
             criarMenu(data)
             
             
        }
        else{
            
             criarMenu(arrNew)
             
        }

        
    }else if (arrNew.length !== 0) {
             criarMenu(arrNew)
             
    }
             
    
    
}

menuNavegacao.addEventListener("click",menuNavegacaoSimples)


function criarMenu(x) {
    menuProdutos.innerHTML=""
    let ulMenu = document.createElement("ul")
    menuProdutos.appendChild(ulMenu)
    for (let i = 0; i < x.length; i++) {

        let li         = document.createElement("li")
        let divImg     = document.createElement("div")
        let img        = document.createElement("img")
        let divCard    = document.createElement("div")
        let h2Lista    = document.createElement("h2")
        let pLista     = document.createElement("p")
        let spanLista  = document.createElement ("span")
        let butaoLista = document.createElement("button")
        let tratamentoRS = x[i].value


        li.classList.add("principal__lista")
        divImg.classList.add("conteinerImg")
        img.src = x[i].img
        img.alt = x[i].nameItem
        divCard.classList.add("categoria")
        divCard.innerText = x[i].tag
        h2Lista.innerText = x[i].nameItem
        pLista.innerText  = x[i].description
        spanLista.innerText = tratamentoRS.toLocaleString("pt-br",{style:"currency",currency:"BRL",minimumFractionDigits:2})
        butaoLista.innerText = x[i].addCart
        butaoLista.id = x[i].id
        
        divImg.appendChild(img)
        ulMenu.appendChild(li)
        li.append(divImg,divCard,h2Lista,pLista,spanLista,butaoLista)
    }
}

criarMenu(data)



function pesquisaTipo(event) {
    
    event.preventDefault()

    let arr = []
    let tratamento = input.value
    tratamento = tratamento.trim().toLowerCase()
   if (event.target.tagName === "BUTTON"|| event.keyCode === 13) {
       
        

        let filtro = data.filter(a => a.nameItem.trim().toLowerCase().includes(tratamento))
        arr = filtro

        let filtroDrecri = data.filter(a => a.description.trim().toLowerCase().includes(tratamento))
        arr = filtroDrecri

        for (let i = 0; i < data.length; i++) {
            if (data[i].tag.join("").trim().toLowerCase().includes(tratamento)) {
                arr.push(data[i])
        
            }
            
        }
        input.value = ""
    }
    
   if (arr.length !== 0) {
    return criarMenu(arr)
   }
   
}
window.addEventListener("keyup",pesquisaTipo)
window.addEventListener("submit",pesquisaTipo)
form.addEventListener("click",pesquisaTipo)



function rederizandoCarrinho(x) {
    ulCarrinho.innerHTML = ""
    let arr = x
   

     
    for (let i = 0; i < arr.length; i++) {

        let li     = document.createElement("li")
        let img    = document.createElement("img")
        let div    = document.createElement("div")
        let p      = document.createElement("p")
        let span   = document.createElement("span")
        let button = document.createElement("button")
        
        li.classList.add("listaCarrinho")
        img.src = arr[i].img
        img.alt = arr[i].nameItem
        div.classList.add("description")
        
        if (arr[i].contador > 1) {
            p.innerText = `${arr[i].nameItem} (x${arr[i].contador})`
        }else{
            p.innerText = arr[i].nameItem
        }
        
        span.innerText = arr[i].value.toLocaleString("pt-br",{style:"currency",currency:"BRL",minimumFractionDigits:2})
        button.innerText = "Remover produto"
        button.id = i

        div.append(p,span,button)
        li.append(img,div)
        ulCarrinho.appendChild(li)
    }
}

let arr = []

function adicionarNoCarrinho(event) {
    
    if (event.target.tagName === "BUTTON") {
       for (let i = 0; i < data.length; i++) {
            
             if (Number(event.target.id) === data[i].id) {
                   
                arr.push(data[i])      
                
            }
        
       }
       let arrNew = []
       for (let i = 0; i < arr.length; i++) {
           for (let j = 1; j < arr.length; j++) {
               if (i !== j) {
                    if (arr[i].id === arr[j].id) {
                        arr[i].contador++
                        arr.pop()
                    }
                
               }
            
           }
        
       }
       rederizandoCarrinho(arr)
       somaCarrinho(arr)
    }
    
   
}

menuProdutos.addEventListener("click",adicionarNoCarrinho)

function removeCarrinho(event) {
    if (event.target.tagName === "BUTTON") {
        for (let i = 0; i < arr.length; i++) {
            if (Number(event.target.id) === i) {
                arr[i].contador--
                rederizandoCarrinho(arr)
                somaCarrinho(arr)
                if (arr[i].contador === 0) {
                    arr[i].contador++
                    arr.splice(i,1)
                    rederizandoCarrinho(arr)
                    somaCarrinho(arr)
                }
            }
            
        } 
        if (arr.length === 0) {
            tirandoClass()
            let li   = document.createElement("li")
            let p    = document.createElement("p")
            let span = document.createElement("span")
    
            li.classList.add("carrinhoVazio")
            p.innerText ="Carrinho vázio"
            span.innerText ="Adicione itens"
    
            li.append(p,span)
            ulCarrinho.appendChild(li)
            
    
        } 
       
    }
   
}

ulCarrinho.addEventListener("click",removeCarrinho)

function somaCarrinho(arr) {
    let contadores = 0
    let agora =  spanQuantidade.closest("div")
    let somaValor = [0]
    for (let i = 0; i < arr.length; i++) {
        somaValor.push(arr[i].value * arr[i].contador)
        contadores += arr[i].contador
            
        
   }
   somaValor = somaValor.reduce((a,b) => a + b) 
   
    if (arr.length !== 0) {
        agora.classList.remove("Contador_seria")
        spanValor.innerText = somaValor.toLocaleString("pt-br",{style:"currency",currency:"BRL",minimumFractionDigits:2})
        spanQuantidade.innerText = contadores
    }else{
      
        agora.classList.add("Contador_seria")
    }

    
        spanCor.innerText = `x${contadores}`
    if (contadores === 0) {
        spanCor.innerText = ""
    }
}

