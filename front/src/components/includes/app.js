import $ from 'jquery';

$( document ).ready(function() {

    $("#notification_1 i").click(function () {
        console.log('test')
        $("#notification_1").fadeOut("slow");
    });
    $("#notification_2 i").click(function () {
        $("#notification_2").fadeOut("slow");
    });
    $("#notification_3 i").click(function () {
        $("#notification_3").fadeOut("slow");
    });

});