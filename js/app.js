// ! vars //
// * adjust effects
let brightness = document.querySelector("#brightness");
let blur = document.querySelector("#blur");
let grayscale = document.querySelector("#grayscale");
let huerotate = document.querySelector("#huerotate");
let contrast = document.querySelector("#contrast");
let invert = document.querySelector("#invert");
let opacity = document.querySelector("#opacity");
let saturate = document.querySelector("#saturate");
let sepia = document.querySelector("#sepia");
let inputs = Array.from(document.querySelectorAll("input[type=range]"));

// * filters
let epic = document.querySelector(".filters ul .epic");
let afterglow = document.querySelector(".filters ul .afterglow");
let solar = document.querySelector(".filters ul .solar");
let selfie = document.querySelector(".filters ul .selfie");
let retro = document.querySelector(".filters ul .retro");
let dare = document.querySelector(".filters ul .dare");
let drama = document.querySelector(".filters ul .drama");
let street = document.querySelector(".filters ul .street");
let filtersArray = Array.from(document.querySelectorAll(".filters ul img"));
/////
let img = document.querySelector(".img img");
let upload = document.querySelector("#up");
let download = document.querySelector("#download");
let loading = document.querySelector("#loading");
let clearBtn = document.querySelector("#clear");
/////
// ! upload //
upload.addEventListener("change", () => {
  loading.style.display = "block";
  clearBtn.style.display = "block";
  clear();
  let file = new FileReader();
  setTimeout(() => {
    loading.style.display = "none";
  }, 1000);
  file.readAsDataURL(upload.files[0]);
  file.addEventListener("load", () => {
    img.src = file.result;
  });
  // draw the image via canvas
  img.addEventListener("load", (e) => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  });
  download.style.display = "block";
});

// ! effect on img function //
function editImg() {
  ctx.filter = `
  brightness(${brightness.value})
  blur(${blur.value}px)
  contrast(${contrast.value}%)
  grayscale(${grayscale.value}%)
  hue-rotate(${huerotate.value}deg)
  invert(${invert.value}%)
  opacity(${opacity.value}%)
  saturate(${saturate.value})
  sepia(${sepia.value}%)
  `;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

// ! adjust effects //
inputs.map((input) => {
  input.addEventListener("input", (e) => {
    editImg();
    e.target.previousElementSibling.innerHTML = e.target.value;
  });
});

// ! clear function //
function clear() {
  // clear values
  brightness.value = 1;
  brightness.previousElementSibling.innerHTML = brightness.value;
  blur.value = 0;
  blur.previousElementSibling.innerHTML = blur.value;
  contrast.value = 100;
  contrast.previousElementSibling.innerHTML = contrast.value;
  grayscale.value = 0;
  grayscale.previousElementSibling.innerHTML = grayscale.value;
  huerotate.value = 0;
  huerotate.previousElementSibling.innerHTML = huerotate.value;
  invert.value = 0;
  invert.previousElementSibling.innerHTML = invert.value;
  opacity.value = 100;
  opacity.previousElementSibling.innerHTML = opacity.value;
  saturate.value = 1;
  saturate.previousElementSibling.innerHTML = saturate.value;
  sepia.value = 0;
  sepia.previousElementSibling.innerHTML = sepia.value;
  editImg();
}

clearBtn.addEventListener("click", clear);

// ! filters //
let filters = [
  { name: "epic", adjust: { brightness: 1.6, contrast: 80, saturate: 0.6 } },
  {
    name: "afterglow",
    adjust: { brightness: 1.5, contrast: 119, saturate: 0.8 },
  },
  { name: "solar", adjust: { brightness: 1.8, contrast: 115, saturate: 1.42 } },
  { name: "selfie", adjust: { brightness: 1.3, contrast: 100, saturate: 1 } },
  { name: "retro", adjust: { brightness: 1.1, contrast: 85, saturate: 0.8 } },
  { name: "dare", adjust: { brightness: 1, contrast: 84, saturate: 1.4 } },
  { name: "drama", adjust: { brightness: 0.9, contrast: 112, saturate: 0.7 } },
];

filtersArray.map((filter) => {
  filter.addEventListener("click", (e) => {
    filters.map((f) => {
      if (f.name == e.target.dataset.filter) {
        clear();
        brightness.value = f.adjust.brightness;
        contrast.value = f.adjust.contrast;
        saturate.value = f.adjust.saturate;
        editImg();
      }
    });
  });
});

// ! setting box for media query //
let openCloseBtn = document.getElementById("openclose");
openCloseBtn.addEventListener("click", (e) => {
  document.querySelector(".hero .edit").classList.toggle("active");
  if (openCloseBtn.classList.contains("fa-bars")) {
    openCloseBtn.classList.replace("fa-bars", "fa-xmark");
    openCloseBtn.style.left = "220px";
  } else {
    openCloseBtn.classList.replace("fa-xmark", "fa-bars");
    openCloseBtn.style.left = "0px";
  }
});

// ! download //
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
download.addEventListener("click", (e) => {
  download.href = canvas.toDataURL();
});
