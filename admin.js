document.write('<script src="choice.js" type="text/javascript"></script>');
document.write('<script src="customer.js" type="text/javascript"></script>');
class DetailsOfCab{
    constructor(carNumber,driverName,location,type,cost)
    {
        this.carNumber = carNumber;
        this.driverName = driverName;
        this.location = location;
        this.type = type;
        this.cost = cost;
    }
    
}

var carDetails = {
    'tn29aa0000' : {
        carNumber : 'tn29aa0000',
        driverName : 'driver1',
        location : 'A',
        type : 'mini',
        cost : 10
    },
    'tn29aa0001' : {
        carNumber : 'tn29aa0001',
        driverName : 'driver2',
        location : 'B',
        type : 'mini',
        cost : 15
    }

};
var availabilityOfCar = {
    'A':['tn29aa0000'],
    'B':['tn29aa0001']
};
var costPerLocation = {
    'A-B' : 15,
    'B-C' : 20,
    'A-C' : 25,
}
function addingCar(){
    
    var carNumber = document.getElementById("numberOfCar").value.toLocaleLowerCase();
    var driverName = document.getElementById("nameOfDriver").value.toLocaleLowerCase();
    var location = document.getElementById("locationOfCar").value.toLocaleUpperCase();
    var type = document.getElementById("typeOfCar").value.toLocaleLowerCase();
    var cost = document.getElementById("costBasedOnType").value;

    if (carNumber == '' || driverName == '' || location == '' || type == '' || cost =='')
    {
        document.getElementById('addedCarContent').innerHTML = 'please fill the columns' + "<br/>"
    }
    else{
        if (carNumber in carDetails) {
            document.getElementById('addedCarContent').innerHTML = 'car number already present' + '<br/>'
        }
        else{
            var addCarCheck = true;
        if (!driverName == ''){
            var cars = Object.keys(carDetails)
            for (let i =0;i<cars.length;i++)
            {
                if (driverName == carDetails[cars[i]].driverName)
                {
                    document.getElementById('addedCarContent').innerHTML = 'driver already aloted for car : ' + carDetails[cars[i]].carNumber + "<br/>"
                    addCarCheck = false;
                }
            }
            
        }
        if (addCarCheck) 
        {
            var addedCar = new DetailsOfCab(carNumber,driverName,location,type,cost);
            carDetails[addedCar.carNumber]=addedCar;
            if(location in availabilityOfCar)
            {
               carAvailable = availabilityOfCar[location];
               carAvailable.push(carNumber)
            }
             else{
                var car = [];
                car.push(carNumber);
                availabilityOfCar[location] = car;
             }
             document.getElementById('addedCarContent').innerHTML = 'added successfully' + "<br/>"
        }
        
    
       }
   }
        
    
  
}
function viewingCarDetails()
{
    var number = document.getElementById("enteredNumber").value.toLocaleLowerCase();
    if (number == '')
    {
        document.getElementById("viewingCarContent").innerHTML = 'please enter car number' + '<br/>'
    }
    else{
        if (number in carDetails)
        {
            document.getElementById("viewingCarContent").innerHTML = "car number : " + carDetails[number].carNumber+"<br/>"+ 
        "Driver name : " + carDetails[number].driverName + "<br/>" +
        "location : " + carDetails[number].location+"<br/>"+
        "cost : " + carDetails[number].cost + "<br/>";
        }
        else{
            document.getElementById("viewingCarContent").innerHTML = 'car not available'+"<br/>"
        }
        
    }
  
}

