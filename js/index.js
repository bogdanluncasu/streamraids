var ethUtil = require('ethereumjs-util')
var sigUtil = require('eth-sig-util')

$(document).ready ( function () {
  var is_metamask_installed = false;
  // var backend_url = "https://streamraidsbackend.azurewebsites.net/"
  var backend_url = "http://localhost:80/"

  var globalData = undefined;

  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    is_metamask_installed = true;
  } else {
    $("#enableMetamask").html("<p>Metamask is not installed</p>");
    console.log('Metamask is not installed');
  }

  var accounts = undefined;
  var connected = false;
  var submission_enabled = false;
  var vote_enabled = false;

  enable_submissions = function(){
    $("#auth_section").hide();
    $("#vote_section").hide();
    $("#submit_section").show();

    submission_enabled = true;
  };

  enable_voting = function(){
    $("#auth_section").hide();
    $("#vote_section").show();
    $("#submit_section").hide();

    vote_enabled = true;

    get_available_votes();
    get_list_of_streamers();
  };

  compare_streamers = function( a, b ) {
    if ( a.votes > b.votes ){
      return -1;
    }
    if ( a.votes < b.votes ){
      return 1;
    }
    return 0;
  }

  populate_leaderboard = function(data){
    //cleanup

    $("#leaderboard_div").html("");
    $("#voting_over_5").html("");
    // sort

    sorted_data = data.sort(compare_streamers);

    // get top 5
    rank = 0
    for(const streamer of sorted_data){
      rank += 1;
      if(streamer.imageUrl === null){
        streamer.imageUrl = "https://www.streamraids.net/media/logo-srt.png";
      }

      twitch_image = "./media/twitch_white.png";
      youtube_image = "./media/youtube_white.png";
      twitter_image = "./media/twitter_white.png";
      if(rank<=5){
        twitch_image = "./media/twitch.svg";
        youtube_image = "./media/youtube.svg";
        twitter_image = "./media/twitter.svg";
      }

      media = `<a href="${streamer.twitchUrl}" target="_blank"><img class="vote_section-leaderboard_tag_streamer_socials" src="${twitch_image}" alt="twitch"></a>`
      if(streamer.youtubeUrl!==null){
        media+=`<a href="${streamer.youtubeUrl}" target="_blank"><img class="vote_section-leaderboard_tag_streamer_socials" src="${youtube_image}" alt="youtube"></a>`
      }

      if(streamer.twitterUrl!==null){
        media+=`<a href="${streamer.twitterUrl}" target="_blank"><img class="vote_section-leaderboard_tag_streamer_socials" src="${twitter_image}" alt="twitter"></a>`
      }

      if(rank<=5){
        div = `<div class="vote_section-leaderboard_tag" >
              <h1 class="vote_section-leaderboard_tag_number">#${rank}</h1>
              <div class="vote_section-leaderboard_tag_streamer" >
                <div class="vote_section-leaderboard_tag_streamer_img" id="${streamer.id}_img">
                  <img src="${streamer.imageUrl}" alt="">
                </div>
                <div class="vote_section-leaderboard_tag_streamer_name" id="${streamer.id}_name"><p>${streamer.name}</p></div>
                <div class="vote_section-leaderboard_tag_streamer_plus">
                  ${media}
                  <button><i class="fas fa-plus">${streamer.votes}</i></button>
                </div>
              </div>

            </div>`;
          $("#leaderboard_div").append(div);
        } else {
          div = `<div class="vote_section-list_tag_streamer">
            <div class="vote_section-list_tag_streamer_img" id="${streamer.id}_img">
              <img src="${streamer.imageUrl}" alt="">
            </div>
            <div class="vote_section-list_tag_streamer_name" id="${streamer.id}_name"><p>${streamer.name}</p></div>
            <div class="vote_section-list_tag_streamer_plus">
              ${media}
              <button><i class="fas fa-plus invert">${streamer.votes}</i></button>
            </div>
          </div>`

          $("#voting_over_5").append(div);
        }

        $(`#${streamer.id}_img`).on("click", vote(streamer.id));
        $(`#${streamer.id}_name`).on("click", vote(streamer.id));
    }
  }

  get_list_of_streamers = function(){
    $.ajax({
        type: "GET",
        url: backend_url+"streamer",
        async: true,
        contentType: 'application/json'
    }).done(function(data){
      globalData = data;
      populate_leaderboard(data);
    }).fail(function()  {
      console.log("error occured when fetching streamers");
    });
  }

  submit_streamer = function(){
    if(!$("#submit_streamer_form")[0].checkValidity()) return;

    streamer_name = $("#streamer_name").val()
    twitch_url = $("#twitch_url").val()
    youtube_url = $("#youtube_url").val()
    twitter_url = $("#twitter_url").val()

    request_body = {
      "name": streamer_name==="" ? null : streamer_name,
      "twitchUrl": twitch_url==="" ? null : twitch_url,
      "youtubeUrl": youtube_url==="" ? null : youtube_url,
      "twitterUrl": twitter_url==="" ? null : twitter_url
    }

    $("#wait_loader").show();
    $("#submit_vote_button").attr("disabled", true);
    console.log(request_body)
    $.ajax({
        type: "POST",
        url: backend_url+"streamer",
        async: true,
        data: JSON.stringify(request_body),
        contentType: 'application/json'
    }).done(function() {
      console.log("successfully submitted");
      $("#snackbar").text("Application successfully submitted.")
      $("#snackbar").addClass("show");
      setTimeout(function(){ $("#snackbar").removeClass("show"); }, 3000);
      $("#wait_loader").hide();
      $("#submit_vote_button").attr("disabled", false);
    }).fail(function()  {
      console.log("error occured");
      $("#snackbar").text("Application could have not been submitted. There may be already an application for this user.")
      $("#snackbar").addClass("show");
      setTimeout(function(){ $("#snackbar").removeClass("show"); }, 3000);
      $("#wait_loader").hide();
      $("#submit_vote_button").attr("disabled", false);
    });

  }

  set_wallet_details = function(account){
    account_text = account.substring(0,5)+"..."+account.substring(account.length-5,account.length);
    $("#wallet_address").text(account_text);
    $("#connect_label").text("CONNECTED");
    $.ajax({
        type: "GET",
        url: backend_url+"wallet/balance/"+account,
        async: true,
        contentType: 'application/json'
    }).done(function(data) {
      srt_amount = Number(data);
      srt_amount /= Number(1000000000000000000000);
      $("#srt_amount").text(srt_amount.toPrecision(3)+"T");
    }).fail(function()  {
      console.log("error occured when fetching amount");
    });
  }

  connect = function() {
    if(!is_metamask_installed) return;
    if(connected) return;
    console.log("Connect");
    if(ethereum!==undefined){
      ethereum.request({ method: 'eth_requestAccounts' }).then((result) => {
        accounts = result;
        set_wallet_details(accounts[0]);
        connected=true;
        $("#wallet_div_amount").show();
        if(vote_enabled){
          get_available_votes();
        }
      });
    }
  }

  $("#enableMetamask").on("click", connect);
  $("#wallet_address").on("click", connect);
  $("#wallet_div_amount").hide();

  if(ethereum!==undefined){
    async function getAccount() {
      accounts = await ethereum.enable();
      set_wallet_details(accounts[0]);

      if(vote_enabled){
        get_available_votes();
      }
    }

    ethereum.on('accountsChanged', function (accounts) {
      getAccount();
    })
  //
  //   getAccount();
  }

  vote = function(id) {
    return function(){
      console.log("signTransaction");

      if(accounts !== undefined){
        var method = 'personal_sign';
        var message = "Signing "+id;
        var account = accounts[0];

        ethereum.request({
          method: method,
          params: [message, account],
          from: account
        }).then((res)=>{
          vote_request(id, account, res);
        }).catch((err) => {
          console.log(err);
        });
      }
    }

  };

  vote_request = function(id, addr, sig){
        request_body = {
          "signature": sig,
          "address": addr
        }

        $.ajax({
            type: "POST",
            url: backend_url+"vote/"+id,
            async: true,
            data: JSON.stringify(request_body),
            contentType: 'application/json'
        }).done(function() {
          $("#snackbar").text("Successfully voted.")
          $("#snackbar").addClass("show");
          setTimeout(function(){ $("#snackbar").removeClass("show"); }, 3000);
          $("#submit_vote_button").attr("disabled", false);
          get_available_votes();
          get_list_of_streamers();
        }).fail(function(xhr, status, error)  {
          console.log("error occured");
          error_message = xhr.responseJSON;

          display_message = "Vote could not have been processed."
          console.log(xhr);

          if(error_message==="INVALID_STREAM_ID"){
            display_message = "The streamer does not exist on our platform.";
          } else if(error_message==="INVALID_CONSTRAINT"){
            display_message = "Voting is not open yet.";
          } else if(error_message==="INVALID_NO_VOTES_AVAILABLE"){
            display_message = "You have no available votes.";
          } else if(error_message==="INVALID_SRT_AMOUNT_AVAILABLE"){
            display_message = "You need to have SRT in your wallet in order to vote."
          }

          $("#snackbar").text(display_message)
          $("#snackbar").addClass("show");
          setTimeout(function(){ $("#snackbar").removeClass("show"); }, 3000);
          $("#submit_vote_button").attr("disabled", false);
        });

  }

  get_available_votes = function(){
    if(accounts===undefined){
      return;
    }

    $.ajax({
        type: "GET",
        url: backend_url+"wallet/"+accounts[0],
        async: true
    }).done(function(data) {
      $("#number_of_votes_available").text("Number of votes available: "+data.remainingVotes);
    }).fail(function(xhr, status, error)  {});
  }

  $("#search_streamer").on("input", function(){
    if(globalData!==undefined){
      searchValue = $("#search_streamer").val();
      const result = globalData.filter(data => data.name.toLowerCase().includes(searchValue.toLowerCase()));
      populate_leaderboard(result);
    }
  })


  if(location.search!==""){
    location_tokens = location.search.split("=");

    if(location_tokens.length===2 && location_tokens[0]==="?view"){
      view = location_tokens[1];
      if(view==="vote"){
        enable_voting();
      } else if (view === "submit"){
        enable_submissions();
      }
    }
  }
});
