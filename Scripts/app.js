// Hamza Khan 100709587
// Date Completed: 03/--/2020
class Contact
{
    constructor(contactName = "", emailAddress = "", contactNumber = "", contactMessage = "")
    {
        this.contactName = contactName;
        this.emailAddress = emailAddress;
        this.contactNumber = contactNumber;
        this.contactMessage = contactMessage;
    }
}

class Item
{
    constructor(productID, productName, developer, description, price)
    {
        this.productID = productID;
        this.productName = productName;
        this.developer = developer;
        this.description = description;
        this.price = price;
    }
}

class User
{
    constructor(firstName, lastName, username, email, password)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

let loginLI;
let loginLIParent;
let userLI;


"use strict";
//IIFE - Immediately Invoked Function Expression
// mean? -> anonymous self-executing function

let app;
(function(app){

    // Declare Function Variables here...
    console.log("%cDeclaring Variables", "color: red;")
    let contactObject = new Contact();
    let userObject = new User();
    /**
     * Variable initialization in this function
     *
     */
    function Start()
    {
       PageSwitcher();

        Main();
    }

    function PageSwitcher()
    {
        let name = window.location.pathname;

       let pageName = name.substring(1, name.length - 5);

       switch(pageName)
        {
            case "index":
               DisplayHomePageContent();
                break;
            case "products":
                DisplayProductsContent();
                break;
            case "services":
                DisplayServicesContent();
                break;
            case "about":
                DisplayAboutContent();
                break;
            case "contact":
                DisplayContactContent();
                break;
            case "projects":
                DisplayProjectsContent();
                break;
            case "login":
                DisplayLoginContent();
                break;
            case "register":
                DisplayRegisterContent();
                break;
            default:
                console.error("Landed in a page that is not defined");
                break;
        }

        // add a class of active to the active link
        $("#"+pageName).addClass("active");
    }

    function DisplayHomePageContent()
    {
        document.getElementById("home").className = "nav-item active";
        /* $("button").click(()=>{
            location.href = "projects.html";
        }); */

        document.title = "WEBD6201 - Home";

        let progressbar = $( "#progressBar" ).progressbar({
            value: 37
          });

        console.log(progressbar);

        $("#projectsButton").click(function(){
            $(this).fadeOut(3000, "linear", ()=>{
                $(this).fadeIn(1000, "linear", ()=>{
                    location.href = "projects.html";
                });
            });
        });
    }

    function DisplayProductsContent()
    {
        document.title = "WEBD6201 - Products";
        let products = [];

        // 1. CREATE A TRY / CATCH FOR EXCEPTION HANDLING
        try {
            // 2. INSTANTIATE A NEW XHR OBJECT
            let XHR = new XMLHttpRequest();

            // 3. ADD AN EVENT LISTENER FOR "READSTATECHANGE"
            XHR.addEventListener("readystatechange", function(){
                if((XHR.readyState === 4) && (XHR.status === 200))
                {
                    // 6. GET A RESPONSE FROM THE SERVER
                    let data = JSON.parse(XHR.responseText);
                    
                    data.products.forEach(item => {
                        products.push(new Item(item.productID, item.productName, item.developer, item.description, item.price));
                    });

                    
                }
            });
        
            // 4. OPEN A CHANNEL - MAKE A REQUEST WITH THE APPROPRIATE URL
             XHR.open("GET","./data/products.json",true);

             // 5. SEND THE REQUEST TO THE SERVER
             XHR.send();
        } catch (error) {
            console.log("Error: " + error);
        }

        
    }

    function DisplayServicesContent()
    {
        document.title = "WEBD6201 - Services";

    }

    function DisplayAboutContent()
    {
        document.title = "WEBD6201 - About Us";
    }

    function DisplayContactContent()
    {
        document.title = "WEBD6201 - Contact Us";
        function clearForm()
        {
            //document.getElementById("contactForm").reset();
            $("#contactForm")[0].reset();
            $("#errorMessage").hide();
        }

        function validateInput(selector, condition, errorMessage)
        {
            if(condition)
            {
                $("#errorMessage").show();
                $("#errorMessage").text(errorMessage);
                $(selector).select();
                $(selector).css("border", "2px solid red");
            }
            else
            {
                $("#errorMessage").hide();
                $(selector).css("border", "1px solid #ced4da");
            }
        }

        $("#errorMessage").hide();
        $("#contactName").select();

        // Contact Name Events
        $("#contactName").blur((e)=>
        {
            validateInput("#contactName",( $("#contactName").val().length < 2),"Contact Name is Too Short");
        });

        $("#contactName").focus((e)=>
        {
            $("#contactName").select();
        });

        // Email Events
        $("#emailAddress").blur((e)=>
        {
            validateInput("#emailAddress",($("#emailAddress").val().length < 8) || (!$("#emailAddress").val().includes("@")),"Invalid Email Address");
        });

        $("#emailAddress").focus((e)=>
        {
            $("#emailAddress").select();
        });

        // Contact Number Events
        $("#contactNumber").blur((e)=>
        {
            let phonePattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
            let phoneNumber = $("#contactNumber").val();

            validateInput("#contactNumber",( !phonePattern.test(phoneNumber)),"Invalid Contact Number");
        });

        $("#contactNumber").focus((e)=>
        {
            $("#contactNumber").select();
        });

        // Contact Message Events
        $("#contactMessage").blur((e)=>
        {
            validateInput("#contactMessage",( $("#contactMessage").val().length < 2 ),"Contact Message Too Short");
        });

        $("#contactMessage").focus((e)=>
        {
            $("#contactMessage").select();
        });


        $("#contactForm").submit  ((e)=>
        {
            if(document.getElementById("contactForm").checkValidity() == false)
            {
                e.preventDefault();
                e.stopPropagation();
                console.log("form not valid");
            }

            
            let contactName = $("#contactName").val();
            let emailAddress = $("#emailAddress").val();
            let contactNumber = $("#contactNumber").val();
            let contactMessage = $("#contactMessage").val();

            console.log(`Contact Name: ${contactName}`);
            console.log(`Email Address: ${emailAddress}`);
            console.log(`Contact Number: ${contactNumber}`);
            console.log(`Contact Message: ${contactMessage}`);

            contactObject.contactName = contactName;
            contactObject.emailAddress = emailAddress;
            contactObject.contactNumber = contactNumber;
            contactObject.contactMessage = contactMessage;

            console.log(contactObject);

            clearForm();
        });

        $("#resetButton").click((e)=>
        {
            e.preventDefault();
            if(confirm("Are You Sure?"))
            {
                clearForm();
            }

            
        });
    }

    function DisplayProjectsContent()
    {
        document.title = "WEBD6201 - Projects";
    }

    function DisplayLoginContent()
    {
        document.title = "WEBD6201 - Login";

        $("#loginForm").submit  ((e)=>
        {
            loginLI = document.getElementById('login');
            loginLIParent = loginLI.parentNode;
            userLI = loginLI.cloneNode(true);
            userLI.id = "hr";

            userLI.firstElementChild.firstElementChild.className = "fas fa-users";
            userLI.firstElementChild.lastChild.textContent = $("#userName").val();

            loginLIParent.insertBefore(userLI, loginLI);
           
            e.preventDefault();
            e.stopPropagation();
            $("#loginForm")[0].reset();
            $("#login").hide();
            $("#logout").show();

        });

    }

    function DisplayRegisterContent()
    {
        document.title = "WEBD6201 - Register";

        function clearForm()
        {
            //document.getElementById("contactForm").reset();
            $("#contactForm")[0].reset();
            $("#errorMessage").hide();
        }

        function validateInput(selector, condition, errorMessage)
        {
            if(condition)
            {
                $("#errorMessage").show();
                $("#errorMessage").text(errorMessage);
                $(selector).select();
                $(selector).css("border", "2px solid red");
            }
            else
            {
                $("#errorMessage").hide();
                $(selector).css("border", "1px solid #ced4da");
            }
        }

        $("#errorMessage").hide();
        $("#firstName").select();

        // First Name Events
        $("#firstName").blur((e)=>
        {
            validateInput("#firstName",( $("#firstName").val().length < 2),"First Name is Too Short");
        });

        $("#firstName").focus((e)=>
        {
            $("#firstName").select();
        });

        // Last Name Events
        $("#lastName").blur((e)=>
        {
            validateInput("#lastName",( $("#lastName").val().length < 2),"Last Name is Too Short");
        });

        $("#lastName").focus((e)=>
        {
            $("#lastName").select();
        });

        // Email Events
        $("#emailAddress").blur((e)=>
        {
            validateInput("#emailAddress",($("#emailAddress").val().length < 8) || (!$("#emailAddress").val().includes("@")),"Invalid Email Address");
        });

        $("#emailAddress").focus((e)=>
        {
            $("#emailAddress").select();
        });

        // Password Events
        $("#password").blur((e)=>
        {
            validateInput("#password",( $("#password").val().length < 6),"Password is Too Short");
        });

        $("#password").focus((e)=>
        {
            $("#password").select();
        });

        // Confirm Password Events
        $("#confirmPassword").blur((e)=>
        {
            validateInput("#confirmPassword",( $("#confirmPassword") !== $("#password")),"Passwords Do Not Match");
        });

        $("#confirmPassword").focus((e)=>
        {
            $("#confirmPassword").select();
        });


        $("#registerForm").submit  ((e)=>
        {
            if(document.getElementById("registerForm").checkValidity() == false)
            {
                e.preventDefault();
                e.stopPropagation();
                console.log("form not valid");
            }

            
            let firstName = $("#firstName").val();
            let lastName = $("#lastName").val();
            let emailAddress = $("#emailAddress").val();
            let password = $("#password").val();

            console.log(`First Name		: ${firstName}`);
            console.log(`Last Name		: ${lastName}`);
            console.log(`Email Address	: ${emailAddress}`);
            console.log(`Password		: ${password}`);

            contactObject.firstName = firstName;
            contactObject.lastName = lastName;
            contactObject.emailAddress = emailAddress;
            contactObject.password = password;

            console.log(contactObject);

            clearForm();
        });

    }

    /**
     * Main Program entry point is here
     *
     */
    function Main()
    {
       
    }
    
    

    window.addEventListener("load", Start);
})(app || (app = {}));