function viewCars(){

    var allCars = Object.keys(carDetails);
    console.log(allCars)
    if (allCars.length>0)
    {
        for(let i =0;i<allCars.length;i++)
        {
            document.getElementById('viewAllCarContent').innerHTML += "car number : " + carDetails[allCars[i]].carNumber + "<br/>"
            + "driver name : "+ carDetails[allCars[i]].driverName + "<br/>" +
            "location : " + carDetails[allCars[i]].location + "<br/>" +
            "cost : " + carDetails[allCars[i]].cost + "<br/>" + "*************" + '<br/>'
        }
    }
    else{
        document.getElementById('viewAllCarContent').innerHTML = "no cars available"
    }
}
function viewingUserDetails()
{
    var users = Object.keys(userDetail);
    if (users.length>0)
    {
        for(let i=0;i<users.length;i++)
        {
           document.getElementById("userContent").innerHTML += "name : "+userDetail[users[i]].name +"<br/>"+ "mobile number : "+ userDetail[users[i]].mobileNumber+" <br/>"
            +"count : "+ userDetail[users[i]].count+"<br/>"
            +"*****************************************" + "<br/>"
        }
    }
    else{
        document.getElementById("userContent").innerHTML = "No users available";
    }
}
//date,time,mail,location,price,car,driverName
function viewingTripDetails(){
    var carNumberTripToBeViewed = document.getElementById("carNumberToBeChecked").value.toLocaleLowerCase();
    if (carNumberTripToBeViewed == '')
    {
        document.getElementById("viewingTripContent").innerHTML  = 'kindly enter car number' + '<br/>'
    }
    else
    {
        var tripListToView = Object.keys(tripDetails);
        if (carNumberTripToBeViewed in carDetails){
            if (tripListToView.length>0){
       
                for(let i =0;i< tripListToView.length;i++)
                {
                    
                    if(tripDetails[tripListToView[i]].car == carNumberTripToBeViewed){
                        document.getElementById("viewingTripContent").innerHTML = "car number : "+tripDetails[tripListToView[i]].car+"<br/> "
                                                                 +"Mail id : "+tripDetails[tripListToView[i]].mail
                                                                 +" <br/> location : "+ tripDetails[tripListToView[i]].location
                                                                 +"<br/> driver name : "+ tripDetails[tripListToView[i]].driverName
                                                                 +"<br/> price : "+tripDetails[tripListToView[i]].price
                                                                 +"<br/> date : "+tripDetails[tripListToView[i]].date
                                                                 +"<br/> time : "+tripDetails[tripListToView[i]].time+" <br/>"
                     }
                }
             }
             else{
                   document.getElementById("viewingTripContent").innerHTML = "no trips" + "<br/>"
                 }
        }
        else{
            document.getElementById("viewingTripContent").innerHTML = 'car not available'+'<br/>'
        }
                
    }
    
}
function driverChange()
{
    var carNumberTOChange = document.getElementById("carNumberForChangingDetails").value.toLocaleLowerCase();
    var newDriverName = document.getElementById('newDriver').value.toLocaleLowerCase();
    if (carNumberTOChange == '' || newDriverName == '')
    {
        document.getElementById("driverChanged").innerHTML = 'please fill the column'+'<br/>'
    }
    else{
        if (carNumberTOChange in carDetails)
        {
            var driverChangeCheck = true;
            if (!newDriverName == ''){
                var cars = Object.keys(carDetails)
                for (let i =0;i<cars.length;i++)
                {
                    if (newDriverName == carDetails[cars[i]].driverName)
                    {
                        document.getElementById('driverChanged').innerHTML = 'driver already aloted for car : ' + carDetails[cars[i]].carNumber + "<br/>"
                        driverChangeCheck = false;
                    }
                }
                
            }
            if (driverChangeCheck)
            {
                carDetails[carNumberTOChange].driverName = newDriverName;
                document.getElementById("driverChanged").innerHTML = "new driver name updated " + '<br/>'
                }
            
            
        }
        else{
            document.getElementById("driverChanged").innerHTML = 'car number entered is not available' + '<br/>'
        }
    }
    
}
function costChange()
{
    var carNumberTOChange = document.getElementById("carNumberForChangingDetails").value.toLocaleLowerCase();
    var newCost = document.getElementById('newCost').value;
    if (carNumberTOChange == '' || newCost == '')
    {
        document.getElementById('costChanged').innerHTML = 'kindly enter all details' + '<br/>'
    }
    else{
        if (carNumberTOChange in carDetails)
        {
            carDetails[carNumberTOChange].cost = newCost;
            document.getElementById('costChanged').innerHTML = "cost updated" + '<br/>'
        }
        else{
            document.getElementById('costChanged').innerHTML = 'car number not present in the list' + '<br/>'
        }
    }
    
}

function driverChangeAdmin()
{
    var driverChangeDivision = document.getElementById("driverChangeDiv");
        if (driverChangeDivision.style.display === "none") {
            driverChangeDivision.style.display = "block";
        } else {
            driverChangeDivision.style.display = "none";
         }
}
function costChangeAdmin()
{
    var costChangeDivision = document.getElementById("costChangeDiv");
        if (costChangeDivision.style.display === "none") {
            costChangeDivision.style.display = "block";
        } else {
            costChangeDivision.style.display = "none";
         }
}

function addingCarAdmin()
{
    var addingCarDivision = document.getElementById("addingCarDiv");
    if (addingCarDivision.style.display === "none") {
            addingCarDivision.style.display = "block";
    } else {
            addingCarDivision.style.display = "none";
    }
    
}
function viewingCarAdmin()
{
    var viewingCarDivision = document.getElementById("viewingCarDiv");
    if (viewingCarDivision.style.display === "none") {
        viewingCarDivision.style.display = "block";
    } else {
        viewingCarDivision.style.display = "none";
} 
}
function viewingUserAdmin()
{
    var viewingUserDivision = document.getElementById("viewingUserDiv");
    if (viewingUserDivision.style.display === "none") {
        viewingUserDivision.style.display = "block";
    } else {
        viewingUserDivision.style.display = "none";
     }
}

function viewingTripAdmin()
{
    var viewingTripDivision = document.getElementById("viewingTripDiv");
        if (viewingTripDivision.style.display === "none") {
            viewingTripDivision.style.display = "block";
        } else {
            viewingTripDivision.style.display = "none";
         }
}
function changingDetailsAdmin()
{
    var changingDetailsDivision = document.getElementById("changingDetailsDiv");
    if (changingDetailsDivision.style.display === "none") {
        changingDetailsDivision.style.display = "block";
    } else {
        changingDetailsDivision.style.display = "none";
     }
}

function viewAllCarAdmin()
{
    var viewingAllCarDivision = document.getElementById("viewingAllCar");
    if (viewingAllCarDivision.style.display === "none") {
        viewingAllCarDivision.style.display = "block";
    } else {
        viewingAllCarDivision.style.display = "none";
     } 
}














