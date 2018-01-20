const dogBreeds = [
    "affenpinscher",
    "african",
    "airedale",
    "akita",
    "appenzeller",
    "basenji",
    "beagle",
    "bluetick",
    "borzoi",
    "bouvier",
    "boxer",
    "brabancon",
    "briard",
    "bulldog",
    "bullterrier",
    "cairn",
    "chihuahua",
    "chow",
    "clumber",
    "collie",
    "coonhound",
    "corgi",
    "dachshund",
    "dane",
    "deerhound",
    "dhole",
    "dingo",
    "doberman",
    "elkhound",
    "entlebucher",
    "eskimo",
    "germanshepherd",
    "greyhound",
    "groenendael",
    "hound",
    "husky",
    "keeshond",
    "kelpie",
    "komondor",
    "kuvasz",
    "labrador",
    "leonberg",
    "lhasa",
    "malamute",
    "malinois",
    "maltese",
    "mastiff",
    "mexicanhairless",
    "mountain",
    "newfoundland",
    "otterhound",
    "papillon",
    "pekinese",
    "pembroke",
    "pinscher",
    "pointer",
    "pomeranian",
    "poodle",
    "pug",
    "pyrenees",
    "redbone",
    "retriever",
    "ridgeback",
    "rottweiler",
    "saluki",
    "samoyed",
    "schipperke",
    "schnauzer",
    "setter",
    "sheepdog",
    "shiba",
    "shihtzu",
    "spaniel",
    "springer",
    "stbernard",
    "terrier",
    "vizsla",
    "weimaraner",
    "whippet",
    "wolfhound"
]

// get user data
const searchInput = document.querySelector('#dog-input');

$("#dog-input").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#dog-button-submit").click();
    }
});

$('#dog-button-submit').on('click', function() {
    let input = $('#dog-input').val();
    getDog(input);
})

// text autocomplete
function findMatch (wordToMatch, dogBreeds) {
    return dogBreeds.filter(breed => {
        //figure out if breed matches user search
        //g is global, searches through entire string
        //incensitive - matches lower and upper case
        const regex = new RegExp(wordToMatch, 'gi');
        return breed.match(regex);
    })
}

searchInput.addEventListener('keyup', displayMatches);
//display findMatch
function displayMatches(){
    const matchArray = findMatch(this.value, dogBreeds);
   const html = matchArray.map(function(dog){
       return `<li class="dog-dropdown-item" id="${dog}"> ${dog} </li>`;
   })
   $('.dog-dropdown').html(html);
}

$('.dog-dropdown').on('click', function(e) {
    if(e.target.tagName == 'LI') {
        console.log(e.target.id);
        let dogVal = e.target.id;
        $('#dog-input').val(dogVal);
        getDog(dogVal);
        $(this).html('');
    }
})

// api functionality
function getDog (data) {
    const url = 'https://dog.ceo/api/breed/' + data + '/images/random';

    $.ajax({
        url: url,
        method: 'GET'
    }).then(function(response){
        console.log(response);
        if (response.message === 'Breed not found') {
            $("#dog-results").html("<div class='iframely__results--sub'> No results found. Make sure you type in a real-live dog breed. </div>" + 
            '<img class="happy-accidents" src="img/happy-accidents.png">')
        } else {
            $('#dog-results').html(
                '<img class="dog-img" src="' + response.message + '" alt="dog">'
            );
        }
    })
}