document.write('<script src="common.js" type="text/javascript"></script>');
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
        document.getElementById('addedCarContent').innerHTML = 'please fill the columns '
    }
    else{
        if (carNumber in carDetails) {
            document.getElementById('addedCarContent').innerHTML = 'car number already present' 
        }
        else{
            var addCarCheck = true;
        if (!driverName == ''){
            var cars = Object.keys(carDetails)
            for (let i =0;i<cars.length;i++)
            {
                if (driverName == carDetails[cars[i]].driverName)
                {
                    document.getElementById('addedCarContent').innerHTML = 'driver already aloted for car : ' + carDetails[cars[i]].carNumber 
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
             hide('numberOfCar');hide('nameOfDriver');hide('locationOfCar');hide('typeOfCar');hide('costBasedOnType')
             document.getElementById('addedCarContent').innerHTML = 'added successfully'         }
            
    
       }
   }
  
}
function addingCostLocation(){
    var startLocation = document.getElementById('startLoc').value.toLocaleUpperCase();
    var endLocation = document.getElementById('endLoc').value.toLocaleUpperCase();
    var amount = document.getElementById('amount').value;
    var locEntered = startLocation+'-'+endLocation;
    if (startLocation == '' || endLocation == '' || amount == '')
    {
       document.getElementById('costLocationAddContent').innerHTML = 'kindly enter all details' 
    }
    else {
        hide('startLoc');hide('endLoc');hide('amount')
       if (locEntered in costPerLocation)
       {
          costPerLocation[locEntered] = amount;
           document.getElementById('costLocationAddContent').innerHTML = 'location already present' + "<br/>" + "cost updated" 
       }
       else{
           costPerLocation[locEntered] = amount;
           document.getElementById('costLocationAddContent').innerHTML = 'added successfully' 
       }
    }
   
}        


function viewingCarDetails()
{
    var numberEntered = document.getElementById("slct");
    var number = numberEntered.options[numberEntered.selectedIndex].text;

    if (number == '')
    {
        document.getElementById("viewingCarContent").innerHTML = 'please enter car number' 
    }
    else{
        if (number in carDetails)
        {
            hide('select');hide('slct')
            document.getElementById("viewingCarContent").innerHTML = "***********************************************"
                                                                     + "<br/>" + "car number" +"&nbsp &nbsp &nbsp driver name"+ "&nbsp &nbsp &nbsp location" + 
                                                                     "&nbsp &nbsp &nbsp cost" + "<br/>"+ "***********************************************" 
                                                                       +"<br/>" +carDetails[number].carNumber+"&nbsp &nbsp &nbsp"+ 
                                                                       carDetails[number].driverName + "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp" +
                                                                       carDetails[number].location+"&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp"+
                                                                      carDetails[number].cost + "<br/>"+
                                                                      "***********************************************"
        }
        else{
            document.getElementById("viewingCarContent").innerHTML = 'car not available'
        }
        
    }
  
}

function viewCars(){

    var allCars = Object.keys(carDetails);
    console.log(allCars)
    if (allCars.length>0)
    {
        document.getElementById('viewAllCarContent').innerHTML = ''
        document.getElementById('viewAllCarContent').innerHTML += "***********************************************"
                                                                + "<br/>" +"s.no" + "&nbsp &nbsp car number" +"&nbsp &nbsp &nbsp driver name"
                                                                + "&nbsp &nbsp &nbsp location" + 
                                                                "&nbsp &nbsp &nbsp cost" + "<br/>"
                                                                + "***********************************************" +"<br/>" 
        for(let i =0;i<allCars.length;i++)
        {
            let j = i+1
            document.getElementById('viewAllCarContent').innerHTML += j +"&nbsp &nbsp &nbsp &nbsp" +carDetails[allCars[i]].carNumber + "&nbsp &nbsp &nbsp"
                                                                     + carDetails[allCars[i]].driverName + "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp" 
                                                                    + carDetails[allCars[i]].location + "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp" +
                                                                   + carDetails[allCars[i]].cost +  '<br/>'
        }
        document.getElementById('viewAllCarContent').innerHTML+="***********************************************"
    }
    else{
        document.getElementById('viewAllCarContent').innerHTML = ''
        document.getElementById('viewAllCarContent').innerHTML = "no cars available"
    }
}
function viewingCarDetailsOptions(selectedIds){
    var carAvailable = Object.keys(carDetails);
    
    var option = ''
        for (let i = 0; i<carAvailable.length;i++)
        {
            option += '<option value="'+ carAvailable[i] + '">'+carAvailable[i]+"</option>"
        }
           document.getElementById(selectedIds).innerHTML = option;
}

function viewingUserDetails()
{
    var users = Object.keys(userDetail);
    if (users.length>0)
    {
        document.getElementById('userContent').innerHTML = ''
        document.getElementById('userContent').innerHTML += "***********************************"+"<br/>"+ "s.no" + "&nbsp &nbsp &nbsp"+
                                                            "name" + "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp &nbsp &nbsp mobile number"+"&nbsp &nbsp &nbspcount"
                                                           + "<br/>" + "***********************************"+"<br/>"
        for(let i=0;i<users.length;i++)
        {
            let j = i+1
           document.getElementById("userContent").innerHTML += j + "&nbsp &nbsp &nbsp" +
                                                                userDetail[users[i]].name + "&nbsp &nbsp &nbsp"+ userDetail[users[i]].mobileNumber+"&nbsp &nbsp &nbsp"
                                                               + userDetail[users[i]].count+"<br/>"
                                                               
        }
        document.getElementById("userContent").innerHTML += "***********************************"
    }
    else{
        document.getElementById("userContent").innerHTML = "No users available";
    }
}
//date,time,mail,location,price,car,driverName
function viewingTripDetails(){
   
    var carNumberTripToBeViewedEnterd = document.getElementById("slctTrip");
    var carNumberTripToBeViewed = carNumberTripToBeViewedEnterd.options[carNumberTripToBeViewedEnterd.selectedIndex].text;
    if (carNumberTripToBeViewed == '')
    {
        document.getElementById("viewingTripContent").innerHTML  = 'kindly enter car number' 
    }
    else
    {
        hide('carDetailsId');hide('slctTrip')
        var tripListToView = Object.keys(tripDetails);
        if (carNumberTripToBeViewed in carDetails){
            if (tripListToView.length>0){
                
                document.getElementById("viewingTripContent").innerHTML = ''
                document.getElementById("viewingTripContent").innerHTML += "***************************************************************************"+"<br/>"
                                                                           +"s.no" +"&nbsp &nbsp &nbsp car number"+ "&nbsp &nbsp &nbsp mail id"+
                                                                           "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp location"+
                                                                           "&nbsp &nbsp &nbsp driver name"+"&nbsp &nbsp &nbsp price"+ "&nbsp &nbsp &nbsp date"
                                                                           +"&nbsp &nbsp &nbsp time"+"<br/>" + "***************************************************************************"
                                                                           + "<br/>"
                for(let i =0;i< tripListToView.length;i++)
                {
                    let j = i+1
                    if(tripDetails[tripListToView[i]].car == carNumberTripToBeViewed){
                        document.getElementById("viewingTripContent").innerHTML += j +"&nbsp &nbsp &nbsp"+tripDetails[tripListToView[i]].car
                                                                 +"&nbsp &nbsp &nbsp"+tripDetails[tripListToView[i]].mail
                                                                 +"&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp"+ tripDetails[tripListToView[i]].location
                                                                 +"&nbsp &nbsp &nbsp"+ tripDetails[tripListToView[i]].driverName
                                                                 +"&nbsp &nbsp &nbsp"+tripDetails[tripListToView[i]].price
                                                                 +"&nbsp &nbsp &nbsp"+tripDetails[tripListToView[i]].date
                                                                 +"&nbsp &nbsp &nbsp"+tripDetails[tripListToView[i]].time + "<br/>"
                     }
                     document.getElementById("viewingTripContent").innerHTML += "***************************************************************************"
                }
             }
             else{
                document.getElementById("viewingTripContent").innerHTML = ''
                   document.getElementById("viewingTripContent").innerHTML = "no trips" 
                 }
        }
        else{
            document.getElementById("viewingTripContent").innerHTML = 'car not available'
        }
                
    }
    
}
function driverChange()
{
    var carNumberTOChangeEntered  = document.getElementById("changeDetail");
    var carNumberTOChange = carNumberTOChangeEntered.options[carNumberTOChangeEntered.selectedIndex].text;
    var newDriverName = document.getElementById('newDriver').value.toLocaleLowerCase();
    if (carNumberTOChange == '' || newDriverName == '')
    {
        document.getElementById("driverChanged").innerHTML = 'please fill the column'
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
                        document.getElementById('driverChanged').innerHTML = 'driver already aloted for car : ' + carDetails[cars[i]].carNumber 
                        driverChangeCheck = false;
                    }
                }
                
            }
            if (driverChangeCheck)
            {
                hide('newDriver')
                carDetails[carNumberTOChange].driverName = newDriverName;
                document.getElementById("driverChanged").innerHTML = "new driver name updated " 
                }
            
            
        }
        else{
            document.getElementById("driverChanged").innerHTML = 'car number entered is not available'
        }
    }
    
}
function costChange()
{
    var enteredCarNumberTOChange = document.getElementById("changeDetail");
    var carNumberTOChange = enteredCarNumberTOChange.options[enteredCarNumberTOChange.selectedIndex].text;
    var newCost = document.getElementById('newCost').value;
    if (carNumberTOChange == '' || newCost == '')
    {
        document.getElementById('costChanged').innerHTML = 'kindly enter all details' 
    }
    else{
        if (carNumberTOChange in carDetails)
        {
            hide('newCost')
            carDetails[carNumberTOChange].cost = newCost;
            document.getElementById('costChanged').innerHTML = "cost updated" 
        }
        else{
            document.getElementById('costChanged').innerHTML = 'car number not present in the list' 
        }
    }
    
}

