# pure-js-multithumb-slider
pure javascript slider with multiple thumbs, for defining max/min values

Once included in a project using <link rel="stylesheet" href="multislider/multislider.css">

a horizontal or vertical slider can be initialized by defining a parent div of the desired dimensions, and passing the selector to
initMultiSliderHorizontal(selevtor);
or
initMultiSliderVertical(selector);

values can be retrieved using an EventListener valuechanged on the same element, and reading the event property "values"
these values range from [0, 1] inclusive.

values can be set with the function 
setMultiSliderHValues(selector, lower, upper);
or
setMultiSliderVValues(selector, lower, upper);
lower and upper values also ranging from [0, 1]
