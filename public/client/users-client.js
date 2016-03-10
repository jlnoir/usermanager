/**
 * Created by jnoir on 06/03/16.
 */

ModuleUser = (function ($) {
    var observer, type, action, data = {};

    // Object User
    function User() {
        var username, email, color;
    }

    User.prototype.addUser = function () {
        action = "add";
        type = "POST";
        check(function () {
            sendDataToModel(data, type, action);
        });
    };

    User.prototype.editUser = function () {
        action = "edit";
        type = "PUT";
        check(function () {
            sendDataToModel(data, type, action);
        });
    };

    function sendDataToModel(data, type, action) {
        var params = {
            url: "/users/",
            dataType: "json",
            type: type,
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        };

        if (action == "edit" || action == "add") {
            params.data = data;
            params.success = function (data) {
                action == "add" ? add(data) : edit(data);
            };
            console.log(data);
            params.url =  action == "add" ? "/users/" : "/users/"+ data[Object.keys(data)[3]];
            console.log(params);
        }
        $.ajax(params);
    }

    function add(data){
        var divCreate, p, form, input;
        divCreate = document.createElement('div');
        input = document.createElement('input');
        input.type = "submit";
        input.value = "edit";
        form = document.createElement('form');
        form.id = "edit";
        form.appendChild(input);
        for(var i = 0; Object.keys(data).length > i; i++ ) {
            p = document.createElement('input');
            p.innerHTML = Object.keys(data)[i];
            p.value = data[Object.keys(data)[i]];
            p.className ="edit";
            form.appendChild(p);
        }
        divCreate.appendChild(form);
        console.log(divCreate);
        document.getElementById('added').appendChild(divCreate);
        editListener();
    }

    //function add(data){
    //    var divCreate, p, nodeText;
    //    divCreate = document.createElement('div');
    //    for(var i = 0; Object.keys(data).length > i; i++ ) {
    //        p = document.createElement('p');
    //        nodeText = document.createTextNode(Object.keys(data)[i] +":"+ data[Object.keys(data)[i]]);
    //        p.appendChild(nodeText);
    //        divCreate.appendChild(p);
    //    }
    //
    //    console.log(divCreate);
    //    document.getElementById('added').appendChild(divCreate);
    //}

    function check(callback) {
        var input = document.getElementsByClassName(action);
        for (var i = 0; input.length > i; i++) {
            if (input[i].value.length < 1 || input[i].value === 'undefined' || input[i].value === '') {
                console.log(input[i].name + "est vide");
                break;
            }
            data[input[i].name] = input[i].value;
        }
        Object.keys(data).length > 0 ? callback(data) : console.log("Champ vide");
    }


    window.addEventListener('load', function () {
        var user = new User();

        document.getElementById("add").addEventListener("submit", function(e){
            e.preventDefault();
            user.addUser();
        });
    });

    function editListener() {
        var user = new User();
        
        document.getElementById("edit").addEventListener("submit", function (e) {
            e.preventDefault();
            user.editUser();
        });
    }

})($);