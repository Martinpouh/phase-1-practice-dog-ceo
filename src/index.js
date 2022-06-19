console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", function() {

        let dogUL = document.querySelector("#dog-breeds")

        //challenge 1 dog imgages
        fetch("https://dog.ceo/api/breeds/image/random/4")
            .then(response => response.json())
            .then(handleImageAppending)
            //challenge 1

        //challenge 2 dog breed list
        makeFetching()
            .then(response => {
                let dogBreedsArr = Object.keys(response.message)
                dogBreedsArr.forEach((breed) => addLI(breed))
            })
            //challenge 2 

        //challange 3 select breed and color changing click
        dogUL.addEventListener("click", function(event) {
                if (event.target.dataset.info === "breed") {
                    event.target.style.color = "orange"
                }
            })
            //challenge 3

        //challeng 4 filter dogs
        let dogSelect = document.getElementById('breed-dropdown')
        dogSelect.addEventListener("change", (event) => {
            makeFetching()
                .then(res => {
                    let dogBreedsArr = Object.keys(res.message)

                    let filteredArry = dogBreedsArr.filter(breed => {
                        return breed.startsWith(event.target.value)
                    })

                    dogUL.innerHTML = ""

                    filteredArry.forEach(addLI)
                })

        })
    })
    //challeng 4




//DOMContentLoaded
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
    let dogUL = document.querySelector("#dog-breeds")
    dogUL.innerHTML += `<li data-info="breed">${breed}!</li>`
}