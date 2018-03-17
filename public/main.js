// main.js

var lastName;
var firstName;
var birthDate;
var adress;
var email;
var subscriptionend;
var active;
var renewable;

var bodyContent;
var updateContent;

function getRow(row) {
    var x=row.cells;
    lastName= x[1].innerHTML.toString().trim();
    firstName = x[2].innerHTML.toString();
    birthDate = x[3].innerHTML.toString();
    adress = x[4].innerHTML.toString();
    email = x[5].innerHTML.toString();
    subscriptionend = x[6].innerHTML.toString();
    active = x[7].innerHTML.toString();
    renewable = x[8].innerHTML.toString();
    bodyContent = { 'lastName': lastName,
        'firstName': firstName
    };
}

/*module.exports = {
    getValue: function() {
        updateContent = {
            'lastName': lastName,
            'firstName': firstName,
            'birthDate': birthDate,
            'adress': adress,
            'email': email,
            'subscriptionEnd': subscriptionend,
            'active': active,
            'renewable': renewable
        };
        return updateContent;
    }
};*/

var del = document.getElementById('delete');

del.addEventListener('click', function () {

    fetch('subscriptions', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyContent)
    }).then(function(res) {
        if (res.ok) return res.json();
    }).then(function(data){
        console.log(data);
        window.location.reload();
    });
});




