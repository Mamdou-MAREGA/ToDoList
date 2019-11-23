$(document).ready(()=>{

    firebase.auth().onAuthStateChanged(function(user) {

        if (user) {
            console.log('connecté');
            let uid = user.uid;
            let childKey, childData;
            let bddList = firebase.database().ref('list/' + uid);

            // Ajouter un item dans la BDD
            $('#addBtn').click(()=>{
                
                console.log('ajout item ok');
                let item = $('#item').val();
                console.log(item);
                bddList.push ({
                    item: item
                });   
            });

            // Function ajout item à la liste
            function addItem(x){

                let newLI = document.createElement('Li');
                let newContent = document.createTextNode(x);
                let iClose = document.createElement('i');

                newLI.appendChild(newContent);
                newLI.classList.add('list-group-item');

                let iconX = "fa-times-circle";
                let iconY = "fas";
                iClose.classList.add(iconX,iconY);

                newLI.id = childKey;
                iClose.id = 'x' + childKey;

                let ul = document.getElementById('containerlist');

                newLI.append(iClose);
                ul.append(newLI);

                // Click boutton supprimer
                $('i.fa-times-circle').click(()=>{

                    let itemId = event.target.id.slice(1);
                    bddList.child(itemId).remove();

                });

            } // Fin addItem

            // Aller chercher les données dans bdd pour afficher ensuite grâce à addItem
            bddList.on('value', function(snapshot) {

                let valSnapshot = snapshot.val();
               document.getElementById('containerlist').innerHTML = '';

                snapshot.forEach(function(childSnapshot) {

                    childKey = childSnapshot.key;
                    childData = childSnapshot.val();
                    let item = childData.item;
                    addItem(item);
                });
            });
        }
        else {

            console.log('Non connecté');
        }

    });
});