$(document).ready(function(){
  var tweetHandle = '';
  var displayTweets = function(tweetHandle) {
    //Check for New Tweets every 2 seconds
    setTimeout(function(){
      displayTweets(tweetHandle);
    }, 500);

    // Displays all tweets - checks to see if it is a valid username handle
    if(tweetHandle === '') {
      //$('.user-twitts-container').hide();
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
          tweetHandle = 'shawndrost';
         // displayTweets('shawndrost');
      });

      $('.sharksforcheap').on('click', function() {
         tweetHandle = 'sharksforcheap';
        // displayTweets('sharksforcheap');
      });

      $('.mracus').on('click', function() {
        tweetHandle = 'mracus';
       // displayTweets('mracus');
      });

      $('.douglascalhoun').on('click', function() {
        tweetHandle = 'douglascalhoun';
        //displayTweets('douglascalhoun');
      });

    } //end of if

/************ Display specific user tweets  ***********/
    else{
     //**** GO BACK TO HOME PAGE - Upon 'View All' Button-Click ****/
      $('.btn-primary').on('click', function() {

        $('.user-twitts-container').fadeOut(function() {
          $('.user-twitts-container').hide();
        });
        $('.all-twitts-container').fadeIn();
        tweetHandle = '';
      });

      $('.all-twitts-container').fadeOut(function() {
          $('.user-twitts-container').fadeIn();
        });

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

    } //end of else

  }; //end of displayTweets()

  //'Display and Refresh' ALL TWEETS on HOME PAGE
  displayTweets(tweetHandle);

}); //end of file