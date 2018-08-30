app.service('utilities', function() {
    this.trim = (str)=> {
        return str.replace(/^\s+|\s+$/g, "");
    };

    this.eliminateSpace = (str)=> {
    	return str.replace(/\s+/g, "");
    };

    this.validarFecha = (fecha)=> {
    	var fechaValidada = fecha.toISOString().match(/\d{4}[-/]((0\d)|(1[0-2]))[-/](([0-2]\d)|(3[0-1]))/g);
    	return fechaValidada[0];
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
    		return "0000-00-00 00:00:00";
    	}
    }
});