$(() => { // Initialisation du DOM

	$('.sidenav').sidenav();//pourle menu de materialize
	// Fonction de création de compte (auth)
	const signUpSubmit = $('#signUpSubmit'); // Bouton soumission formulaire inscription

	signUpSubmit.click(() => { // Soumission du formulaire
		console.log('Form submitted');

		const email = $('#signUpEmail').val();
		const password = $('#signUpPassword').val();
		console.log(email);

		// Création de l'utilisateur avec email et mot de passe
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((data) => { // réponse de firebase (si tout s'est bien passé)
			console.log('inscription réussie');
			document.location = './list.html';
		})
		.catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			alert(errorCode + ' : ' + errorMessage);
		});

    });
    
});