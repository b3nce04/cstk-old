$(function () {
	var path = window.location.pathname.split('/')[1];
	$('.nav-links li a[href="/' + path + '"]')
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

$("#adminMessage").click(() => {
	$("#adminMessage").hide();
});
