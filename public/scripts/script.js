$(function () {
	var path = window.location.pathname;
	$('.nav-links li a[href="' + path + '"]')
		.parents("li")
		.addClass("active");
});

$("#btnNavbarToggle").click(function () {
	var navbar = $("nav.sidenav").toggleClass("showed");
	$("#btnNavbarToggle").text(navbar.hasClass("showed") ? "<" : ">");
});

$(".toggleLogout").click(() => {
	$("#logoutModal").modal("toggle");
});

$(".moderatorMessage").click(() => {
	$(".moderatorMessage").hide();
});

$(".personalMessage").click(() => {
	$(".personalMessage").hide();
});