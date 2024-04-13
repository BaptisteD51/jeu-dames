class C{
    constructor(x,y,color){
        this.x = x
        this.y = y
        this.color = color
    }

    render(){
        var cHtml = document.createElement('div')
        cHtml.classList.value = 'x'+this.x + ' y' + this.y + ' ' + this.color + ' case'
        cHtml.dataset.x = this.x
        cHtml.dataset.y = this.y
        return cHtml
    }
}

class Pion{
    constructor(x,y,color){
        this.x = x
        this.y = y
        this.color = color
    }

    move([x,y]){
        this.x = x
        this.y = y
    }

    validMoves(){
        var move1 = []
        var move2 = []
        if(this.color == 'black'){
            move1 = [this.x - 1, this.y + 1]
            move2 = [this.x + 1, this.y + 1]
        }else if(this.color == 'white'){
            move1 = [this.x - 1, this.y - 1]
            move2 = [this.x + 1, this.y - 1]
        }
        return [move1,move2]
    }
}

class Damier{
    constructor(){
        this.grid = []
        var c = "white"
        for(var i = 1; i <= 10; i++){
            c = (c=='white') ? 'black' : 'white'
            let line = []
            for(var j = 1; j <= 10; j++){
                c = (c=='white') ? 'black' : 'white'
                line.push(new C(j,i,c))
            }
            this.grid.push(line)  
        }

        this.pions = []
        for(var i = 1; i <= 4; i++){
            c = (c=='white') ? 'black' : 'white'
            for(var j = 1; j <= 10; j+=2){
                var x = (c=='black') ? j : j+1
                var y = i
                var pion = new Pion(x,y,"black")
                this.pions.push(pion)
            }
        }

        for(var i = 7; i <= 10; i++){
            c = (c=='white') ? 'black' : 'white'
            for(var j = 1; j <= 10; j+=2){
                var x = (c=='black') ? j : j+1
                var y = i
                var pion = new Pion(x,y,"white")
                this.pions.push(pion)
            }
        }
    }

    #render_damier(){
        const damier = document.createElement('div')
        damier.classList.value = "damier"
        document.body.appendChild(damier)
        
        this.grid.forEach((line)=>{
            line.forEach((c)=>{
                var cHtml = c.render()
                damier.appendChild(cHtml)
            })
        })
    }

    #render_pions(){
        this.pions.forEach((pion)=>{
            var c = document.querySelector("div.x"+pion.x+".y"+pion.y)
            var pionHtml = document.createElement('div')
            pionHtml.classList.value = 'pion ' + pion.color + ' x' + pion.x + ' y' + pion.y
            pionHtml.dataset.x = pion.x
            pionHtml.dataset.y = pion.y
            c.appendChild(pionHtml)
        })
    }

    render(){
        document.body.innerHTML = ""
        this.#render_damier()
        this.#render_pions()
    }
}

// class Player{
//     constructor(color){
//         this.color = color
//     }

//     selectPion(){
//         var pions = document.querySelectorAll('div.pion.'+this.color)
//         pions.forEach((pion)=>{
//             pion.addEventListener('click', function(){
//                 return(this)
//             })
//         })
//     }
// }

class Game{
    constructor(){
        this.damier = new Damier()
    }

    selectPion(){
        var pions = document.querySelectorAll('div.pion')
        pions.forEach((pion)=>{
            pion.addEventListener('click', ()=>{
                var x = pion.dataset.x
                var y = pion.dataset.y
                this.damier.pions.forEach((pion)=>{
                    if(x == pion.x && y==pion.y){
                        console.log(pion)
                        // use something with .bind to change the context for the this
                        this.#movePossibility(pion)
                        return pion
                    }
                })
            })
        })
    }

    #movePossibility(pion){
        var d = (pion.color == 'white') ? -1 : 1
        var cHtml1 = document.querySelector("div.x"+(parseInt(pion.x)-1)+".y"+(parseInt(pion.y)+d))
        var cHtml2 = document.querySelector("div.x"+(parseInt(pion.x)+1)+".y"+(parseInt(pion.y)+d))
        var cs = [cHtml1,cHtml2]
        console.log(cs)
        cs.forEach((cHtml)=>{
            cHtml.classList.add('red')
            cHtml.addEventListener('click', ()=>{
                pion.move([cHtml.dataset.x,cHtml.dataset.y])
                this.damier.render()
            })
        })
    }
}

const game = new Game()
game.damier.render()
game.selectPion()
