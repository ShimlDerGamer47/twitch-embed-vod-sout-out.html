document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const twitchVodShoutOut = document.getElementById("twitchVodShoutOutId");
  const params = new URLSearchParams(window.location.search);
  const videoId = params.get("videoId");

  if (!videoId) {
    console.warn("Kein 'videoId' Parameter in der URL gefunden.");
    body.innerHTML = `<div style="font-family: Arial, Helvetica, sans-serif; background: black; position: absolute; top: 50%; left: 50%; transform: translate(-50%, 50%); display: flex; align-items: center; align-content: center; justify-items: center; justify-content: center; border: 2px solid black; border-radius: 5px; padding: 5px 5px; margin: 10px 10px 10px 10px;">
      <p style="display: flex; align-items: center; align-content: center; justify-items: center; justify-content: center; text-align: center; font-size: 25px; color: white;">
        Bitte gib eine Video-ID an!<br>
        ?videoId=1234&autoplay=true&muted=true
      </p>
    </div>`;
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
    muted = true;
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
