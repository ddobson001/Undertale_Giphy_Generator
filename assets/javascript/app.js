// // KW5PBiAtYYCyAulbsJmXxXPRwmd3rYaG

// // http://api.giphy.com/v1/gifs/search

let pending = false;
let interests = [];

function searchGiphy(value){
    const endpoint = 'http://api.giphy.com/v1/gifs/search?';
    const params = 'api_key=KW5PBiAtYYCyAulbsJmXxXPRwmd3rYaG&q=' + value;

    const url = endpoint + params;

    $.ajax(url)
        .then(handleSuccess)
        .catch(handleError);
};


// Business Logic
function handleSuccess(data) {
    //Success
    // data: { data: {}}
    pending = false;
    $('.status').html('Successfully completed');

    const giphys = data.data;

    giphys.map(function (element, b, c) {
        const title = element.title;
        const stillImage = element.images.original_still.url;
        const playImage = element.images.original.url

        $('.giphys').prepend(`<img src= "${stillImage}"/>`);
    });
};


// How your buisness operates
function handleError(error) {
    pending = false;
    //Failure Message
    $('.status').html('O snap! Something went wrong!');


};


interests =JSON.parse(localStorage.getItem('interest'));

if (interests.length > 0) {

    let random = Math.floor(Math.random() * interests.length) + 1;
    let value = interests[random];
   
    console.log(random);
    searchGiphy(value);
}



$('button').click(function (event) {
    event.preventDefault();
    const value = $('input[name="search"]').val();
interests.push(value);

if (interests.length <= 5){
localStorage.setItem('interest',JSON.stringify(interests));
};

    pending = true;
    $('.status').html('Loading.....');
    searchGiphy(value);
    $('input[name="search"').val('');
});

























//   // Event listener for our cat-button
//   $("#cat-button").on("click", function() {

//     // Storing our giphy API URL for a random cat image
//     var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=KW5PBiAtYYCyAulbsJmXxXPRwmd3rYaG&tag=undertale";

//     // Perfoming an AJAX GET request to our queryURL
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })

//     // After the data from the AJAX request comes back
//       .then(function(response) {

//       // Saving the image_original_url property
//         var imageUrl = response.data.image_original_url;

//         // Creating and storing an image tag
//         var catImage = $("<img>");

//         // Setting the catImage src attribute to imageUrl
//         catImage.attr("src", imageUrl);
//         catImage.attr("alt", "cat image");

//         // Prepending the catImage to the images div
//         $("#images").prepend(catImage);
//       });
//   });