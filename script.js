const track = document.querySelector(".example__scrollbar-track");
const thumb = document.querySelector(".example__scrollbar-thumb");
const beforeCrop = document.querySelector(".example__before-cat-crop");
const afterCrop = document.querySelector(".example__after-cat-crop");
const beforeButton = document.querySelector(".example__before-button");
const afterButton = document.querySelector(".example__after-button");

let isDragging = false;

const calcPosition = (e) => {
  if (!isDragging) return;

  const rect = track.getBoundingClientRect();
  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
  const percent = (x / rect.width) * 100;

  beforeCrop.style.width = percent + "%";
  afterCrop.style.width = `${100 - percent}%`;
  thumb.style.left = `${percent}%`;
};
const resetToBeforeImage = () => {
  beforeCrop.style.width = "100%";
  afterCrop.style.width = "0%";
  thumb.style.left = "0%";
};
const resetToAfterImage = () => {
  beforeCrop.style.width = "0%";
  afterCrop.style.width = "100%";
  thumb.style.left = "100%";
};

track.addEventListener("mousedown", (e) => {
  isDragging = true;
  document.body.style.userSelect = "none";
  calcPosition(e);
});
thumb.addEventListener("mousedown", (e) => {
  isDragging = true;
  document.body.style.userSelect = "none";
  calcPosition(e);
});
beforeButton.addEventListener("click", resetToBeforeImage);
afterButton.addEventListener("click", resetToAfterImage);

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.userSelect = "text";
});

document.addEventListener("mousemove", calcPosition);

//location

async function initMap() {
  await ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3;
  ymaps3.import.registerCdn("https://cdn.jsdelivr.net/npm/{package}", [
    "@yandex/ymaps3-default-ui-theme@0.0.19",
  ]);
  const { YMapDefaultMarker } = await ymaps3.import("@yandex/ymaps3-default-ui-theme");

  const map = new YMap(
    document.querySelector("#map"),
    {
      location: {
        center: [30.321366, 59.938491],
        zoom: 16,
      },
      behaviors: ["drag", "pinchZoom", "mouseTilt"],
    },
    [new YMapDefaultFeaturesLayer({})]
  );

  map.setBehaviors(["drag", "pinchZoom"]);
  map.addChild(new YMapDefaultSchemeLayer());

  const marker = new YMapDefaultMarker({
    coordinates: [30.323037, 59.938631],
    title: "Hello World!",
    subtitle: "kind and bright",
    color: "blue",
  });
  map.addChild(marker);
}

initMap();
