document.write('<script src="admin.js" type="text/javascript"></script>');
document.write('<script src="common.js" type="text/javascript"></script>');
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
     var phoneno =  /^[7-9][0-9]{9}$/;
     var mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
     if (validation(userId,mailRegex) && validation(mobileNumber,phoneno))
     {
         if (password == confirmPassword )
         {
            
            var count = 0;
            if (userId == '' || password == '' || mobileNumber == '')
            {
                document.getElementById("addedCustomerContent").innerHTML = 'kindly enter all details' 
            }
           else {
               if (userId in userDetail)
               {
                hide('mailId');hide('password');hide('img');hide('passwordConfirmation');hide('mobileNumber')
               document.getElementById("addedCustomerContent").innerHTML = 'user already present, kindly log in' 
               }
               else{
                  hide('mailId');hide('password');hide('img');hide('passwordConfirmation');hide('mobileNumber')
                   var addedUser = new User(userId,password,mobileNumber,count);
                   userDetail[userId]=addedUser;
                   document.getElementById("addedCustomerContent").innerHTML = "added successfully"
                   userTripHistory[userId]=[];
                   console.log(userDetail)
                }
             }
         }
         else{
            document.getElementById("addedCustomerContent").innerHTML = 'kindly enter same password'
         }
      
    }
    else{
        document.getElementById("addedCustomerContent").innerHTML = 'enter valid input'
    }
}

function validation(inputtxt,regex)
{
       
       if((inputtxt.match(regex)))
        {
           return true;
        }
        else
        {
        alert("in valid");
        return false;
        }
}


function booking()
{
    var mailEntered = document.getElementById("mailIdEntered").value;
    var startDestination = document.getElementById('startDestinationEntered').value.toLocaleUpperCase();
    var endDestination = document.getElementById('endDestinationEntered').value.toLocaleUpperCase();
    var carType = document.getElementById('typeOfCarEntered').value.toLocaleLowerCase();
    if (mailEntered == '' || startDestination == '' || endDestination == "" || carType =="")
    {
        document.getElementById("bookingContent").innerHTML = 'kindly enter all details' 
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
        console.log(availabilityOfCar)
        if(destination in costPerLocation)
         {
             if (availabilityOfCar[startDestination].length>0)
             {
                 var bookedCar = availabilityOfCar[startDestination].pop();
                 if (carDetails[bookedCar].type == carType)
                 {
                    hide('startDestinationEntered');hide('endDestinationEntered');hide('typeOfCarEntered')
                    var cost = costPerLocation[destination]*carDetails[bookedCar].cost;
                    availabilityOfCar[endDestination].push(bookedCar)
                    userDetail[mailEntered].count+=1;
                    var id = idCount+"t";
                     idCount++;
                     userTripHistory[mailEntered].push(id);
                    var date = new Date().toJSON().slice(0,10);
                    var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
                   tripDetails[id]= new TripDetails(date,time,mailEntered,destinationEntered,cost,bookedCar,carDetails[bookedCar].driverName);
                  document.getElementById("bookingContent").innerHTML = ''
                   document.getElementById("bookingContent").innerHTML +="*******************************************" + "<br/>" + "car booked" + "&nbsp &nbsp &nbsp area" + "&nbsp &nbsp &nbsp cost" + "&nbsp &nbsp &nbsp driver name " + "<br/>"+
                                                                          "*******************************************"+ "<br/>"+
                                                                          bookedCar + "&nbsp &nbsp &nbsp" + destinationEntered + "&nbsp &nbsp &nbsp" + cost + "&nbsp &nbsp &nbsp" + carDetails[bookedCar].driverName
                                                                          +"<br/>"+ "*******************************************"
                
                 }
                 else{
                    document.getElementById("bookingContent").innerHTML = 'car type entered is not available '+'<br/>'
                    availabilityOfCar[startDestination].push(bookedCar)
                 }
                 
            }
            else
            {
                document.getElementById("bookingContent").innerHTML = "car not available" 
           }
        

        }
        else{
            document.getElementById("bookingContent").innerHTML = "destination is not available" 
        }
    }
}

