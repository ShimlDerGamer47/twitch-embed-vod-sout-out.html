document.addEventListener("DOMContentLoaded", function () {
  const twitchVodShoutOut = document.getElementById("twitchVodShoutOutId");
  const params = new URLSearchParams(window.location.search);
  const videoId = params.get("videoId");

  if (!videoId) {
    console.warn("Kein 'videoId' Parameter in der URL gefunden.");
    return;
  }

  let autoplay = localStorage.getItem("autoplay");
  let muted = localStorage.getItem("muted");

  if (params.has("autoplay")) {
    autoplay = params.get("autoplay") === "true";
    localStorage.setItem("autoplay", autoplay);
  } else if (autoplay !== null) {
    autoplay = autoplay === "true";
  } else {
    autoplay = false;
    localStorage.setItem("autoplay", autoplay);
  }

  if (params.has("muted")) {
    muted = params.get("muted") === "true";
    localStorage.setItem("muted", muted);
  } else if (muted !== null) {
    muted = muted === "true";
  } else {
    muted = false;
    localStorage.setItem("muted", muted);
  }

  const domain = window.location.hostname;
  const embedParams = new URLSearchParams({
    video: videoId,
    parent: domain,
    autoplay: autoplay ? "true" : "false",
    muted: muted ? "true" : "false"
  });

  twitchVodShoutOut.src = `https://player.twitch.tv/?${embedParams.toString()}`;
});
