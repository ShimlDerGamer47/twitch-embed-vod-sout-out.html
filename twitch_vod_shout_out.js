document.addEventListener(
  "DOMContentLoaded",
  function htmlDOMContentLoadedToken() {
    const body = document.body;
    const twitchVodShoutOut = document.getElementById("twitchVodShoutOutId");

    const params = new URLSearchParams(window.location.search);
    const videoId = params.get("videoId");
    const autoplay = params.get("autoplay") === "true";
    const muted = params.get("muted") === "true";

    if (!videoId) {
      console.warn("Kein 'videoId' Parameter in der URL gefunden.");
      return;
    }

    const domain = window.location.hostname;

    const embedParams = new URLSearchParams({
      video: videoId,
      parent: domain
    });

    if (autoplay) embedParams.set("autoplay", "true");
    if (muted) embedParams.set("muted", "true");

    const fullURL = `https://player.twitch.tv/?${embedParams.toString()}`;

    twitchVodShoutOut.src = fullURL;

    const scriptElement = document.createElement("script");
    scriptElement.src = "https://player.twitch.tv/js/embed/v1.js";
    body.appendChild(scriptElement);
  }
);
