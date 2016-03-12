/**
 * Created by jnoir on 06/03/16.
 */

ModuleUser = (function ($) {
    var observer, type, action, data = {}, idReplace;

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
            params.url =  action == "add" ? "/users/" : "/users/"+ idReplace;
        }
        $.ajax(params);
    }

    function add(data){
        var divCreate, input, inputs;
        input = document.createElement('input');
        input.type = "submit";
        input.value = "edit";
        inputs = template(data,input);
        document.getElementById('added').appendChild(inputs);
        editListener(idReplace);
    }

    function template(data,input){
        var p, form;
        form = document.createElement('form');
        form.id = data._id;
        idReplace = form.id;
        form.appendChild(input);
        for(var i = 0; Object.keys(data).length > i ; i++ ) {
            if (Object.keys(data)[i] !== "_id" && Object.keys(data)[i] !== "__v"){
                p = document.createElement('input');
                p.innerHTML = Object.keys(data)[i];
                p.name = Object.keys(data)[i];
                p.value = data[Object.keys(data)[i]];
                p.style = "border:none";
                p.className ="edit";
                form.appendChild(p);
            }
        }
        return form;
    }

    function edit(data){
        var elemReplace, input, newinputs;
        input = document.createElement('input');
        input.type = "submit";
        input.value = "edit";

        elemReplace = document.getElementById(idReplace);
        console.log(elemReplace);
        newinputs = template(data, input);
        document.getElementById('added').replaceChild(newinputs, elemReplace);
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
        data = {};
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

    function editListener(id) {
        var user = new User();
        
        document.getElementById(id).addEventListener("submit", function (e) {
            e.preventDefault();
            user.editUser();
            console.log("ok");
        });
    }

})($);