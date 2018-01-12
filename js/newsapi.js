var newsAPI = apiKeys.newsapi;

// var leftChecked;
// var rightChecked;

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
                // leftChecked = checked1[i].value;
                // console.log(leftChecked);
            }
        }
    })
    $(f).on('change', function(){
        $('#second').empty();
        var checked2 = this.options;
        for (var i = 0; i < checked2.length; i ++){
            if (checked2[i].selected === true) {
                right(checked2[i].value);
                // rightChecked = checked2[i].value;
                // console.log(rightChecked);
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
            console.log(title);
            var author = articles[i].author;
            console.log(author);
            var image = articles[i].urlToImage;
            console.log(image);
            var description = articles[i].description;;
            console.log(description);
            var published = articles[i].publishedAt;
            console.log(published)
            var url = articles[i].url;
            console.log(url);
            $('#first').append(
                "<div class='apinews__first'>" + title + "</div>",
                "<div class='apinews__first'>" + author + "</div>",
                "<div class='apinews__first'>" + "<img  class='apinews__img-dynamic' src='" + image + "'></div>",
                "<div class='apinews__first'>" + description + "</div>",
                "<div class='apinews__first'>" + published + "</div>",
                "<div class='apinews__first'>" + url + "</div>",
            )
        }

    })
}

function right(checked){
    var noWhiteSpace = rightChecked.replace(/\s/g, '');
    var checkUrl = 'https://newsapi.org/v2/top-headlines?sources=' + noWhiteSpace + '&apiKey=' + newsAPI;
    $.ajax({
        url: checkUrl,
        method: "GET"
    }).done(function(response){
        var articles = response.articles;
        for (var i = 0; i < articles.length; i++) {
            // console.log(articles[i]);
            var title = articles[i].title;
            // console.log(title);
            var author = articles[i].author;
            // console.log(author);
            var image = articles[i].urlToImage;
            // console.log(image);
            var description = articles[i].description;;
            // console.log(description);
            var published = articles[i].publishedAt;
            // console.log(published)
            var url = articles[i].url;
            // console.log(url);
            $('#second').append(
                "<div class='apinews__second'>" + title + "</div>",
                "<div class='apinews__second'>" + author + "</div>",
                "<div class='apinews__second'>" + "<img class='apinews__img-dynamic' src='" + image + "'></div>",
                "<div class='apinews__second'>" + description + "</div>",
                "<div class='apinews__second'>" + published + "</div>",
                "<div class='apinews__second'>" + url + "</div>",
            )
        }
    })
}



