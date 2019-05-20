import jQuery from "jquery"
window.$ = jQuery;
window.jQuery = jQuery;

$(document).ready(function () {

    console.info('DOM Ready');

    $('input, textarea').powerTip({
        placement: 'e',
        mouseOnToPopup: true,
    });

    $('.textareaCounter').on('keyup', function (event) {
        var count = $(this).val().length;
        $('.returnCounter').html(count);
    });

    $('.getCurrentLocation').load(locateMe());
});

function locateMe() {
    console.log("test");
    window.navigator.geolocation.getCurrentPosition(geolocationSuccess);
}
function geolocationSuccess(position) {
    var coords = position.coords;
    var url = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' +
        coords.latitude + '&lon=' + coords.longitude;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (json) {
        var city = json.address.city;
        $('.input-text').val(city);
    });
}
