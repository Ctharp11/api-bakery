$('#iframely-button-submit').on('click', function() {
    let input = $('#iframely-input').val();
    iframely(input);
})

function iframely(input) {
    const iframelyKey = "07ee4686e047984c7bb492";
    var apiKey = apiKeys.iframely;
    const URL = "http://iframe.ly/api/iframely?url=" + input + "&api_key=" + iframelyKey;
    console.log(URL);
    $.ajax({
        url: URL,
        method: 'GET'
    }).done(function(response) {
        console.log(response);
        const title = response.meta.title;
        console.log(title);
        const description = response.meta.description;
        const img = response.links.thumbnail[0].href;
        const icon = response.links.icon[0].href;
        const date = response.meta.date;
        const source = response.meta.site
        console.log(img);
        $(".iframely__results--title").html(
            "<img class='iframely__results--image' src='" + img + "' alt='image'>" +
            "<h2 class='iframely__results--main'>" + title + "</h2>" + 
            "<div class='iframely__results--sub'>" + description + "</div>" +
            "<img class='iframely__results--icon' src='" + icon + "' alt='image'>" +
            "<span class='iframely__results--bottom'>" + source + "</span>" +
            "<span class='iframely__results--bottom'>" + date + "</span>" 
        )
    })
}