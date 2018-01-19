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

$("#dog-input").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#dog-button-submit").click();
    }
});

$('#dog-button-submit').on('click', function(event) {
    let input = $('#dog-input').val();
    getDog(input);
})

function getDog (data) {
    const url = 'https://dog.ceo/api/breed/' + data + '/images/random';

    $.ajax({
        url: url,
        method: 'GET'
    }).then(function(response){
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