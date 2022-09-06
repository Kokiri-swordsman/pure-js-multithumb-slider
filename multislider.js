const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

var thumbHeld = null;

const multiSliderValueChanged = new CustomEvent("valuechanged", {
  detail: {},
  bubbles: true,
  cancelable: true,
  composed: false,
});


function initMultiSliderHorizontal(selector) {
  let slider = document.querySelector(selector);

  let thumbs = [document.createElement("div"), document.createElement("div")];
  let range = document.createElement("div");
  let track = document.createElement("div");

  thumbs[0].setAttribute("class", "sliderHorizontalThumb");
  thumbs[1].setAttribute("class", "sliderHorizontalThumb");
  range.setAttribute("class", "sliderHorizontalRange");
  track.setAttribute("class", "sliderHorizontalTrack");

  slider.appendChild(track);
  track.appendChild(range);
  track.appendChild(thumbs[0]);
  track.appendChild(thumbs[1]);

  thumbs[0].onmousedown = function(e) {
    thumbHeld = this;
    let thumbs = thumbHeld.parentElement.children;
    let trackRect = thumbHeld.parentElement.getBoundingClientRect();
    let thumbsPosition = [parseInt(thumbs[1].style.left.slice(0,-2)), parseInt(thumbs[2].style.left.slice(0,-2))];
    let thumbRects = [thumbs[1].getBoundingClientRect(), thumbs[2].getBoundingClientRect()];
    if (thumbsPosition[1]-thumbsPosition[0] < thumbRects[0].width-1) {
      let midp = ((thumbsPosition[0]+thumbsPosition[1])/2)+thumbRects[0].width/2;
      let mousep = e.pageX-window.scrollX-trackRect.left;
      if (mousep < midp) {
        thumbHeld = thumbs[1];
      } else {
        thumbHeld = thumbs[2];
      }
    }

    e.preventDefault();
  }
  thumbs[1].onmousedown = function(e) {
    thumbHeld = this;
    let thumbs = thumbHeld.parentElement.children;
    let trackRect = thumbHeld.parentElement.getBoundingClientRect();
    let thumbsPosition = [parseInt(thumbs[1].style.left.slice(0,-2)), parseInt(thumbs[2].style.left.slice(0,-2))];
    let thumbRects = [thumbs[1].getBoundingClientRect(), thumbs[2].getBoundingClientRect()];
    if (thumbsPosition[1]-thumbsPosition[0] < thumbRects[0].width-1) {
      let midp = ((thumbsPosition[0]+thumbsPosition[1])/2)+thumbRects[0].width/2;
      let mousep = e.pageX-window.scrollX-trackRect.left;
      if (mousep < midp) {
        thumbHeld = thumbs[1];
      } else {
        thumbHeld = thumbs[2];
      }
    }

    e.preventDefault();
  }
  range.onmousedown = function(e) {
    e.preventDefault();
  }
  slider.onmouseup = function(e) {
    thumbHeld = null;
  }
  document.addEventListener("mouseup", function(e) {
    thumbHeld = null;
  });


  document.addEventListener("mousemove", function(e) {
    if (thumbHeld != null && thumbHeld.parentElement.className == "sliderHorizontalTrack") {
      let thumbs = thumbHeld.parentElement.children;
      let thumbRects = [thumbs[1].getBoundingClientRect(), thumbs[2].getBoundingClientRect()];
      let thumbsPosition = [parseInt(thumbs[1].style.left.slice(0,-2)), parseInt(thumbs[2].style.left.slice(0,-2))];
      let trackRect = thumbHeld.parentElement.getBoundingClientRect();

      if (thumbHeld === thumbs[1]) {
        thumbsPosition[0] = e.pageX-window.scrollX-trackRect.left-(thumbRects[0].width/2);
        thumbsPosition[0] = clamp(thumbsPosition[0], -thumbRects[0].width/2, thumbsPosition[1]);
        thumbs[1].style.setProperty("left", (thumbsPosition[0])+"px");
      }
      if (thumbHeld === thumbs[2]) {
        thumbsPosition[1] = e.pageX-window.scrollX-trackRect.left-(thumbRects[1].width/2)+1;
        thumbsPosition[1] = clamp(thumbsPosition[1], thumbsPosition[0], trackRect.width-thumbRects[1].width/2);
        thumbs[2].style.setProperty("left", thumbsPosition[1]+"px");
      }

      thumbs[0].style.setProperty("left", (thumbsPosition[0]+thumbRects[0].width/2)+"px");
      thumbs[0].style.setProperty("width", (thumbsPosition[1]-thumbsPosition[0])+"px");

      multiSliderValueChanged.values = thumbsPosition;
      thumbHeld.parentElement.dispatchEvent(multiSliderValueChanged);

      if (thumbsPosition[1]-thumbsPosition[0] < thumbRects[0].width-1) {
        thumbs[1].classList.add("sliderHorizontalThumbL");
        thumbs[2].classList.add("sliderHorizontalThumbR");
      } else {
        thumbs[1].classList.remove("sliderHorizontalThumbL");
        thumbs[2].classList.remove("sliderHorizontalThumbR");
      }
    }
  });

  setMultiSliderHValues(selector, 0, 1);
}


