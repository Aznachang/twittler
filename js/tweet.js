//As per data_generator notes(75) - set a global variable to submit own twitts!
var visitor = 'Aznachang';

$(document).ready(function(){
  //initially there is no specific Twittler Handle passed
  var tweetHandle = '';
  var users = Object.keys(streams.users);

  var displayTweets = function(tweetHandle) {
    /**** Check For New Tweets Every 0.5 secs ****/
    setTimeout(function(){
      displayTweets(tweetHandle);
    }, 500);

    // Displays all tweets - checks to see if it is a valid username handle
    if(tweetHandle === '') {
      $('.user-twitts-container').hide();
      $('.all-twitts').html('');
      //console.log("Parsing for NEW ALL Tweets");

    /********* Display ALL Tweets *********/

    //<div class = "all-twitts">
      //<div class = "user shawndrost">@shawndrost:</div>
      //<div class = "message">some message</div>
      //<div class = "date"> a few seconds ago</div>
      // </div><hr>

      streams.home.forEach(function(tweet) {

        $('.all-twitts').prepend('<div class="tweet"><div class="user ' +
          tweet.user + '">@' + tweet.user +':</div>' +
          '<div class="message">' + tweet.message +
          '</div><div class="date">' + moment(tweet.created_at).fromNow() +
           "</div></div><hr>");
      });

      var visitorClass = '.'+ visitor;
      $(visitorClass).on('click', function(){
        $('.send-own-container').hide();
        tweetHandle = visitor;
      });

      //Display tweets by clicking on Specific-UserName
      users.forEach(function(user){
        var userClass = '.' + user;

        $(userClass).on('click', function() {
          $('.send-own-container').hide();
          tweetHandle = user;
        });
      });
    } //end of if

/************ Display specific user tweets  ***********/
    else{
      console.log("Parsing for SPECIFIC-USER Tweets");
      $('.all-twitts-container').fadeOut(function() {
        $('.user-twitts-container').fadeIn();
      });

     //**** GO BACK TO HOME PAGE - Upon 'View All' Button-Click ****/
      $('.btn-primary').on('click', function() {

        $('.user-twitts-container').fadeOut(function() {
          $('.user-twitts-container').hide();
        });
        $('.send-own-container').fadeIn();
        $('.all-twitts-container').fadeIn();
        tweetHandle = '';
      });

      $('.user-twitts').html('');

      // Heading for specific user-tweets (ex: @shawndrost:)
      $('.user-twitts-heading').html('');
      $('.user-twitts-heading').append('@' + tweetHandle);

  // ALL user tweets - each row
      if(tweetHandle !== visitor){
        streams.users[tweetHandle].forEach(function(tweet) {
            $('.user-twitts').prepend('<div class="tweet"><div class="message">' + tweet.message +
              '</div><div class="date">' + moment(tweet.created_at).fromNow() +
              "</div></div><hr>");
        });
      }else{
        streams.visitors[tweetHandle].forEach(function(tweet) {
          $('.user-twitts').prepend('<div class="tweet"><div class="message">' + tweet.message +
            '</div><div class="date">' + moment(tweet.created_at).fromNow() +
            "</div></div><hr>");
          });
      }
    } //end of else

  }; //end of displayTweets()

  //'Display and Refresh' ALL TWEETS on HOME PAGE
  displayTweets(tweetHandle);

  /********** Send Your Own Twitts *********/
  var submitOwnTwitt = function(){
    //use the 'writeTweet' function in data_generator
    var ownMessage =  $('.own-message').val();
    writeTweet(ownMessage);
    $('.own-message').val();
    tweetHandle = visitor;
  };

  $('.submit-own').on('click', function(ev){
    ev.preventDefault();
    submitOwnTwitt();
  });

}); //end of file