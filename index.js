const main = document.querySelector("main"); //id
const root = document.querySelector(":root"); //id
const input = document.getElementById("input"); //id
const resultInput = document.getElementById("result"); //id

//impedir que o usuário digite outras teclas

const allowedKeys = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "%",
  " ",
];

//funcionamento dos botões -> seleciona todos da classe charKey, para cada um (forEach) execute essa função
document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener("click", function () {
    //adicionando evento
    const value = charKeyBtn.dataset.value;
    input.value += value;
  });
});

//funcionamento de outro botão -> clear
document.getElementById("clear").addEventListener("click", function () {
  input.value = ""; //input fica vazio
  input.focus(); //o cursor vai ficar focado no input
});

//se a tecla for pressionada aciona o evento
input.addEventListener("keydown", function (ev) {
  ev.preventDefault();

  //se a tecla estiver incluida no array de allowedkeys
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key; //acrescenta ela no valor do input
    return;
  }

  //tecla de delete
  if (ev.key === "Backspace") {
    input.value = input.value.slice(0, -1); //vai excluir o ultimo, ate o penultimo (letra)
  }

  //tecla de enter
  if (ev.key === "Enter") {
    calculate();
  }
});

//funcionamento de outro botão -> =
document.getElementById("equal").addEventListener("click", calculate); //pq a função calculate vai dar o resultado

//função de calcular
function calculate() {
  resultInput.value = "ERROR"; //vai iniciar com o erro
  resultInput.classList.add("error"); //vai adicionar a caixa vermelha pra representar

  const result = eval(input.value); //calculo do resultado //não usar eval em sistemas mais complexos (problema de segurança)

  resultInput.value = result; //se o resultado for válido, vai executar o remove Error
  resultInput.classList.remove("error"); //assim que tratar o erro, remove a classe error
}

//copy to clipboard
document
  .getElementById("copyToClipboard")
  .addEventListener("click", function (ev) {
    const button = ev.currentTarget;
    if (button.innerText === "Copy") {
      button.innerText = "Copied!"; //avisar para o usuário que o texto foi copiado
      button.classList.add("success"); //vai pegar do css o estilo

      //copiar o texto para área de trasnferencia
      window.navigator.clipboard.writeText(resultInput.value);
    } else {
      button.innerText = "Copy";
      button.classList.remove("success");
    }
  });

//alternar os temas
document.getElementById("themeSwitcher").addEventListener("click", function () {
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9"); //trocar o bg color para branco
    root.style.setProperty("--border-color", "#aaa");
    root.style.setProperty("--font-color", "#212529");
    root.style.setProperty("--primary-color", "#26834a");
    main.dataset.theme = "light";
  } else {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#4dff91");
    main.dataset.theme = "dark";
  }
});
