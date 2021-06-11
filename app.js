// LETRAS ----------------------------------------------------------------------------------

var ml4 = {};
ml4.opacityIn = [0,1];
ml4.scaleIn = [0.2, 1];
ml4.scaleOut = 3;
ml4.durationIn = 500;
ml4.durationOut = 500;
ml4.delay = 500;

anime.timeline({loop: false})
  .add({
    targets: '.ml4 .letters-1',
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
  }).add({
    targets: '.ml4 .letters-1',
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    easing: "easeInExpo",
    delay: ml4.delay
  }).add({
    targets: '.ml4 .letters-2',
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
  }).add({
    targets: '.ml4 .letters-2',
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    easing: "easeInExpo",
    delay: ml4.delay
  }).add({
    targets: '.ml4 .letters-3',
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
  }).add({
    targets: '.ml4-div',
    opacity: 0,
    duration: ml4.durationOut,
    easing: "easeInExpo",
    delay: ml4.delay
  }).add({
    targets: '.ml4-div',
    scale: 0,
    duration: 700,
    easing: "easeInExpo",
    delay: ml4.delay
  });

// ------------------------------------------------------------------------------

const side_bar = document.querySelector('.side_bar');
const side_bar_list = document.querySelector('.side_bar_list');
const side_bar_pancake = document.querySelector('.social_media-img_pancake');
const side_bar_twitch = document.querySelector('.social_media-img_twitch');
const side_bar_youtube = document.querySelector('.social_media-img_youtube');
const side_bar_twitter = document.querySelector('.social_media-img_twitter');
const side_bar_telegram = document.querySelector('.social_media-img_telegram');


document.querySelector('.toggle').onclick = function(){
  this.classList.toggle('active');
  side_bar.classList.toggle('active');
  side_bar_list.classList.toggle('active');
  side_bar_pancake.classList.toggle('active');
  side_bar_twitch.classList.toggle('active');
  side_bar_youtube.classList.toggle('active');
  side_bar_twitter.classList.toggle('active');
  side_bar_telegram.classList.toggle('active');
}

// ------------------------------------------------------------------------------

function onVisible(element, callback) {
  new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.intersectionRatio > 0) {
        callback(element);
        observer.disconnect();
      }
    });
  }).observe(element);
}

// divider -----------------------------------------------------------------------------
const divider = document.querySelectorAll('.divider');
const about = divider[0];
const media = divider[1];
const roadmap = divider[2];
const tokenomics = divider[3];
const theTeam = divider[4];

onVisible(about, ()=> about.classList.add('about_neon'));
onVisible(media, ()=> media.classList.add('media_neon'));
onVisible(roadmap, ()=> roadmap.classList.add('roadmap_neon'));
onVisible(tokenomics, ()=> tokenomics.classList.add('tokenomics_neon'));
onVisible(theTeam, ()=> theTeam.classList.add('theTeam_neon'));

// s2 -----------------------------------------------------------------------------

const s2_description_text = document.querySelectorAll('.s2-description_text');
const s2_description_text_top = s2_description_text[0];
const s2_description_text_mid = s2_description_text[1];
const s2_img = document.querySelector('.s2-img');

onVisible(s2_description_text_top, ()=> s2_description_text_top.classList.add('appear_left'));
onVisible(s2_description_text_mid, ()=> s2_description_text_mid.classList.add('appear_right'));
onVisible(s2_img, ()=> s2_img.classList.add('appear_left'));

// s6 -----------------------------------------------------------------------------

function videoUrl(embed_video){
  document.getElementById('s6-video_iframe').src = "https:/" + embed_video;
}

// s3 -----------------------------------------------------------------------------

const roadmap_ball_top = document.getElementById('s3-timeline_circle_top');
const roadmap_ball_mid = document.getElementById('s3-timeline_circle_mid');
const s3_timeline_item = document.querySelectorAll('.s3-timeline_item');
const s3_timeline_item_top = s3_timeline_item[0];
const s3_timeline_item_mid = s3_timeline_item[1];
const s3_timeline_item_bot = s3_timeline_item[2];

onVisible(roadmap_ball_top, ()=> roadmap_ball_top.classList.add('fullfill_top'));
onVisible(roadmap_ball_mid, ()=> roadmap_ball_mid.classList.add('fullfill_mid'));
onVisible(s3_timeline_item_top, ()=> s3_timeline_item_top.classList.add('appear_left'));
onVisible(s3_timeline_item_mid, ()=> s3_timeline_item_mid.classList.add('appear_right'));
onVisible(s3_timeline_item_bot, ()=> s3_timeline_item_bot.classList.add('appear_left'));

// letters blinking -----------------------------------------------------------------------------

const letters = document.querySelectorAll('.letter_blink');
const s2_question = letters[0];
const s2_o = letters[1];
const s3_title = letters[2];

onVisible(s2_question, ()=> s2_question.classList.add('s2_question_blinking'));
onVisible(s2_o, ()=> s2_o.classList.add('s2_o_blinking'));

// s5 ------------------------------------------------------------------------------

const s5_item = document.querySelectorAll('.s5-team_item');
const s5_item_1 = s5_item[0];
const s5_item_2 = s5_item[1];
const s5_item_3 = s5_item[2];
const s5_item_4 = s5_item[3];
const s5_item_5 = s5_item[4];

onVisible(s5_item_1, ()=> s5_item_1.classList.add('s5_item_animation_1'));
onVisible(s5_item_2, ()=> s5_item_2.classList.add('s5_item_animation_2'));
onVisible(s5_item_3, ()=> s5_item_3.classList.add('s5_item_animation_3'));
onVisible(s5_item_4, ()=> s5_item_4.classList.add('s5_item_animation_4'));
onVisible(s5_item_5, ()=> s5_item_5.classList.add('s5_item_animation_5'));























/*
TweenMax.defaultEase = Linear.easeOut;

window.mobileAndTabletCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
if(window.mobileAndTabletCheck){
  
}
new fullpage("#fullpage", {
  //options here
  autoScrolling: true,
  navigation: true,
  onLeave: (origin, destination, direction) => {
    const section = destination.item;
    const title = section.querySelector("h1");
    const tl = new TimelineMax({ delay: 0.5 });
    tl.fromTo(title, 0.5, { y: "50", opacity: 0 }, { y: "0", opacity: 1 });
    if (destination.index === 1) {
      const description = document.querySelector(".description");
      tl.fromTo(
          description,
          0.5,
          { opacity: 0, y: "50" },
          { y: "0", opacity: 1 }
        );
    }
  }
});
*/