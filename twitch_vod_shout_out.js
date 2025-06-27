document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const fontFamily = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--font-family");

  const twitchVodShoutOut = document.getElementById("twitchVodShoutOutId");
  const params = new URLSearchParams(window.location.search);

  const videoId = params.get("videoId");
  if (!videoId || videoId.trim() === "") {
    console.warn("Kein 'videoId'-Parameter in der URL gefunden.");

    const divError = document.createElement("div");
    Object.assign(divError.style, {
      background: "#000000",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "700px",
      height: "200px",
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      justifyItems: "center",
      justifyContent: "center",
      border: "2px solid #000000",
      borderRadius: "5px",
      padding: "5px 5px",
      margin: "10px 10px 10px 10px"
    });
    body.appendChild(divError);

    const pErrorElement = document.createElement("p");
    pErrorElement.innerText =
      "Bitte gib eine Video-ID an!\n\n Beispiel:\n\n?videoId=123456789&time=0h00m00s&autoplay=true&muted=false";
    Object.assign(pErrorElement.style, {
      fontFamily: fontFamily,
      background: "#00000000",
      width: "650px",
      height: "180px",
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      justifyItems: "center",
      justifyContent: "center",
      border: "1px solid #00000000",
      padding: "5px 5px",
      margin: "5px 5px 5px 5px",
      textAlign: "center",
      fontSize: "20px",
      color: "#ffffff",
      textDecorations: "none"
    });
    divError.appendChild(pErrorElement);

    return;
  }

  let autoplay = params.has("autoplay")
    ? params.get("autoplay") === "true"
    : JSON.parse(localStorage.getItem("autoplay") || "false");
  localStorage.setItem("autoplay", autoplay);

  let muted = params.has("muted")
    ? params.get("muted") === "true"
    : JSON.parse(localStorage.getItem("muted") || "true");
  localStorage.setItem("muted", muted);

  let timeParam = params.get("t") || params.get("time") || null;
  const timeRegex = /^(\d+h)?(\d+m)?(\d+s)?$/;
  if (!timeParam || !timeRegex.test(timeParam)) {
    timeParam = "0h0m0s";
  }
  localStorage.setItem("time", timeParam);

  const domain = window.location.hostname;
  const embedParams = new URLSearchParams({
    video: videoId,
    parent: domain,
    time: timeParam,
    autoplay: autoplay.toString(),
    muted: muted.toString()
  });

  twitchVodShoutOut.src = `https://player.twitch.tv/?${embedParams}`;
});
