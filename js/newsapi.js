var newsAPI = apiKeys.newsapi;

var sourceUrl = 'https://newsapi.org/v2/sources?apiKey=' + newsAPI;
$.ajax({
    url: sourceUrl,
    method: 'GET'
}).done(function(response){
    for (var i = 0; i < response.sources.length; i++){
       var id = response.sources[i].id;
       var place = response.sources[i].name;
       $('.select').append('<option value=" '+ id + '" class="option">' + place + '</option>')
    }    

    var e = document.getElementById('select-one'); 
    var f = document.getElementById('select-two');
    $(e).on('change', function(){
        $('#first').empty();
        var checked1 = this.options;
        for (var i = 0; i < checked1.length; i ++){
            if (checked1[i].selected === true) {
                left(checked1[i].value);
            }
        }
    })
    $(f).on('change', function(){
        $('#second').empty();
        var checked2 = this.options;
        for (var i = 0; i < checked2.length; i ++){
            if (checked2[i].selected === true) {
                right(checked2[i].value);
            }
        }
    })
})

function left (leftChecked){
    var noWhiteSpace = leftChecked.replace(/\s/g, '');
    var checkUrl = 'https://newsapi.org/v2/top-headlines?sources=' + noWhiteSpace + '&apiKey=' + newsAPI;
    $.ajax({
        url: checkUrl,
        method: "GET"
    }).done(function(response){
        var articles = response.articles;
        for (var i = 0; i < articles.length; i++) {
            var title = articles[i].title;
            var author = articles[i].author;
            var image = articles[i].urlToImage;
            var description = articles[i].description;;
            var published = articles[i].publishedAt;
            var url = articles[i].url;
         
            $('#first').append(
                "<div class='apinews__first'>" +
                    "<div class='apinews__first--title'>" + title + "</div>" +
                    "<div>" + "<img class='apinews__img-dynamic' src='" + image + "'></div>" +
                    "<div class='apinews__first--description'>" + description + "</div>" +
                    "<div class='apinews__first--author'>" + author + "</div>" +
                    "<div class='apinews__first--published'>" + published + "</div>" +
                    // "<div class='apinews__first--url'>" + url + "</div>" +
                "</div>"
            )
        }
    })
}

function right(rightChecked){
    var noWhiteSpace = rightChecked.replace(/\s/g, '');
    var checkUrl = 'https://newsapi.org/v2/top-headlines?sources=' + noWhiteSpace + '&apiKey=' + newsAPI;
    $.ajax({
        url: checkUrl,
        method: "GET"
    }).done(function(response){
        var articles = response.articles;
        for (var i = 0; i < articles.length; i++) {
            var title = articles[i].title;
            var author = articles[i].author;
            var image = articles[i].urlToImage;
            var description = articles[i].description;;
            var published = articles[i].publishedAt;
            var url = articles[i].url;

            $('#second').append(
                "<div class='apinews__second'>" +
                    "<div class='apinews__second--title'>" + title + "</div>" +
                    "<div>" + "<img class='apinews__img-dynamic' src='" + image + "'></div>"+
                    "<div class='apinews__second--description'>" + description + "</div>"+
                    "<div class='apinews__second--author'>" + author + "</div>" +
                    "<div class='apinews__second--published'>" + published + "</div>"+
                    // "<div class='apinews__second--url'>" + url + "</div>"+
                "</div>"
            )
        }
    })
}



