function songText(station) {
  return `${station.now_playing.song.title}`;
}

function liveText(station) {
  return `${station.live.streamer_name}`;
}

function updatePage(station) {
  var isOnline = station.is_online;
  var isLive = station.live.is_live;
  var updatedText = "WHEN Radio - Now Playing";

  if (!isOnline) {
    updatedText = "Offline";
  } else if (isLive) {
    updatedText = liveText(station);
  }
  else {
    if (station.now_playing.song.title !== "") {
      updatedText = songText(station);
    }
  }
  $(".now-playing").text(updatedText)
};

function updatePageText () {
  $.ajax({
    type: "GET",
    url: "https://radio.whencollective.org/api/nowplaying/1",
    dataType: "json",
    success: updatePage,
    timeout: 4000
  });
};

updatePageText();
(function poll() {
  setTimeout(function () {
    updatePageText();
    poll();
  }, 5000);
})();

$(document).ready(function () {
  var btn = $(".play-button");
  btn.click(function () {
    btn.toggleClass("paused");
    return false;
  });
});

function playAudio() {
  var audio = document.getElementById("audio-source");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}
