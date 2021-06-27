var ethUtil = require('ethereumjs-util')
var sigUtil = require('eth-sig-util')


$(document).ready ( function () {
  var is_metamask_installed = false;
  var backend_url = "https://streamraidsbackend.azurewebsites.net/"

  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    is_metamask_installed = true;
  } else {
    $("#enableMetamask").html("<p>Metamask is not installed</p>");
    console.log('Metamask is not installed');
  }

  var accounts = undefined;
  var connected = false;

  enable_submissions = function(){
    $("#auth_section").hide();
    $("#submit_section").show();
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
    }).fail(function()  {
      console.log("error occured");
      $("#snackbar").text("Application could have not been submitted. There may be already an application for this user.")
      $("#snackbar").addClass("show");
      setTimeout(function(){ $("#snackbar").removeClass("show"); }, 3000);
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

  $("#enableMetamask").on("click", function() {
    if(!is_metamask_installed) return;
    if(connected) return;
    console.log("Connect");
    if(ethereum!==undefined){
      ethereum.request({ method: 'eth_requestAccounts' }).then((result) => {
        accounts = result;
        set_wallet_details(accounts[0]);
        connected=true;
      });
    }
  });

  if(ethereum!==undefined){
    async function getAccount() {
      accounts = await ethereum.enable();
      set_wallet_details(accounts[0]);
    }

    ethereum.on('accountsChanged', function (accounts) {
      getAccount();
    })

    getAccount();
  }

  $("#signTransaction").on("click", function() {
    console.log("signTransaction");

    if(accounts !== undefined){
      var method = 'personal_sign';
      var message = "message2besigned";
      var account = accounts[0];
      console.log(account);
      msg = ethUtil.bufferToHex(new Buffer(message));

      ethereum.request({
        method: method,
        params: [msg, account],
        from: account
      }).then((res)=>{
        nonce = "\x19Ethereum Signed Message:\n" + message.length + message
        nonce = ethUtil.keccak(Buffer.from(nonce, "utf-8"))
        const { v, r, s } = ethUtil.fromRpcSig(res)
        const pubKey = ethUtil.ecrecover(ethUtil.toBuffer(nonce), v, r, s)
        const addrBuf = ethUtil.pubToAddress(pubKey)
        const addr = ethUtil.bufferToHex(addrBuf)
        console.log(res);
        console.log(pubKey);
        console.log(addr);

      }).catch((err) => {
        console.log(err);
      });
    }

  });
});
