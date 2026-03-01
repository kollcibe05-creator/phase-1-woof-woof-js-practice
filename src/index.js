
let pups = []

const dogBar = document.getElementById("dog-bar")
const dogInfo = document.getElementById("dog-info")


fetch("http://localhost:3000/pups")
.then(r => r.json())
.then(data => {
    pups = data
    makeSpan(pups)
})

function makeSpan(pupList) {
    
    pupList.forEach(pup => {
            const span = document.createElement("span")
            span.textContent = pup.name
            dogBar.append(span)

            span.addEventListener("click", () => {
                fetchOne(pup.id)

            })

    });
}


function fetchOne (id) {
    fetch(`http://localhost:3000/pups/${id}`)
    .then(r => r.json())
    .then(pup => makePupInfo(pup))
}

function  makePupInfo (pup) {

    dogInfo.innerHTML = ''

    const img = document.createElement("img")
    img.src = pup.image

    dogInfo.appendChild(img)

    const h2 = document.createElement("h2")
    h2.textContent = pup.name
    dogInfo.appendChild(h2)


     

    const button = document.createElement("button")
    button.id = pup.id
    button.textContent = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"

    dogInfo.appendChild(button)

    button.addEventListener("click", () => {

        const updatedStatus = !pup.isGoodDog
        
        patchIsGoodDog( pup,updatedStatus, button  )
    })

}


function patchIsGoodDog (pup, updatedStatus, button) {
        fetch(`http://localhost:3000/pups/${pup.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, 
            body: JSON.stringify({isGoodDog: updatedStatus})
        })
        .then (r => r.json())
        .then (updatedPup => {
            pup.isGoodDog = updatedPup.isGoodDog;
            button.textContent = updatedPup.isGoodDog ? "Good Dog!": "Bad Dog!"
        })   

}


const filterBtn = document.getElementById("good-dog-filter")


filterBtn.addEventListener ("click", () => {

        const filterMode = filterBtn.textContent === "Filter good dogs: OFF" ? true : false


        filterBtn.textContent = filterMode === true ? "Filter good dogs: ON" : "Filter good dogs: OFF"

       const goodPups =  pups.filter (pup => pup.isGoodDog === true)

       if (filterMode === true) {
            dogBar.innerHTML = ''
            pupsDisplayed = goodPups
            makeSpan(pupsDisplayed)
       }else{
              dogBar.innerHTML = ''
              makeSpan(pups)
       }
    })
    


    
