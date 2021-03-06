$("#iframely-input").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#iframely-button-submit").click();
    }
});

$('#iframely-button-submit').on('click', function() {
    let input = $('#iframely-input').val();
    iframely(input);
})

function iframely(input) {
    var iframelyKey  = apiKeys.iframely;
    const URL = "http://iframe.ly/api/iframely?url=" + input + "&api_key=" + iframelyKey;
    $.ajax({
        url: URL,
        method: 'GET'
    }).done(function(response) {
        const title = response.meta.title;
        const description = response.meta.description;
        const img = response.links.thumbnail[0].href;
        const icon = response.links.icon[0].href;
        const date = response.meta.date;
        const source = response.meta.site
        $(".iframely__results--title").html(
            "<img class='iframely__results--image' src='" + img + "' alt='image'>" +
            "<h2 class='iframely__results--main'>" + title + "</h2>" + 
            "<div class='iframely__results--sub'>" + description + "</div>" +
            "<img class='iframely__results--icon' src='" + icon + "' alt='image'>" +
            "<span class='iframely__results--bottom'>" + source + "</span>" +
            "<span class='iframely__results--bottom'>" + date + "</span>" 
        )
    }).fail(function(errorThrow){
        $(".iframely__results--title").html("<div class='iframely__results--sub'> No results found. Make sure you paste in an http:// url! </div>" + 
        '<img class="happy-accidents" src="img/happy-accidents.png">')
        console.log(errorThrow.responseJSON.error);
    })
}