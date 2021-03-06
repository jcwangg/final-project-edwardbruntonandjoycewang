/*
Edward Brunton
Joyce Wang
CSC 337 001

Processes the login page's buttons to create accounts and verify login info.
Once logged in, the user can access the web form page. 
*/
"use strict";
(function () {
    let urlStem = "https://edwardbruntonandjoycewang.herokuapp.com/"
    /**
     * Enables the click buttons after the html loads
     */
    window.onload = function () {
        document.querySelector("#success button").onclick = function () {
            document.getElementById("success").style.display = 'none';
            switchToExistingAccount();
        }
        document.getElementById("login").onclick = login;
        document.getElementById("createNewAccount").onclick = newAccount;
        document.getElementById("newAccount").onclick = switchToNewAccount;
        document.getElementById("existingAccount").onclick = switchToExistingAccount;
        document.getElementById("newAccountFieldSet").style.display = 'none';
        console.log("loaded");
    };
    /**
     * Switches to the new account div
     */
    function switchToNewAccount() {
        clearError();
        console.log("Switch to new account");
        document.getElementById("existingAccountFieldSet").style.display = 'none';
        document.getElementById("newAccountFieldSet").style.display = 'block';
    }
    /**
     * Switches to the existing account div
     */
    function switchToExistingAccount() {
        clearError();
        console.log("Switch to existing account");
        document.getElementById("existingAccountFieldSet").style.display = 'block';
        document.getElementById("newAccountFieldSet").style.display = 'none';
    }
    /**
     * Logs a user in
     */
    function login() {
        let password = document.getElementById("loginPassword").value;
        let email = document.getElementById("loginEmail").value;
        let validItems = true;
        if (password.length < 8) {
            addError("Password must be at least 8 characters long");
            validItems = false;
        }
        if (!
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            addError("Email must have proper form");
            validItems = false;
        }
        if (validItems) {
            let url = urlStem + "login";
            const message = {
                "email": email,
                "password": password
            };
            const fetchOptions = {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(message)
            };
            fetch(url, fetchOptions)
                .then(checkStatus)
                .then(function (responseText) {
                    if(document.getElementById("error").innerHTML == "")
                        window.location.href = "ccwebform.html";
                })
                .catch(function (response) {
                    addError("Detailed trace error:");
                    addError(response);
                });
        }
        console.log("Login button click");
    }
    /**
     * Clears the errors from the error div
     */
    function clearError() {
        console.log("clearing error");
        document.getElementById("error").innerHTML = "";
    }
    /**
     * Checks if the error div is empty
     */
    function emptyError() {
        console.log(document.getElementById("error").innerHTML);
        if (document.getElementById("error").innerHTML === "") {
            return true;
        }
        return false;
    }
    /**
     * Adds an error message to the error div
     * @param {an error message} error 
     */
    function addError(error) {
        console.log("creating error");
        let errorDiv = document.createElement("div");
        errorDiv.innerHTML = error;
        console.log("error:");
        console.log(error);
        document.getElementById("error").appendChild(errorDiv);
        console.log("error div created");
    }
    function newAccount() {
        clearError();
        let password = document.getElementById("passwordAccount").value;
        let cPassword = document.getElementById("confirmPasswordAccount").value;
        let name = document.getElementById("fullNameAccount").value.trim();
        let email = document.getElementById("emailAccount").value;
        let validItems = true;
        if (password !== cPassword) {
            addError("Passwords must match");
            validItems = false;
        }
        if (password.length < 8) {
            addError("Password must be at least 8 characters long");
            validItems = false;
        }
        if (password.toUpperCase() === password || password.toLowerCase() === password) {
            addError("Password must contain a mix of upper and lower case");
            validItems = false;
        }
        if (password.indexOf(" ") !== -1) {
            addError("Password must not have a space");
            validItems = false;
        }
        let a = parseInt(password, 10);
        console.log(a);
        if (!/\d/.test(password)) {
            addError("Password must contain a number");
            validItems = false;
        }
        if (name.indexOf(" ") === -1 || name.length < 3) {
            addError("Must have a first and a last name");
            validItems = false;
        }
        if (!
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            addError("Email must have proper form");
            validItems = false;
        }
        if (validItems) {
            let url = urlStem + "register";
       // let url = "/register";// need to change 3000 to process.env.PORT
        const message = {
                "email": email,
                "fullName": name,
                "password": password
            };
            const fetchOptions = {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(message)
            };
            fetch(url, fetchOptions)
                .then(checkStatus)
                .then(function (responseText) {
                    if (emptyError()) {
                        console.log("no error");
                        document.getElementById("success").style.display = "block";
                    } else {
                        console.log("existing errors");
                    }
                })
                .catch(function (response) {
                    addError("Detailed trace error:");
                    addError(response);
                });
        }
    }
    /**
     *Checks the status of a response and returns the text or the error code
     *Parameters:
        *Response: server response that contains status and text
     */
    function checkStatus(response) {
        const lowEndValid = 200;
        const highEndValid = 300;
        console.log(response.status);
        console.log(response);
        if (response.status >= lowEndValid && response.status < highEndValid) {
            return response.text();
        }
        else {
            console.log("unacceptable return");
            clearError();
            console.log("error cleared");
            addError(response.statusText);
            console.log("error added to gui");
        }
    }
})();
