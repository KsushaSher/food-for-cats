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

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

  const map = new YMap(document.querySelector("#map"), {
    location: { center: [30.319, 59.938931], zoom: 16.3 },
    behaviors: ["drag", "scrollZoom", "pinchZoom", "mouseTilt"],
  });

  map.addChild(new YMapDefaultSchemeLayer());

  const featuresLayer = new YMapDefaultFeaturesLayer();
  map.addChild(featuresLayer);

  const markerContent = document.createElement("div");
  markerContent.classList.add("location__marker");
  markerContent.innerHTML = `<img src="./assets/images/svg/map-pin.svg" alt="marker">`;

  const marker = new YMapMarker(
    {
      coordinates: [30.323037, 59.938631],
      dataSource: featuresLayer,
    },
    markerContent
  );

  map.addChild(marker);
}

initMap();
