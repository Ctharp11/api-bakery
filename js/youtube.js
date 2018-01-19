function updateYoutube() {
	iframe_url = iframe_base + iframe_id + iframe_end;
	console.log("new iframe embed: " + iframe_url);
	$("#player").empty();
	$("#player").html(iframe_url);
}

$("#youtube-input").keyup(function(event) {
    if (event.keyCode === 13) {
        console.log('clicking');
        $("#youtube-button-submit").click();
    }
});

$('#youtube-button-submit').on('click', function(event) {
    let input = $('#youtube-input').val();
    runAPI(input);
});

function runAPI(data) {
    console.log(data);

    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
          part: 'snippet, id',
          q: data,
          type: 'video',
          key: 'AIzaSyB5wnSuQXnN14cXNHTCcOp9v85EZ1bCA38'},
          function(data) {
            var nextPageToken = data.nextPageToken;
            var previousPageToken = data.previousPageToken;
            console.log(data);
    
            $.each(data.items, function(i, item) {
              var output = getOutput(item);
    
              //display results
              $("#player").html(output);
    
            });
          }
      ); 

      function getOutput(item) {
        var videoId = item.id.videoId;
        var title = item.snippet.title;
        var description = item.snippet.description;
        var thumb = item.snippet.thumbnails.high.url;
        var channelTitle = item.snippet.channelTitle;
        var videoDate = item.snippet.publishedAt;
        var output = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '?autoplay=1" frameborder="0" allowfullscreen></iframe>'; 
        return output;
      };
    };

