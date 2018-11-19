app.service('utilities', function() {
    this.trim = (str)=> {
        return str.replace(/^\s+|\s+$/g, "");
    };

    this.eliminateSpace = (str)=> {
    	return str.replace(/\s+/g, "");
    };

    this.eliminateMultipleSpaces = (str)=> {
      return str.replace(/\s{2,}/g, " ");
    };

    this.validarFecha = (fecha)=> {
        var date = new Date(fecha);
        var dateTime = date.toLocaleString('es-GB');
        dateTime = this.formatearFechaActual(dateTime);
        var onlyDate = dateTime.split(' ')[0];
    	return onlyDate;
    };

    this.formatearFechaActual = (fecha)=> {
    	return fecha.replace(/\//g, "-");
    };

    this.formatearFechaPersonalizada = (fecha, hora, minutos, tipoHora)=> {
    	var fechaFormateada = this.validarFecha(fecha);
    	var horaAparente = parseInt(hora, 10);
    	if(tipoHora == "am"){
    		var horaReal;
    		if(horaAparente == 12) horaReal = 0;
    		else horaReal = horaAparente;
    		var fechaTotal = fechaFormateada + " " + horaReal + ":" + minutos + ":00";
    		return fechaTotal;
    	}else if(tipoHora == "pm") {
    		var horaReal;
    		if(horaAparente < 12) horaReal = horaAparente + 12;
    		else horaReal = 12;
    		var fechaTotal = fechaFormateada + " " + horaReal + ":" + minutos + ":00";
    		return fechaTotal;
    	}else {
    		return "00-00-0000 00:00:00";
    	}
    }

    this.getAllUrlParams = (url)=> {
  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  // we'll store the parameters here
  var obj = {};
  // if query string exists
  if (queryString) {
    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}

});