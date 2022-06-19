console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", function() {

    let dogList = document.querySelector("#dog-breeds")

    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(response => response.json())
        .then(handleImageAppending)

    makeFetching()
        .then(response => {
            let dogBreedsArr = Object.keys(response.message)
            dogBreedsArr.forEach((breed) => addLI(breed))
        })

    dogList.addEventListener("click", function(event) {
        if (event.target.dataset.info === "breed") {
            event.target.style.color = "orange"
        }
    })

    let dogSelect = document.getElementById('breed-dropdown')
    dogSelect.addEventListener("change", (event) => {
        makeFetching()
            .then(res => {
                let dogBreedsArr = Object.keys(res.message)

                let filteredArry = dogBreedsArr.filter(breed => {
                    return breed.startsWith(event.target.value)
                })
                dogList.innerHTML = ""

                filteredArry.forEach(addLI)
            })

    })
})

function makeFetching() {
    return fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
}

function handleImageAppending(jsonObject) {
    let dogImageContainer = document.getElementById('dog-image-container')
    let arrOfDogURLs = jsonObject.message
    arrOfDogURLs.forEach(url => {
        dogImageContainer.innerHTML += makeImageTagString(url)
            //dogImageContainer.append(makeImageTagElemet(url))
    })
}

function makeImageTagString(url) {
    return `<img src="${url}"/>`
}

function addLI(breed) {
    let dogList = document.querySelector("#dog-breeds")
    dogList.innerHTML += `<li data-info="breed">${breed}!</li>`
}