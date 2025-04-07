// Exercício 01 -> Crie um função que recebe uma data e a converte no formato DD/MM/AAAA.

function formateDate(date){
    var formatedDate = []

    date = date.split("/")
    date.forEach((element)=>{

    if(Number(element)<0){throw new Error("Dados não válidos")}    

    if(element.length==4){
        formatedDate[2] = element
    }
    else if((element.length==2 && Number(element)<=12) && formatedDate[1] == undefined){
        formatedDate[1] = element
    }
    else if(element.length==2 && Number(element)<=31){
        formatedDate[0] = element
    }
    else {
        throw new Error("Dados não válidos")
    }

    })

    return formatedDate.join("/")
}

test("1) Formatar data ",()=>{
    expect(()=>{formateDate("2020/31/10")}).toBe("10/31/2020")
})




// Exercício 02 -> Crie um função que recebe uma string e a capitaliza.
//  Capitalizar textos significa transformar a primeira letra de cada palavra em maiúscula.

function capsWords(string){
    var formatedString = ((string.trim()).toLowerCase()).split(" ")
    
    formatedString = formatedString.map(element=>{
        return element[0].toUpperCase() + element.substring(1)
    })

    formatedString.map(element => {
        if(element[0]!=element[0].toUpperCase()){
            throw new Error("Ocorreu erro ao capitalizar") 
        }
    })

    return formatedString.join(" ")
}

test("2) Capitalização de string", ()=>{
    expect(()=>{capsWords("max verstappen is the best")}).not.toThrow("Ocorreu erro ao capitalizar")
})






// Exercício 03 -> Crie um função que recebe um string e verifica se é um email válido.

function verifyEmail(email){
    let error = "Email inválido!";
    let success= "Email válido!"

    if((email.indexOf("@")== -1 || email.lastIndexOf("@")!= email.indexOf("@")) || email.indexOf(".") == -1){
        return error; // Verifica se há @, se há mais que um @ e se há .
    }

    let dominio = (email.split("."))[1]

    switch (dominio) {
        case "com":break;

        case "co":break;

        case "org":break;

        case "edu":break;
        
        case "gov":break;
        
        case "coop":break;
        
        default:
            return error;
    }

    return success;
}

test("3) Verificar e-mails (Correto)", ()=>{
    expect(verifyEmail("garfield@outlook.com")).toBe("Email válido!")
})
test("3.1) Verificar e-mails (Errado)", ()=>{
    expect(verifyEmail("garfield.com")).toBe("Email válido!")
})






// Exercício 04 -> Crie um função recebe duas datas e calcula a diferença de tempo (em dias) entre elas.

function dateDifference(date1, date2) {
    let [dia1, mes1, ano1] = date1.split("/").map(Number);
    let [dia2, mes2, ano2] = date2.split("/").map(Number);
  

    let data1 = new Date(ano1, mes1 - 1, dia1); // -1 Por que Janeiro começa no 0!
    let data2 = new Date(ano2, mes2 - 1, dia2);
  
    let diferencaMs = Math.abs(data2 - data1); // diferença em milissegundos
    let diferencaDias = Math.floor(diferencaMs / (1000 * 60 * 60 * 24)); // converter pra dias
  
    return diferencaDias;
  }
  
test("4) Diferença de datas em dias (Correto)",()=>{
    expect(dateDifference("20/03/2000","20/04/2000")).toBe(31)
})






// Exercício 05 -> Escreva uma função que recebe:
//  um array a e um número n e retorna dois números desse array cuja soma é n
//  ou lance uma excessão caso não existam.

function sumOfTwoNumbersFromArray(numbersArrays,n){
    for(let i=0;i<numbersArrays.length;i++){
        for(let j=0;j<numbersArrays.length;j++){
            let firstNumber = numbersArrays[i]
            let secondNumber = numbersArrays[j]

            if(firstNumber + secondNumber === n && i!=j){
                return `${firstNumber} + ${secondNumber} = ${n}`;
            }
        }
    }
    throw new Error("No valid pair")
}

test("5) Soma de dois números num array (Correto)",()=>{
    expect(()=>{sumOfTwoNumbersFromArray([3,5,8,2,6,4], 10)}).not.toThrow("No valid pair")
})
test("5.1) Soma de dois números num array (Errado)",()=>{
    expect(()=>{sumOfTwoNumbersFromArray([3,5], 10)}).not.toThrow("No valid pair")
})






// Exercício 06 -> Crie uma função que valida uma senha.
//  A senha deve conter pelo menos
//  8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 numeral e 1 caracter especial (pontuações e símbolos em geral).

function validatePassword(password) {
    if (password.length < 8) {
        return false;
    }

    let hasUpperCase = /[A-Z]/.test(password);
    let hasLowerCase = /[a-z]/.test(password);
    let hasNumber = /[0-9]/.test(password);
    let hasSpecialCharacters = /[^a-zA-Z0-9]/.test(password);

    return hasLowerCase && hasNumber && hasSpecialCharacters && hasUpperCase; // Verifica se todos são verdadeiros
}

test("6) Validar senha (Correto)",()=>{
    expect(validatePassword("Password123!")).toBeTruthy()
})
test("6.1) Validar senha (Errado)",()=>{
    expect(validatePassword("pas123!")).toBeTruthy()
})






// Exercício 07 -> Crie um classe Produto possui nome, marca, preço de custo, preço de venda e uma função que calcula o lucro.
// Crie um função que recebe um objeto e verifica se este possui todas as especificações e se estão corretas.

class Product{
    constructor(name,brand,costPrice,sellPrice){
        this.name = name
        this.brand = brand
        this.costPrice = costPrice
        this.sellPrice = sellPrice
    }
    calculateProfit(){
        const profit = this.sellPrice - this.costPrice
        return profit
    }
}

function verifyProduct(product){
    if(product.name == null || product.brand == null || product.costPrice == null || product.sellPrice == null){
        return "Missing Values"
    }
    if(product.calculateProfit()<=0){
        return "Cost Price > Sell Price or Profit inexistent "
    }

    return "Valid Product"
}

let product1 = new Product("casquinha","chiquinho sorvetes",10,12)
let product2 = new Product("macarrao","bmw",10,8)

test("7) Verificar Produto (Correto)",()=>{
    expect(verifyProduct(product1)).toBe("Valid Product")
})
test("7.1) Verificar Produto (Errado)",()=>{
    expect(verifyProduct(product2)).toBe("Valid Product")
})

