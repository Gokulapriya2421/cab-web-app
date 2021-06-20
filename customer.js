document.write('<script src="admin.js" type="text/javascript"></script>');
document.write('<script src="choice.js" type="text/javascript"></script>');
class User{
    constructor(name,password,mobileNumber,count)
    {
        this.name = name;
        this.password = password;
        this.mobileNumber = mobileNumber;
        this.count = count;
    }
}
class TripDetails{
    constructor(date,time,mail,location,price,car,driverName)
    {
        this.date = date;
        this.time = time;
        this.mail = mail;
        this.location = location;
        this.price = price;
        this.car = car;
        this.driverName = driverName;
    }
}
var tripDetails = {}
var userDetail = {
    'user1@gmail.com':{
        name : 'user1@gmail.com',
        password : 'user1@gmail',
        mobileNumber : '9874563210',
        count : 0
    }
};
var userTripHistory = {
    'user1@gmail.com':[],
};
var idCount = 1;
function addingCustomer()
{
     var userId = document.getElementById("mailId").value;
     var password = document.getElementById("password").value;
     var confirmPassword = document.getElementById("passwordConfirmation").value;
     var mobileNumber = document.getElementById("mobileNumber").value;
     if (ValidateEmail(userId) && phonenumberValidation(mobileNumber))
     {
         if (password == confirmPassword )
         {
            
            var count = 0;
            if (userId == '' || password == '' || mobileNumber == '')
            {
                document.getElementById("addedCustomerContent").innerHTML = 'kindly enter all details' + '<br/>'
            }
           else {
               if (userId in userDetail)
               {
               document.getElementById("addedCustomerContent").innerHTML = 'user already present, kindly log in' + '<br/>';
               }
               else{
                   var addedUser = new User(userId,password,mobileNumber,count);
                   userDetail[userId]=addedUser;
                   document.getElementById("addedCustomerContent").innerHTML = "added successfully" + '<br/>'
                   userTripHistory[userId]=[];
                   console.log(userDetail)
                }
             }
         }
         else{
            document.getElementById("addedCustomerContent").innerHTML = 'kindly enter same password'+'<br/>'
         }
      
    }
    else{
        document.getElementById("addedCustomerContent").innerHTML = 'enter valid input' + '<br/>'
    }
}

function phonenumberValidation(inputtxt)
{
       var phoneno =  /^[7-9][0-9]{9}$/;
       if((inputtxt.match(phoneno)))
        {
           return true;
        }
        else
        {
        alert("enter valid mobile number");
        return false;
        }
}

function ValidateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
        return true;
    } else {
        alert("Invalid email address!");
        return false;
    }
  
  }

function booking()
{
    var mailEntered = document.getElementById("mailIdEntered").value;
    var startDestination = document.getElementById('startDestinationEntered').value.toLocaleUpperCase();
    var endDestination = document.getElementById('endDestinationEntered').value.toLocaleUpperCase();
    if (mailEntered == '' || startDestination == '' || endDestination == "")
    {
        document.getElementById("bookingContent").innerHTML = 'kindly enter all details' + '<br/>'
    }
    else {
         userTripHistory[mailEntered].count++;
         var destinationEntered = startDestination+'-'+endDestination;
         if (destinationEntered in costPerLocation){
             destination = destinationEntered
         }
         else{
              destination = destinationEntered.split("").reverse().join("");
        }
     
        if(destination in costPerLocation)
         {
             if (availabilityOfCar[startDestination].length>0)
             {
                 var bookedCar = availabilityOfCar[startDestination].pop();
                 var cost = costPerLocation[destination]*carDetails[bookedCar].cost;
                 availabilityOfCar[endDestination].push(bookedCar)
                 userDetail[mailEntered].count+=1;
                 var id = idCount+"t";
                  idCount++;
                  userTripHistory[mailEntered].push(id);
                 var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
                 var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
                tripDetails[id]= new TripDetails(date,time,mailEntered,destinationEntered,cost,bookedCar,carDetails[bookedCar].driverName);
                document.getElementById("bookingContent").innerHTML = "car booked :"+bookedCar+"<br/>"+"  cost  " +cost+"<br/>";
                console.log(tripDetails)
        }
        else
        {
            document.getElementById("bookingContent").innerHTML = "car not available" + '<br/>';
        }
        

    }
    else{
        document.getElementById("bookingContent").innerHTML = "destination is not available" + '<br/>';
    }
}
}

function customerTravelHistory()
{
    //var enteredDate = document.getElementById('dateEntered').value;
    var mailEntered = document.getElementById("mailIdEntered").value;
    var tripList = userTripHistory[mailEntered];
    if (tripList.length<=0)
    {
        document.getElementById("historyContent").innerHTML = 'no trips'+'<br/>'
    }
    else
    {
        for(let i=0;i<tripList.length;i++)
        {
            document.getElementById("historyContent").innerHTML += "location : "+tripDetails[tripList[i]].location+"<br/>" + "car number : "+tripDetails[tripList[i]].car+"<br/>"+"mail : "+tripDetails[tripList[i]].mail+"<br/>"
        }
    }
}
function bookingCustomer()
{
    var logInBookingDivision = document.getElementById("logInBookingDiv");
        if (logInBookingDivision.style.display === "none") {
            logInBookingDivision.style.display = "block";
        } else {
            logInBookingDivision.style.display = "none";
         }
}
function historyCustomer(){
    var logInHistoryDivision = document.getElementById("logInHistoryDiv");
        if (logInHistoryDivision.style.display === "none") {
            logInHistoryDivision.style.display = "block";
        } else {
            logInHistoryDivision.style.display = "none";
         }
}


function logIn()
{
    var mailEntered = document.getElementById("mailIdEntered").value;
    var passwordEntered = document.getElementById("passwordEntered").value;
    if (mailEntered == '' || passwordEntered == '')
    {
        document.getElementById("LoggingIn").innerHTML = 'kindly enter all details' + '<br/>'
    }
    else{
        if(userDetail[mailEntered].password == passwordEntered)
        {
            var afterLogInDivision = document.getElementById("afterLogInDiv");
            if (afterLogInDivision.style.display === "none") {
                afterLogInDivision.style.display = "block";
            } else {
                afterLogInDivision.style.display = "none";
             }
        }
        else
        {
            document.getElementById("LoggingIn").innerHTML = "Please sign in "+'<br/>';
        }
    }
   
}
function signup()
{
    var signUpDivision = document.getElementById("signUpDiv");
        if (signUpDivision.style.display === "none") {
            signUpDivision.style.display = "block";
        } else {
            signUpDivision.style.display = "none";
         }
}
function login(){
    var loginDivision = document.getElementById("logInDiv");
        if (loginDivision.style.display === "none") {
            loginDivision.style.display = "block";
        } else {
            loginDivision.style.display = "none";
         }
}
