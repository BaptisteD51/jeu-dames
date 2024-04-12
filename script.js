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
        for(var i = 1; i <= 8; i++){
            c = (c=='white') ? 'black' : 'white'
            let line = []
            for(var j = 1; j <= 8; j++){
                c = (c=='white') ? 'black' : 'white'
                line.push({
                    x:j,
                    y:i,
                    color:c,
                })
            }
            this.grid.push(line)  
        }

        this.pions = []
        for(var i = 1; i <= 4; i++){
            for(var j = 1; j <= 8; j+=2){
                var pion = new Pion(j,i,"black")
                this.pions.push(pion)
            }
        }

        for(var i = 5; i <= 8; i++){
            for(var j = 1; j <= 8; j+=2){
                var pion = new Pion(j,i,"white")
                this.pions.push(pion)
            }
        }
    }

    render_damier(){
        const damier = document.createElement('div')
        damier.classList.value = "damier"
        document.body.appendChild(damier)
        
        this.grid.forEach((line)=>{
            line.forEach((e)=>{
                const c = document.createElement('div')
                c.classList.value = "case"
                c.classList.add(e.color)
                c.style.gridRow = e.y
                c.style.gridColumn = e.x
                c.classList.add('x'+e.x)
                c.classList.add('y'+e.y)
                damier.appendChild(c)
            })
        })
    }

    render_pions(){
        this.pions.forEach((pion)=>{
            var c = document.querySelector("div.x"+pion.x+".y"+pion.y)
            var pionHtml = document.createElement('div')
            pionHtml.classList.value = 'pion ' + pion.color + ' x' + pion.x + ' y' + pion.y
            c.appendChild(pionHtml)
        })
    }

    render(){
        this.render_damier()
        this.render_pions()
    }
}

let pion2 = new Pion(2,3,'white')
pion2.move([3,4])
let damier = new Damier()