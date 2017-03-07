'use strict';

// Gives superpowers to array
function composiveArray () {
  this.init = function () {
    this.array = new Array();
  }
  this.init();
}

// Insert in specific position
composiveArray.prototype.insert = function (index, item) {
  this.array.splice(index, 0, item);
  return this;
}

// clear array
composiveArray.prototype.clear = function() {
  while (this.array.length) {
    this.array.pop();
  }
  return this;
}

// return the integer values from array
composiveArray.prototype.filterInt = function() {
  this.array=this.array.filter(function(e,i){return e%1 === 0;})
}

// get the max value from array
composiveArray.prototype.max = function(){
  this.filterInt();
  return Math.max.apply(Math, this.array);
}

// get the min value from array
composiveArray.prototype.min = function() {
  this.filterInt();
  return Math.min.apply(Math, this.array);
}

// create range array with start and size and can set item for all array
composiveArray.prototype.range = function(start=0, size,  item) {
  while(this.array.length < size) {
    var child = typeof item=='undefined' ? this.array.length : item;
    this.array.push(child);
  }
  this.array = this.array.slice(start);
  return this;
}

// create random array with between min and max with size given
composiveArray.prototype.randomArray = function(min, max, size){
  while(this.array.length < size){
    var value = max < 1 ? Math.random()*(max-min)+min : Math.floor(Math.random()*(max-min))+min;
    this.array.push(value);
  }
  return this;
}

//  set existent array for can use all function of composiveArray
composiveArray.prototype.setArray = function(externalArray){
  this.clear();
  for (var i = 0; i < externalArray.length; i++) {
    this.array.push(externalArray[i]);
  }
  return this;
}


// custom array for time series
composiveArray.prototype.timeArray = function(type, start, size, toString) {
    // Types availables in type
    // seconds, minutes, hours, days on week, months

    // Arrays for change months and days to string
    var days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    // Suffix elements for seconds, minutes and hours
    var suffix = {seconds:' seg', minutes:' min', hours:':00' }
    var types = { seconds:60, minutes:60, hours:24, dow:7, months:12 }

    // Set base array for type
    this.type = typeof types[type]=='undefined' ? 'hours' : type;
    this.timeArray = new composiveArray();
    this.timeArray.range(types[type]);

    // add elements with the index of this array
    // for example wod 0 to 6 repeat from start to size this array
    var typeLength = this.timeArray.array.length;
    var safeStart = start>typeLength ? 0 : start;
    for (var i = safeStart; i < safeStart+size; i++) {
      var current = i<typeLength ? i : i%typeLength;
      if (toString) {
        if (this.type == 'days') { current = days[current]}
        else if (this.type == 'months') { current = months[current]}
        else {current += suffix[this.type]}
      }
      this.array.push(current);
    }
    return this;
}
