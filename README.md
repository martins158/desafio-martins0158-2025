# desafio-martins158-2025

Este projeto foi desenvolvido como parte de um desafio técnico para estágio, com foco em lógica de programação, organização de código e uso de testes automatizados com **Jest**.

## 🎯 Objetivo

Simular um sistema de **abrigo de animais**, no qual diferentes pessoas tentam adotar animais de acordo com regras específicas.  
O código precisa validar entradas, aplicar regras de adoção e indicar quando um animal deve ir para o abrigo.


## 📂 Estrutura do Projeto

📂 src/
├── abrigo-animais.js # Implementação das regras de adoção

└── abrigo-animais.test.js # Testes automatizados (Jest)

📦 package.json # Dependências do projeto

📄 README.md # Documentação do projeto


## 🚀 Como rodar o projeto

1. Clone o repositório:
```bash
   git clone https://github.com/martins158/desafio-martins158-2025
   cd desafio-martins158-2025
````
2. Instale as dependências:
````bash
   npm install
````
3. Execute os testes:
````bash
   npm test
````
## Regras Implementadas
1. Validação de animais e brinquedos

Animais e brinquedos devem estar na lista válida.
Entrada inválida gera erro:
"Animal inválido"
"Brinquedo inválido"



2. Subsequência de brinquedos

A ordem de brinquedos deve respeitar a sequência de preferência.
Intercalar é permitido, mas a ordem não pode ser alterada.



3. Regra especial do Loco

Se for o primeiro animal adotado, Loco deve seguir a ordem dos brinquedos normalmente.
Se a pessoa já adotou outro animal, Loco ignora a ordem (apenas exige que os brinquedos estejam presentes).



4. Limite de adoções

Cada pessoa pode adotar no máximo 3 animais.
Caso ultrapasse, o animal extra vai para o abrigo.



5. Abrigo

Animais que não podem ser adotados de acordo com as regras vão para o abrigo.


## ✅ Testes Automatizados

Os testes foram escritos com Jest e cobrem os principais cenários:
Caso básico de adoção.
Entrada inválida (animal ou brinquedo).
Regras de subsequência.
Regra especial do Loco.
Limite de 3 animais por pessoa.
Envio de animais para o abrigo.

Execução bem-sucedida:
PASS  src/abrigo-animais.test.js

  AbrigoAnimais.encontraPessoas
  
    ✓ caso básico do README: 'Rex,Fofo'
    
    ✓ animal inválido deve retornar erro
    
    ✓ brinquedo inválido ou duplicado deve retornar erro
    
    ✓ se ambos qualificam, vai para o abrigo
    
    ✓ limite de 3 animais por pessoa (excede -> abrigo se outro não qualifica)
    
    ✓ Loco ignora ordem quando tem companhia na mesma pessoa
    

## 🤔 Meus desafios no projeto
1. Entender a regra do Loco:
O enunciado deixava margem para interpretação. Decidi implementar de forma que, quando Loco já tem companhia, a ordem de brinquedos não importa.

2. Cobertura de testes:
No início, tive falhas porque alguns cenários não estavam claros (ex.: entrada inválida retornava "Erro inesperado"). Ajustei o tratamento para mensagens de erro mais específicas.

3. Equilíbrio de código:
Evitei soluções muito complexas. Como a vaga é para estágio, preferi uma lógica clara e objetiva ao invés de abstrações excessivas.

## 📌 Observações finais

Projeto simples, mas cobre lógica, regras de negócio e testes automatizados.
O foco foi em clareza, organização e transparência.
Estou muito feliz por ter participado deste processo seletivo. Esse desafio foi muito especial para mim, porque me fez refletir, testar ideias e buscar soluções de forma criativa. 
Foi uma experiência de grande aprendizado e crescimento, e sou grato pela oportunidade de mostrar um pouco do meu esforço e dedicação.
