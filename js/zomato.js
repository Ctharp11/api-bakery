const zomatoKey = apiKeys.zomato;

$("#zomato-input").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#zomato-button-submit").click();
    }
});

$('#zomato-button-submit').on('click', function(event) {
    let input = $('#zomato-input').val();
    getAPI(input);
})

function getAPI(data){
	$.ajax({
		url: 'https://developers.zomato.com/api/v2.1/locations?query=' + data + '&count=1&apikey=' + zomatoKey,
		method: "GET",
		limit: 1,
	}).done(function(response){
        if (response.location_suggestions.length === 0) {
            $("#zomato-results").html("<div class='iframely__results--sub'> No results found. Make sure you type in a correct city! </div>" + 
            '<img class="happy-accidents" src="img/happy-accidents.png">')
        } else {
            $("#zomato-results").empty();
            let latitude = response.location_suggestions[0].latitude;
            let longitude = response.location_suggestions[0].longitude;
            $.ajax({
                url: 'https://developers.zomato.com/api/v2.1/search?lat=' + latitude + '&lon=' + longitude + '&sort=rating&count=10&apikey=' + zomatoKey,
                method: "GET",
            }).done(function(response) {
                let restaurants = response.restaurants;
                for (let i = 0; i < restaurants.length; i++) {
                    let cuisine = restaurants[i].restaurant.cuisines;
                    let name = restaurants[i].restaurant.name;
                    let address = restaurants[i].restaurant.location.address;
                    let rank = restaurants[i].restaurant.user_rating.aggregate_rating;
                    let votes = restaurants[i].restaurant.user_rating.votes;
                    let image = restaurants[i].restaurant.featured_image;

                    $("#zomato-results").append(
                        "<div class='zomato-results--content'>" +
                           "<div class='zomato-results--content-title'>" + name + "</div>" +
                           "<img class='zomato-results--content-img' src='" + image + "'>" +
                           "<div class='zomato-results--content-cuisine'>" + cuisine + "</div>" +
                           "<div class='zomato-results--content-rank'> Rank: " + rank + "&nbsp;  Votes: " + votes + "</div>" +
                           "<div class='zomato-results--content-address'>" + address + "</div>" +
                        "</div>" 
                    )
                }
            })
        }	
	})
}







