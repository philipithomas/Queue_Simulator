$("#reset").click(function() {
	$("#output").addClass('hide');
	$("#service_input").val('');
	$("#arrival_input").val('');

});

$("#simulate").click(function() {
	if ( ($("#service_input").val() != "" ) && ($("#arrival_input").val() != "")){
		
		// There are inputs
		service_input = $("#service_input").val();
		arrival_input = $("#arrival_input").val();
		lambda = arrival_input / 60;
		mu = service_input;
		$("#arrival_display").text(arrival_input);
		$("#service_display").text(service_input);

		for (c=1;c<=8;c++)
		{ 		
			// Utilization
			rho = lambda / c / mu;
			if ( rho > 1 ) {
				rho = 1;
			}

			$("#rho" + c).text(Math.round( rho * 100) + "%");

			if ( rho == 1) {
				$("#row" + c).addClass('error');
			}

			// Customers in queue

		}
		$("#output").removeClass('hide');

	}


});