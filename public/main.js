// main.js
var prevLastName;

function getRow(row) {
    var x=row.cells;
    prevLastName= x[1].innerHTML.toString().trim();
}

var toupdate = document.getElementById('toupdate');
toupdate.addEventListener('click',function () {
    var formUpdate = document.getElementById('formUpdate');
    formUpdate.style.visibility = 'visible';
    fetch('subscriptions', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            prevlastName:prevLastName
        })
    });
});



/*var update = document.getElementById('update');
update.addEventListener('click', function () {
    document.getElementById('formUpdate').style.visibility = 'hidden';
});*/


var del = document.getElementById('delete');

del.addEventListener('click', function () {

    fetch('subscriptions', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({lastName : prevLastName})
    }).then(function(res) {
        if (res.ok) return res.json();
    }).then(function(data){
        console.log(data);
        window.location.reload();
    });
});




