$(document).ready(function () {
    // Starting topics for buttons
    var topics = ["Street Fighter", "Tekken", "Bob's Burgers", "Simpsons", "American Dad"];

    // make buttons from the topics list 
    function makeBtns() {
        $("#gif-buttons").empty();

        for (var i = 0; i < topics.length; i++) {
            var $gifBtn = $("<button>");
            $gifBtn.attr("data-name", topics[i]);
            $gifBtn.attr("id", "gif-btn")
            $gifBtn.attr("class", "btn btn-danger m-1 mb-3")
            $gifBtn.text(topics[i]);
            $("#gif-buttons").append($gifBtn);
        }
    }

    // clicking on the search button it adds the new button based on the search term
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var topic = $("#gif-input").val();
        topics.push(topic);
        makeBtns();
    })

    // clicking on a topic button search it and prints 10 gifs to the page
    $(document).on("click", "#gif-btn", function () {
        $("#gif-dump").empty();
        var gifs = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=SU1oi5MYtsBb1mLWiz3WrHaeWwsK7Zf9&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r") {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating)
                        .attr("class", "font-weight-bold font-italic");
                    var gifImage = $("<img>");
                    gifImage
                        .attr("src", results[i].images.fixed_height_still.url)
                        .attr("data-still", results[i].images.fixed_height_still.url)
                        .attr("data-animate", results[i].images.fixed_height.url)
                        .attr("data-state", "still")
                        .attr("class", "gif m-1");
                    gifDiv
                        .append(p)
                        .append(gifImage);
                    $("#gif-dump").prepend(gifDiv);
                }
            }
        })
    })

    // clicking on the gif will start it playing
    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("scr", $(this).attr("data-state", "animate"));
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this.attr("data-state", "still"));
        }
    })

    // makes the buttons on the page load
    makeBtns();
})