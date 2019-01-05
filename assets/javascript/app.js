let videoGames = ["UNDERTALE", "Earthbound",];
let maxGiphy = 10;
let rangeRating = "PG";

function renderButtons() {
    for(let i = 0; i < videoGames.length; i++) {
		let newButton = $("<button>");
		newButton.addClass("btn");
		newButton.addClass("games-button");
		newButton.text(videoGames[i]);
		$("#button-container").append(newButton);
	}
	$(".games-button").unbind("click");

	$(".games-button").on("click", function(){
		$(".gif-image").unbind("click");
		$("#gamesGiphy-container").empty();
		$("#gamesGiphy-container").removeClass("dotted-border");
		searchGiphy($(this).text());
	});

}

function addButton(games){
	if(videoGames.indexOf(games) === -1) {
		videoGames.push(games);
		$("#button-container").empty();
        renderButtons();
	}
};



function searchGiphy(games){
        const endpoint = 'http://api.giphy.com/v1/gifs/search?';
       const params = 'api_key=KW5PBiAtYYCyAulbsJmXxXPRwmd3rYaG&q=' + games + "&limit="+maxGiphy +"&rating="+rangeRating ;
    
         const url = endpoint + params;
    
         $.ajax(url)
        .then(handleSuccess)
            
     };

     function handleSuccess(data) {
        //Success
            //  data: { data: {}}

        
             const giphys = data.data;
        
            giphys.map(function (element, b, c) {
                const rating = element.rating;
                const stillImage = element.images.original_still.url;
                const playImage = element.images.original.url;
        
                $('#gamesGiphy-container').prepend(`
                <div>
             <p>Title: ${rating}</p>
             <img src= "${stillImage}" data-state="pause" data-still="${stillImage}" data-play="${playImage}" />
                </div>
                `);
            });
        };

        $(document).on('click','img', function(){
            let state = $(this).attr('data-state');
            let still = $(this).attr('data-still');
            let play = $(this).attr('data-play');
            
            if (state === 'pause'){
            $(this).attr('src', play);
            $(this).attr('data-state', 'play')
            }else{
            
            }
            
             console.group();
             console.log('State: ', state);
             console.log('Still: ', still);
            console.log('Play: ', play);
            
            
            });
            

$(document).ready(function(){
	renderButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#video-games").val().trim());
		$("#video-games").val("");
	});
});






