$(document).ready(function() {
    var canvas = document.getElementById('image');
    var ctx = canvas.getContext('2d');
    canvas.width = 700;
    canvas.height = 450;

    var canvasOrig = document.getElementById('original');
    var ctxOrig = canvasOrig.getContext('2d');
    canvasOrig.width = 700;
    canvasOrig.height = 450;

    drawExample();

    function drawExample() {
        var img = new Image();
        img.src = 'default.jpg';
        img.crossOrigin =  'Anonymous';
        img.onload = function() {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctxOrig.drawImage(img, 0, 0, canvasOrig.width, canvasOrig.height);
            /*console.log(canvas.toDataURL());
            localStorage.setItem('savedImageData', canvas.toDataURL());
            localStorage.setItem('savedImageDataOrig', canvasOrig.toDataURL());*/
        }
    }

    $('#reset').on('click', function() {
        var img = ctxOrig.getImageData(0, 0, canvasOrig.width, canvasOrig.height);
        ctx.putImageData(img, 0, 0);
        resetRangeInput();
    });

    function resetRangeInput() {
        $('#r1').val('0');
        $('#r2').val('0');
        $('#r3').val('0');
        $('#r4').val('0');
        $('#r5').val('0');
        canvas.style.webkitFilter = 'blur(0px)';
    }

    $('#r1').on('change', function (event) {
        var value =  $(event.currentTarget).val();
        var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var imgO = ctxOrig.getImageData(0, 0, canvasOrig.width, canvasOrig.height);
        if (value != 0) {
            var data = img.data;
            for (var i = 0; i < data.length; i += 4) {
                var r = data[i];
                var g = data[i+1];
                var b = data[i+2];
                var v = (0.2126 * r + 0.7152 * g + 0.0722 * b) * (1 - value/20);
                data[i] = data[i+1] = data[i+2] = v
            }
            ctx.putImageData(img, 0, 0);
        } else {
            ctx.putImageData(imgO, 0, 0);
        }
    });
    $('#r2').on('change', function (event) {
        var value =  $(event.currentTarget).val();
        canvas.style.webkitFilter = 'blur(' + value + 'px)';
    });
    $('#r3').on('change', function (event) {
        var value =  $(event.currentTarget).val();
        var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var imgO = ctxOrig.getImageData(0, 0, canvasOrig.width, canvasOrig.height);
        if (value != 0) {
            var data = img.data;
            for (var i = 0; i < data.length; i += 4) {
                data[i] += parseInt(value)*10;
                data[i+1] += parseInt(value)*10;
                data[i+2] += parseInt(value)*10;
            }
            ctx.putImageData(img, 0, 0);
        } else {
            ctx.putImageData(imgO, 0, 0);
        }
    });
    $('#r4').on('change', function (event) {
        var value =  $(event.currentTarget).val();
        var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var imgO = ctxOrig.getImageData(0, 0, canvasOrig.width, canvasOrig.height);
        if (value != 0) {
            var data = img.data;
            for (var i = 0, n = data.length; i < n; i += 4) {
                var randColor1 = 0.1 * value + Math.random() * 0.4;
                var randColor2 = 0.1 * value + Math.random() * 0.4;
                var randColor3 = 0.1 * value + Math.random() * 0.4;
                data[i] = data[i] * randColor1;
                data[i+1] = data[i+1] * randColor2;
                data[i+2] = data[i+2] * randColor3;
            }
            ctx.putImageData(img, 0, 0);
        } else {
            ctx.putImageData(imgO, 0, 0);
        }
    });
    $('#r5').on('change', function (event) {

    });

    $('#imageLoader').on('change', handleImage);

    function handleImage(e){
        var reader = new FileReader();
        reader.onload = function(event) {
            var image = new Image();
            image.onload = function() {
                var deltaX = 0;
                var deltaY = 0;
                if (image.width > canvas.width) {
                    image.width = canvas.width = canvasOrig.width;
                } else {
                    deltaX = (canvas.width - imgage.width)/2;
                }
                if (image.height > canvas.height) {
                    image.height = canvas.height = canvasOrig.height;
                } else {
                    deltaY = (canvas.height - imgage.height)/2;
                }
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctxOrig.clearRect(0, 0, canvasOrig.width, canvasOrig.height);
                ctx.drawImage(image, deltaX, deltaY, image.width, image.height);
                ctxOrig.drawImage(image, deltaX, deltaY, image.width, image.height);
            }
            image.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        resetRangeInput();
    }
});
