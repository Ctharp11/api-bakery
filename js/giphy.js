var topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

var giphyAPI = "dc6zaTOxFJmzC";

var limit = 10;

function buttons () {
	$(".giphy__button").empty();

	for (var i = 0; i < topics.length; i++) {
		var b = $("<button>"); 
		b.addClass("giphy__buttons");
		b.attr("data-animal", topics[i]);
		b.text(topics[i]);

	$(".giphy__button").append(b);


	}

}


$("#add-animal").on("click", function (){
	event.preventDefault();
	userSearch = $("#animal-input").val().trim();
	topics.push(userSearch);
	$(".giphy__animal-buttons").on();
	buttons();

})

buttons();

$(document).on("click", ".giphy__buttons", function () {

	$("#animals").empty();

	var userSearch = $(this).attr("data-animal");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        userSearch + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	})

	.done(function(response) {



		var results = response.data;

		for (var i = 0; i < results.length; i++) {

			if (results[i].rating !== "r" && results[i].rating !== "pg-13") {


				var p = $('<p class="paragraph">');

				var gifDiv = $('<div class="giphy__div">');


				var image = $('<img class="image" data-animated="" data-still="" data-state="animated">');

				image.attr("src", results[i].images.fixed_height.url);
				image.attr("data-animated", results[i].images.fixed_height.url);
				image.attr("data-still", results[i].images.fixed_height_still.url)
				image.attr("alt", "image");

				gifDiv.append(image);
				gifDiv.append(p);


				$("#animals").append(gifDiv);

			}

		}
	
		$(".image").on("click", function () {
			console.log(response.data);
			var state = $(this).attr("data-state");
			
			if (state === "animated") {
				$(this).attr("src", $(this).attr("data-still"));
				$(this).attr("data-state", "still");
			} else {
				$(this).attr("src", $(this).attr("data-animated"));
				$(this).attr("data-state", "animated");
			} 

		})
	})



});