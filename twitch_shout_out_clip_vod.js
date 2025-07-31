document.addEventListener(
  "DOMContentLoaded",
  function htmlDomContentLoadedToken() {
    const html = document.documentElement;
    const fontFamily = "--font-family";
    const robotoBold = getComputedStyle(html)
      .getPropertyValue(fontFamily)
      .trim();
    const body = document.body;

    body.style.fontFamily = robotoBold;
    body.style.userSelect = "none";

    const params = new URLSearchParams(window.location.search);
    const clipId = params.get("clipId");
    const vodId = params.get("vodId");
    const width = params.get("width") || 1920;
    const height = params.get("height") || 1080;
    const theme = params.get("theme") || "dark";
    const time = params.get("time") || "00h00m00s";
    const volume = params.get("volume") || 1;
    const autoplay = params.get("autoplay");
    const muted = params.get("muted");

    const info = params.get("info");

    const currentDomain = window.location.hostname;

    function clipEmbedToken() {
      const divClipEmbedEl = document.createElement("div");
      divClipEmbedEl.classList.add("clip-embed-container");
      body.appendChild(divClipEmbedEl);

      const clipIframe = document.createElement("iframe");
      clipIframe.width = width;
      clipIframe.height = height;
      clipIframe.src = `https://clips.twitch.tv/embed?clip=${clipId}&autoplay=${autoplay}&muted=${muted}&volume=${volume}&parent=${currentDomain}`;
      clipIframe.allowFullscreen = true;
      clipIframe.allow = "autoplay; fullscreen";
      clipIframe.frameBorder = 0;
      clipIframe.scrolling = "no";
      clipIframe.classList.add("clip-embed");
      clipIframe.style.fontFamily = robotoBold;
      clipIframe.style.userSelect = "none";
      divClipEmbedEl.appendChild(clipIframe);
    }

    function vodEmbedToken() {
      const divVodEmbedEl = document.createElement("div");
      divVodEmbedEl.id = "vodEmbedContainerId";
      divVodEmbedEl.classList.add("vod-embed-container");
      document.body.appendChild(divVodEmbedEl);

      const script = document.createElement("script");
      script.src = "https://embed.twitch.tv/embed/v1.js";
      script.addEventListener("load", () => {
        //script.onload = () => {
        const embed = new Twitch.Player("vodEmbedContainerId", {
          layout: "video",
          video: vodId,
          width: width,
          height: height,
          autoplay: autoplay,
          time: time,
          theme: theme,
          parent: [currentDomain]
        });

        embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
          const player = embed.getPlayer();
          player.setVolume(volume);
          player.setMuted(muted);
          player.setQuality("chunked");
        });

        const iframe = divVodEmbedEl.querySelector("iframe");
        iframe.style.fontFamily = robotoBold;
        iframe.style.userSelect = "none";
        iframe.classList.add("vod-embed");
        iframe.loading = "eager";
        //};
      });
      divVodEmbedEl.appendChild(script);
    }

    function infoToken() {
      const divInfoEl = document.createElement("div");
      Object.assign(divInfoEl.style, {
        background: "rgb(0, 0, 0)",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "1280px",
        height: "720px",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        border: "2px solid rgb(0, 0, 0)",
        borderRadius: "5px",
        padding: "5px 5px",
        margin: "10px 10px 10px 10px"
      });
      body.appendChild(divInfoEl);

      const infoTextClip =
        "?clipId=<-- clipId hier einfügen! -->" +
        "\n\n" +
        "&width=1920" +
        "\n\n" +
        "&height=1080" +
        "\n\n" +
        "&autoplay=true" +
        "\n\n" +
        "&muted=false" +
        "\n\n" +
        "&volume=1";

      const spanInfoClipEl = document.createElement("span");
      spanInfoClipEl.innerText = infoTextClip;
      Object.assign(spanInfoClipEl.style, {
        background: "rgba(0, 0, 0, 0)",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyItems: "center",
        justifyContent: "center",
        flexDecoration: "column",
        border: "2px solid rgba(255, 255, 255, 0)",
        padding: "5px 5px",
        margin: "5px 5px 5px 5px",
        textAlign: "center",
        fontSize: "1.125rem",
        color: "rgb(255, 255, 255)",
        textDecoration: "none"
      });
      divInfoEl.appendChild(spanInfoClipEl);

      const infoTextVod =
        "?vodId=<-- vodId hier einfügen! -->" +
        "\n\n" +
        "&width=1920" +
        "\n\n" +
        "&height=1080" +
        "\n\n" +
        "&time=00h00m00s" +
        "\n\n&theme=dark" +
        "\n\n" +
        "&autoplay=true" +
        "\n\n" +
        "&muted=false" +
        "\n\n" +
        "&volume=1";

      const spanInfoVodEl = document.createElement("span");
      spanInfoVodEl.innerText = infoTextVod;
      Object.assign(spanInfoVodEl.style, {
        background: "rgba(0, 0, 0, 0)",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyItems: "center",
        justifyContent: "center",
        flexDecoration: "column",
        border: "2px solid rgba(255, 255, 255, 0)",
        padding: "5px 5px",
        margin: "5px 5px 5px 5px",
        textAlign: "center",
        fontSize: "1.125rem",
        color: "rgb(255, 255, 255)",
        textDecoration: "none"
      });
      divInfoEl.appendChild(spanInfoVodEl);
    }

    if (clipId) {
      clipEmbedToken();
    } else if (vodId) {
      vodEmbedToken();
    } else {
      if (info === "info" || info === "infos") {
        infoToken();
      }
    }
  }
);
