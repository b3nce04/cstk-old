$(function () {
	var path = window.location.pathname;
	$('.nav-links li a[href="' + path + '"]')
		.parents("li")
		.addClass("active");
});

$("#btnNavbarToggle").click(function () {
    var navbar = $("nav.sidenav").toggleClass("toggled")
    $('#btnNavbarToggle').text(navbar.css('display') === 'none' ? '>>' : '<<')
});