function initMultiSliderVertical(selector) {
  let slider = document.querySelector(selector);

  let thumbs = [document.createElement("div"), document.createElement("div")];
  let range = document.createElement("div");
  let track = document.createElement("div");

  thumbs[0].setAttribute("class", "sliderVerticalThumb");
  thumbs[1].setAttribute("class", "sliderVerticalThumb");
  range.setAttribute("class", "sliderVerticalRange");
  track.setAttribute("class", "sliderVerticalTrack");

  slider.appendChild(track);
  track.appendChild(range);
  track.appendChild(thumbs[0]);
  track.appendChild(thumbs[1]);

  thumbs[0].onmousedown = function(e) {
    thumbHeld = this;
    let thumbs = thumbHeld.parentElement.children;
    let trackRect = thumbHeld.parentElement.getBoundingClientRect();
    let thumbsPosition = [parseInt(thumbs[1].style.top.slice(0,-2)), parseInt(thumbs[2].style.top.slice(0,-2))];
    let thumbRects = [thumbs[1].getBoundingClientRect(), thumbs[2].getBoundingClientRect()];
    if (thumbsPosition[1]-thumbsPosition[0] < thumbRects[0].height-1) {
      let midp = ((thumbsPosition[0]+thumbsPosition[1])/2)+thumbRects[0].height/2;
      let mousep = e.pageY-window.scrollY-trackRect.top;
      if (mousep < midp) {
        thumbHeld = thumbs[1];
      } else {
        thumbHeld = thumbs[2];
      }
    }

    e.preventDefault();
  }
  thumbs[1].onmousedown = function(e) {
    thumbHeld = this;
    let thumbs = thumbHeld.parentElement.children;
    let trackRect = thumbHeld.parentElement.getBoundingClientRect();
    let thumbsPosition = [parseInt(thumbs[1].style.top.slice(0,-2)), parseInt(thumbs[2].style.top.slice(0,-2))];
    let thumbRects = [thumbs[1].getBoundingClientRect(), thumbs[2].getBoundingClientRect()];
    if (thumbsPosition[1]-thumbsPosition[0] < thumbRects[0].height-1) {
      let midp = ((thumbsPosition[0]+thumbsPosition[1])/2)+thumbRects[0].height/2;
      let mousep = e.pageY-window.scrollY-trackRect.top;
      if (mousep < midp) {
        thumbHeld = thumbs[1];
      } else {
        thumbHeld = thumbs[2];
      }
    }

    e.preventDefault();
  }
  range.onmousedown = function(e) {
    e.preventDefault();
  }
  slider.onmouseup = function(e) {
    thumbHeld = null;
  }
  document.addEventListener("mouseup", function(e) {
    thumbHeld = null;
  });


  // track.onmousemove = function(e) {
  document.addEventListener("mousemove", function(e) {
    if (thumbHeld != null && thumbHeld.parentElement.className == "sliderVerticalTrack") {
      let thumbs = thumbHeld.parentElement.children;
      let thumbRects = [thumbs[1].getBoundingClientRect(), thumbs[2].getBoundingClientRect()];
      let thumbsPosition = [parseInt(thumbs[1].style.top.slice(0,-2)), parseInt(thumbs[2].style.top.slice(0,-2))];
      let trackRect = thumbHeld.parentElement.getBoundingClientRect();

      if (thumbHeld === thumbs[1]) {
        thumbsPosition[0] = e.pageY-window.scrollY-trackRect.top-(thumbRects[0].height/2);
        thumbsPosition[0] = clamp(thumbsPosition[0], -thumbRects[0].height/2, thumbsPosition[1]);
        thumbs[1].style.setProperty("top", (thumbsPosition[0])+"px");
      }
      if (thumbHeld === thumbs[2]) {
        thumbsPosition[1] = e.pageY-window.scrollY-trackRect.top-(thumbRects[1].height/2)+1;
        thumbsPosition[1] = clamp(thumbsPosition[1], thumbsPosition[0], trackRect.height-thumbRects[1].height/2);
        thumbs[2].style.setProperty("top", thumbsPosition[1]+"px");
      }

      thumbs[0].style.setProperty("top", (thumbsPosition[0]+thumbRects[0].height/2)+"px");
      thumbs[0].style.setProperty("height", (thumbsPosition[1]-thumbsPosition[0])+"px");

      multiSliderValueChanged.values = thumbsPosition;
      thumbHeld.parentElement.dispatchEvent(multiSliderValueChanged);

      if (thumbsPosition[1]-thumbsPosition[0] < thumbRects[0].height-1) {
        thumbs[1].classList.add("sliderVerticalThumbT");
        thumbs[2].classList.add("sliderVerticalThumbB");
      } else {
        thumbs[1].classList.remove("sliderVerticalThumbT");
        thumbs[2].classList.remove("sliderVerticalThumbB");
      }
    }
  });
  setMultiSliderVValues(selector, 0, 1);
}


