// Login
$("#loginButton").click(()=> {
	const [username, password, clasID] = [$("#username").val(), $("#password").val(), $("#classID").val()]
	
	fetch('/user/login', {
		method: 'POST',
		body: JSON.stringify({username: username, password: password, clasID: classID})
	})
    	.then(response => response.text())
    	.then(data => console.log(data));
});

// Register

// App
$(function () {
	var path = window.location.pathname;
	$('.nav-links li a[href="' + path + '"]')
		.parents("li")
		.addClass("active");
});

$("#btnNavbarToggle").click(function () {
    var navbar = $("nav.sidenav").toggleClass("showed")
    $('#btnNavbarToggle').text(navbar.hasClass('showed') ? '<' : '>')
});

$(".toggleLogout").click(()=> {
	$('#logoutModal').modal('toggle')
});