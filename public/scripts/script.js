$(function () {
	var path = window.location.pathname.split('/')[1];
	$('.nav-links li a[href="/' + path + '"]')
		.parents("li")
		.addClass("active");

	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	})
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