let input = document.querySelector('input')
    let button = document.querySelector('button')
    
    function procurar(){
        fetch("https://dragonball-api.com/api/characters").then(response => response.json()).then(data =>{
            console.log(data)
            let ul = document.querySelector('ul')
            ul.innerHTML = ""
            let li = document.createElement('li')
            let img = document.createElement('img')
            let des = document.createElement('li')
            for(i in data.items){
                if(data.items[i].name.toLowerCase() == input.value.toLowerCase()){
                    img.src = data.items[i].image
                    li.innerHTML = data.items[i].name
                    des.innerHTML = data.items[i].description
                    li.appendChild(img)
                    ul.appendChild(li)
                    ul.appendChild(des)
                    input.value = ""
                }else if(input.value.toLowerCase() == "todos"){
                    for(l in data.items){
                        let li = document.createElement('li')
                        let img = document.createElement('img')
                        let des = document.createElement('li')
                        img.src = data.items[l].image
                        li.innerHTML = data.items[l].name
                        des.innerHTML = data.items[l].description
                        li.appendChild(img)
                        ul.appendChild(li)
                        ul.appendChild(des)
                        input.value = ""
                    }
                }
            }
            if(ul.innerHTML == ""){
                if(input.value == ""){
                    img.src = "images.jpg"
                    li.innerHTML = "Não digitou nada né"
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
        })
    }

    button.addEventListener('click', procurar)

    input.addEventListener('keyup', function(event){
        if(event.keyCode === 13){
            procurar()
        }
    })
