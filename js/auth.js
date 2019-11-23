$(() => { // Initialisation du DOM

	// fonction de connexion
	const signInSubmit = $('#signInSubmit');

	signInSubmit.click(() => {

		const email = $('#signInEmail').val();
		const password = $('#signInPassword').val();

		firebase.auth().signInWithEmailAndPassword(email, password)
		.catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;	
		});

		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				document.location = './list.html';
			}else {

			}
		});

	});

	// fonction de déconnexion
	const signOutBtn = $('.signOutBtn');

	signOutBtn.click(() => {
		firebase.auth().signOut().catch((error) => {
			console.error(error.code, error.message);
		});
		document.location = './index.html';
	});

	// Affichage conditionnel des boutons selon l'état de connexion de l'utilisateur
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			$('.signInBtn').attr('class', 'd-none');
			$('.signUpBtn').attr('class', 'd-none');
			$('.signOutBtn').attr('class', 'd-block');
			$('.accountBtn').attr('class', 'd-block');
			$('.listBtn').attr('class', 'd-block');
			$('.scnrBtn').attr('class', 'd-block');
		} else {
			$('.signInBtn').attr('class', 'd-block');
			$('.signUpBtn').attr('class', 'd-block');
			$('.signOutBtn').attr('class', 'd-none');
			$('.accountBtn').attr('class', 'd-none');
			$('.listBtn').attr('class', 'd-none');
			$('.scnrBtn').attr('class', 'd-none');
		}
	});

	

});