function getMultiSliderHValues(selector) {
  let trackBox = document.querySelector(selector).children[0].getBoundingClientRect();
  let thumbs = document.querySelector(selector).children[0].children;
  let thumb1 = thumbs[1].style.left;
  let thumb2 = thumbs[2].style.left;
  let thumb1Box = thumbs[1].getBoundingClientRect();
  let thumb2Box = thumbs[2].getBoundingClientRect();
  return [(parseInt(thumb1.slice(0,-2))+thumb1Box.width/2)/trackBox.width, (parseInt(thumb2.slice(0,-2))+thumb2Box.width/2)/trackBox.width];
}

function getMultiSliderVValues(selector) {
  let trackBox = document.querySelector(selector).children[0].getBoundingClientRect();
  let thumbs = document.querySelector(selector).children[0].children;
  let thumb1 = thumbs[1].style.top;
  let thumb2 = thumbs[2].style.top;
  let thumb1Box = thumbs[1].getBoundingClientRect();
  let thumb2Box = thumbs[2].getBoundingClientRect();
  return [(parseInt(thumb1.slice(0,-2))+thumb1Box.height/2)/trackBox.height, (parseInt(thumb2.slice(0,-2))+thumb2Box.height/2)/trackBox.height];
}

function setMultiSliderHValues(selector, val1, val2) {
  let trackBox = document.querySelector(selector).children[0].getBoundingClientRect();
  let thumbs = document.querySelector(selector).children[0].children;
  let thumb1Box = thumbs[1].getBoundingClientRect();
  let thumb2Box = thumbs[2].getBoundingClientRect();

  let val1px = clamp(val1,0,1)*trackBox.width;
  let val2px = clamp(val2,0,1)*trackBox.width;

  thumbs[1].style.setProperty("left", (val1px-thumb1Box.width/2)+"px");
  thumbs[2].style.setProperty("left", (val2px-thumb2Box.width/2)+"px");
  thumbs[0].style.setProperty("left", (val1px)+"px");
  thumbs[0].style.setProperty("width", ((val2px-thumb2Box.width)-(val1px-thumb1Box.width))+"px");

  if (val2px-val1px < thumb1Box.width-1) {
    thumbs[1].classList.add("sliderHorizontalThumbL");
    thumbs[2].classList.add("sliderHorizontalThumbR");
  } else {
    thumbs[1].classList.remove("sliderHorizontalThumbL");
    thumbs[2].classList.remove("sliderHorizontalThumbR");
  }
}

function setMultiSliderVValues(selector, val1, val2) {
  let trackBox = document.querySelector(selector).children[0].getBoundingClientRect();
  let thumbs = document.querySelector(selector).children[0].children;
  let thumb1Box = thumbs[1].getBoundingClientRect();
  let thumb2Box = thumbs[2].getBoundingClientRect();

  let val1px = clamp(val1,0,1)*trackBox.height;
  let val2px = clamp(val2,0,1)*trackBox.height;

  thumbs[1].style.setProperty("top", (val1px-thumb1Box.height/2)+"px");
  thumbs[2].style.setProperty("top", (val2px-thumb2Box.height/2)+"px");
  thumbs[0].style.setProperty("top", (val1px)+"px");
  thumbs[0].style.setProperty("height", ((val2px-thumb2Box.height)-(val1px-thumb1Box.height))+"px");

  if (val2px-val1px < thumb1Box.height-1) {
    thumbs[1].classList.add("sliderVerticalThumbT");
    thumbs[2].classList.add("sliderVerticalThumbB");
  } else {
    thumbs[1].classList.remove("sliderVerticalThumbT");
    thumbs[2].classList.remove("sliderVerticalThumbB");
  }
}