var first=true;

$(document).ready(function(){

  var autoDisplay = function(userName){

    //displayTweets(userName);
    //  setTimeout(autoDisplay, 3000);
    displayTweets(userName);
      setTimeout(function(){
        autoDisplay(userName);
      }, 3000);
  };
 // var user-flag;
  var displayTweets = function(tweetHandle) {
  //first = true;

// Displays all tweets - checks to see if it is a valid username handle
  if(tweetHandle === '') {
    $('.user-twitts-container').hide();
    $('.all-twitts').html('');
    console.log("Display All Tweets");
  /********* Display ALL Tweets *********/

  //<div class = "all-twitts">
    //<div class = "user shawndrost">@shawndrost:</div>
    //<div class = "message">some message</div>
    //<div class = "date"> a few seconds ago</div>
    // </div><hr>
    streams.home.forEach(function(tweet) {
      $('.all-twitts').prepend('<div class="tweet"><div class="user ' +
        tweet.user + '">@' + tweet.user +
        ':</div><div class="message">' + tweet.message +
        '</div><div class="date">' + moment(tweet.created_at).fromNow() +
         "</div></div><hr>");
      });

        //Display tweets by clicking on specific-username
    $('.shawndrost').on('click', function() {
        //displayTweets('shawndrost');
      /* switch to 'specific user-tweets'*/
        autoDisplay('shawndrost');
    });

    $('.sharksforcheap').on('click', function() {
       // displayTweets('sharksforcheap');
        /* switch to 'specific user-tweets'*/
        autoDisplay('sharksforcheap');
    });

    $('.mracus').on('click', function() {
     // displayTweets('mracus');
      /* switch to 'specific user-tweets'*/
      autoDisplay('mracus');
    });

    $('.douglascalhoun').on('click', function() {
      //displayTweets('douglascalhoun');
     // /* switch to 'specific user-tweets'*/
      autoDisplay('douglascalhoun');
    });
    } //end of if

/************ Display specific user tweets  ***********/
  else {

    // if(first){
     $('.all-twitts-container').fadeOut(function() {
          $('.user-twitts-container').fadeIn();
        });
  //   first = false;
 //  }

  $('.user-twitts').html('');

  // Heading for specific user-tweets (ex: @shawndrost:)
  $('.user-twitts-heading').html('');

  $('.user-twitts-heading').append('@' + tweetHandle);

// ALL user tweets - each row
    streams.users[tweetHandle].forEach(function(tweet) {
      $('.user-twitts').prepend('<div class="tweet"><div class="message">' + tweet.message +
        '</div><div class="date">' + moment(tweet.created_at).fromNow() +
        "</div></div><hr>");
    });

  }; //end of else
}

  $('.btn-primary').on('click', function() {
    $('.user-twitts-container').fadeOut(function() {
      $('.all-twitts-container').fadeIn();
      autoDisplay('');
    })
  });

  //At First Display ALL TWEETS on HOME PAGE
  //displayTweets('');
  autoDisplay('');

}); //end of file