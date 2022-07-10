$(function () {
	var path = window.location.pathname.split("/")[1];
	$('.nav-links li a[href="/' + path + '"]')
		.parents("li")
		.addClass("active");
	var element = $("#groupMessages");
	if (element.length) {
		element.animate({
			scrollTop: element[0].scrollHeight
		}, 300);

		var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
		var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  			return new bootstrap.Tooltip(tooltipTriggerEl)
		})
	}
	new EmojiPicker({
		trigger: [
			{
			  selector: '#emojiSelector',
			  insertInto: '#emoji'
			},
		],
		closeButton: true,
		specialButtons: '#0d6efd'
	});
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