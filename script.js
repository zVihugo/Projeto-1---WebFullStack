let input = document.querySelector('input')
    let button = document.querySelector('button')
    let button2 = document.getElementById('botao')
    let sugestoes = document.querySelector('.sugestoes')
    
    
    function procurar(){
        let promises = [];
        for(let page = 1; page <= 7; page++){
            promises.push(fetch("https://dragonball-api.com/api/characters?page=" + page).then((response) => response.json()));
        }
    
        Promise.all(promises).then((results) => {
            let Personagens = [];
            results.forEach((data) => {
                Personagens = Personagens.concat(data.items);
            });
    
            console.log(Personagens); 
    
            let ul = document.querySelector('ul')
            ul.innerHTML = ""
            let li = document.createElement('li')
            let img = document.createElement('img')
            let des = document.createElement('li')
            for(i in Personagens){
                if(Personagens[i].name.toLowerCase() == input.value.trim().toLowerCase()){
                    img.src = Personagens[i].image
                    li.innerHTML = Personagens[i].name
                    des.innerHTML = Personagens[i].description
                    li.appendChild(img)
                    ul.appendChild(li)
                    ul.appendChild(des)
                    input.value = ""
                }
            }
            if(ul.innerHTML == ""){
                if(input.value == ""){
                    img.src = "images.jpg"
                    li.innerHTML = "Digita o nome meu rei"
                    des.innerHTML = "Parece que alguem aqui ta querendo me dificultar"
                    li.appendChild(img)
                    ul.appendChild(li)
                    ul.appendChild(des)
                }
                else{
                    img.src = "download.png"
                    li.innerHTML = "Personagem não encontrado"
                    des.innerHTML = "Te orienta fiote, não tem esse personagem aqui não"
                    li.appendChild(img)
                    ul.appendChild(li)
                    ul.appendChild(des)
                }
            }
            if(input.value.trim().toLowerCase() == "todos"){ 
                ul.innerHTML = ""
                for(i in Personagens){
                    let li = document.createElement('li')
                    let img = document.createElement('img')
                    let des = document.createElement('li')
                    img.src = Personagens[i].image
                    li.innerHTML = Personagens[i].name
                    des.innerHTML = Personagens[i].description
                    li.appendChild(img)
                    ul.appendChild(li)
                    ul.appendChild(des)
                }
                input.value=""
            }
        });
    }
    
    function gerarAleatorio(){
        let promises = [];
        for(let page = 1; page <= 7; page++){
            promises.push(fetch("https://dragonball-api.com/api/characters?page=" + page).then((response) => response.json()));
        }
    
        Promise.all(promises).then((results) => {
            let Personagens = [];
            results.forEach((data) => {
                Personagens = Personagens.concat(data.items);
            });
    
            console.log(Personagens); 
    
            let ul = document.querySelector('ul')
            ul.innerHTML = ""
            let li = document.createElement('li')
            let img = document.createElement('img')
            let des = document.createElement('li')
            let aleatorio = Math.floor(Math.random() * Personagens.length)
            img.src = Personagens[aleatorio].image
            li.innerHTML = Personagens[aleatorio].name
            des.innerHTML = Personagens[aleatorio].description
            li.appendChild(img)
            ul.appendChild(li)
            ul.appendChild(des)
        });
    }
    
    button2.addEventListener('click', gerarAleatorio)
    
    button.addEventListener('click', procurar)
    
    input.addEventListener('keyup', function(e){
        if(e.key === "Enter"){
            procurar()
        }
    })

    input.addEventListener('input', function() {
        let promises = [];
        for(let page = 1; page <= 7; page++){
            promises.push(fetch("https://dragonball-api.com/api/characters?page=" + page).then((response) => response.json()));
        }

        Promise.all(promises).then((results) => {
            let Personagens = [];
            results.forEach((data) => {
                Personagens = Personagens.concat(data.items);
            });

           if(input.value !== ""){
            let inputValue = input.value.trim().toLowerCase();
            let filtro = Personagens.filter(character => character.name.toLowerCase().startsWith(inputValue));
            sugestoes.innerHTML = '';
            filtro.forEach(character => {
                let suggestion = document.createElement('div');
                suggestion.textContent = character.name;
                suggestion.addEventListener('click', function() {
                    input.value = character.name;
                    sugestoes.innerHTML = '';
                    procurar();
                });
                sugestoes.appendChild(suggestion);
            });
            }else{
                sugestoes.innerHTML = '';
            }
        });
    });