function customerTravelHistory()
{
    //var enteredDate = document.getElementById('dateEntered').value;
    var mailEntered = document.getElementById("mailIdEntered").value;
    if (mailEntered == '')
    {
        ocument.getElementById("historyContent").innerHTML = 'kindly enter all details' 
    }
    else {
        var tripList = userTripHistory[mailEntered];
        if (tripList.length<=0)
        {
        
            document.getElementById("historyContent").innerHTML = 'no trips'
         }
        else
        {
            document.getElementById("historyContent").innerHTML = ''
            document.getElementById("historyContent").innerHTML += '***************************************************'+"<br/>"+
                                                                "s.no" + "&nbsp &nbsp &nbsp location" + "&nbsp &nbsp &nbsp car number" +
                                                                "&nbsp &nbsp &nbsp driver name" + "&nbsp &nbsp &nbsp price" + "&nbsp &nbsp &nbsp date" +
                                                                "&nbsp &nbsp &nbsp time" + "<br/>" + "***************************************************" +"<br/>"
            for(let i=0;i<tripList.length;i++)
            {
                let j=i+1
                document.getElementById("historyContent").innerHTML += j + "&nbsp &nbsp &nbsp &nbsp &nbsp"+tripDetails[tripList[i]].location+"&nbsp &nbsp &nbsp"+tripDetails[tripList[i]].car+"&nbsp &nbsp &nbsp"+
                                                                  tripDetails[tripList[i]].driverName+"&nbsp &nbsp &nbsp" + tripDetails[tripList[i]].price +"&nbsp &nbsp &nbsp"+ 
                                                                  tripDetails[tripList[i]].date +"&nbsp &nbsp &nbsp"+ tripDetails[tripList[i]].time + "&nbsp &nbsp &nbsp"+ "<br/>"
            }
              document.getElementById("historyContent").innerHTML += '***************************************************'
         }
    }
    
}
function dateWiseHistory(){
    var enteredDateToView = document.getElementById('dateEnteredId').value;
    var mailToView = document.getElementById("mailIdEntered").value;
    if (enteredDateToView == '' || mailToView == '')
    {
        document.getElementById('dayWiseContent').innerHTML = 'please enter date';
    }
    else{
        var tripList = userTripHistory[mailToView];
        if (tripList.length<=0)
        {
            hide('dateEnteredId')
            document.getElementById("dayWiseContent").innerHTML = 'no trips'
         }
        else
        {
            hide('dateEnteredId')
            var dateCheck = true
            document.getElementById("dayWiseContent").innerHTML = ''
            document.getElementById("dayWiseContent").innerHTML += '***************************************************'+"<br/>"+
                                                                "s.no" + "&nbsp &nbsp &nbsp location" + "&nbsp &nbsp &nbsp car number" +
                                                                "&nbsp &nbsp &nbsp driver name" + "&nbsp &nbsp &nbsp price" + "&nbsp &nbsp &nbsp date" +
                                                                "&nbsp &nbsp &nbsp time" + "<br/>" + "***************************************************" +"<br/>"
            for(let i=0;i<tripList.length;i++)
            {
                
                if (tripDetails[tripList[i]].date == enteredDateToView)
                {
                    let j =1;
                    document.getElementById("dayWiseContent").innerHTML += j + "&nbsp &nbsp &nbsp &nbsp &nbsp"+tripDetails[tripList[i]].location+"&nbsp &nbsp &nbsp"+tripDetails[tripList[i]].car+"&nbsp &nbsp &nbsp"+
                                                                  tripDetails[tripList[i]].driverName+"&nbsp &nbsp &nbsp" + tripDetails[tripList[i]].price +"&nbsp &nbsp &nbsp"+ 
                                                                  tripDetails[tripList[i]].date +"&nbsp &nbsp &nbsp"+ tripDetails[tripList[i]].time + "&nbsp &nbsp &nbsp"+ "<br/>"
                                            dateCheck = false;
                                            j++;
                }
                
            }
              document.getElementById("dayWiseContent").innerHTML += '***************************************************'
         }
         if (dateCheck)
         {
            document.getElementById("dayWiseContent").innerHTML = 'no trips on entered date'
         }
    }
}

function logIn()
{
    var mailEntered = document.getElementById("mailIdEntered").value;
    var passwordEntered = document.getElementById("passwordEntered").value;
    if (mailEntered == '' || passwordEntered == '')
    {
        document.getElementById("LoggingIn").innerHTML = 'kindly enter all details' 
    }
    else{
        if (mailEntered in userDetail)
        {

            if(userDetail[mailEntered].password == passwordEntered)
            {
                document.getElementById("LoggingIn").innerHTML =''
                var afterLogInDivision = document.getElementById("afterLogInDiv");
                if (afterLogInDivision.style.display === "none") {
                   afterLogInDivision.style.display = "block";
                } else {
                   afterLogInDivision.style.display = "none";
             }
           }
           else{
            document.getElementById("LoggingIn").innerHTML = 'kindly re-check your password'
           }
        }
        
        else
        {
            document.getElementById("LoggingIn").innerHTML = "Please sign in ";
        }
    }
   
}



