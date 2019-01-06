let videoGames = ["UNDERTALE", "Earthbound","World of Warcraft", "Pokemon Gameboy",];
let maxGiphy = 50;
let rangeRating = "PG";

function renderButtons() {
    for (let i = 0; i < videoGames.length; i++) {
        let newButton = $("<button>");
        newButton.addClass("btn-info");
        newButton.addClass("btn-small");
        newButton.addClass("games-button");
        newButton.text(videoGames[i]);
        $("#button-container").append(newButton);
    }
    $(".games-button").unbind("click");

    $(".games-button").on("click", function () {
        $(".gif-image").unbind("click");
        $("#gamesGiphy-container").empty();
        searchGiphy($(this).text());
    });

}

function addButton(games) {
    if (videoGames.indexOf(games) === -1) {
        videoGames.push(games);
        $("#button-container").empty();
        renderButtons();
    }
};



function searchGiphy(games) {
    const endpoint = 'http://api.giphy.com/v1/gifs/search?';
    const params = 'api_key=KW5PBiAtYYCyAulbsJmXxXPRwmd3rYaG&q=' + games + "&limit=" + maxGiphy + "&rating=" + rangeRating;

    const url = endpoint + params;

    $.ajax(url)
        .then(handleSuccess)

};

function handleSuccess(data) {
    //Success
    //  data: { data: {}}


    let allGiphys = data.data;
    let randomNum = Math.floor(Math.random() * 50) + 1;
    let giphys = [];

    for (let i=0; i <= 10; i++) {
        giphys.push(allGiphys[randomNum]);
        randomNum = Math.floor(Math.random() * 50) + 1;
    }

    giphys.map(function (element, b, c) {
        const rating = element.rating;
        const stillImage = element.images.original_still.url;
        const playImage = element.images.original.url;

        $('#gamesGiphy-container').prepend(`
                <div>
             <p>Rating: ${rating}</p>
             <img src= "${stillImage}" data-state="pause" data-still="${stillImage}" data-play="${playImage}" />
                </div>
                `);
    });
};

$(document).on('click', 'img', function () {
    let state = $(this).attr('data-state');
    let still = $(this).attr('data-still');
    let play = $(this).attr('data-play');

    if (state === 'pause') {
        $(this).attr('src', play);
        $(this).attr('data-state', 'play')
    } else {
        $(this).attr('src', still);
        $(this).attr('data-state', 'pause')
    }


});


$(document).ready(function () {
    renderButtons();
    $("#submit").on("click", function () {
        event.preventDefault();
        addButton($("#video-games").val().trim());
        $("#video-games").val("");
    });
});






