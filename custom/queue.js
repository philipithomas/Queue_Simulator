$("#reset").click(function() {
	$("#output").addClass('hide');
	$("#service_input").val('');
	$("#arrival_input").val('');
	$("#goal_service").val('');

});

$("#simulate").click(function() {
	if ( ($("#service_input").val() != "" ) && ($("#arrival_input").val() != "") && ($("#goal_service").val()!="")){
		
		// There are inputs
		service_input = $("#service_input").val();
		arrival_input = $("#arrival_input").val();
		goal_service = $("#goal_service").val();
		lambda = ( arrival_input / 60 );
		mu = 1/service_input;
		$("#arrival_display").text(arrival_input);
		$("#service_display").text(service_input);
		suggestion = 0;
		for (c=1;c<=8;c++)
		{ 		
			// Reset rows
			$("#row" + c).removeClass('success error warning');

			// Utilization
			rho = lambda / c / mu;

			// Customers in queue
			Pnaught = 0;
			// summation term
			for (n=0;n<c;n++) {
				Pnaught = Pnaught + Math.pow((lambda/mu),n) / factorial(n);
			}
			// Add second term
			Pnaught = Pnaught + Math.pow((lambda/mu),c) * (1/factorial(c)) * (c*mu / (c*mu-lambda));

			// final inverse
			Pnaught = 1/Pnaught;

			// Probabilility L of infinity is greater than c
			Plinf = Math.pow(c*rho,c)*Pnaught/(factorial(c)*(1-rho));
			// Now we calculate L
			// init
			L = c * rho;
			L = L + Math.pow(c*rho, (c+1)) * Pnaught / (c * factorial(c) * Math.pow(1-rho,2));
			L = L + rho * Plinf / (1-rho);
			// L complete

			w = L / lambda;

			wq = w - 1/mu;
			// number in line
			Lq = lambda * wq;



			// Now display all those numbers
			if ( rho >= 1 ) {
				$("#row" + c).addClass("error");
				$("#rho" + c).text('');
				$("#L" + c).text('');
				$("#W" + c).text('');
			}
			else {
				$("#rho" + c).html(Math.round( rho * 100) + "%");
				$("#L" + c).text(Math.round( Lq * 100)/100);
				min = Math.floor( w );
				sec = Math.floor(w%1*60);
				if (sec < 10 && sec>0) {
					// make it pretty
					sec = "0"+sec;
				}
				if (sec == 0) {
					sec = "00";
				}

				$("#dumpbody"+c).html("<div>Servers: " + c + "</div><div>Arrival rate: " + lambda + "</div><div>Service Rate of one server:" + mu + "</div><div>Server utilization: " + rho + "</div><div>Steady-state probability of zero customers in system: " + Pnaught + "</div><div>Avg time in system per customer: " + w + " </div><div>Avg average time in queue per customer: " + wq + "</div><div>Avg number of customers in system: " + L + "</div><div>Avg number of customers in line: " + Lq + "</div>");
				$("#W" + c).text( min+ ":" +sec );
				if ( w > goal_service ) {
					$("#row" + c).addClass('warning');
				}
				else {
					$("#row" + c).addClass('success');	
					if (suggestion == 0) {
						suggestion = c;
					}				
				}
			}
			

		}
		// Now we print the suggestion
			if (suggestion == 0 ) {
				$("#rec_outer").addClass('hidden');

			}else {
				$("#rec_outer").removeClass('hidden');
				$("#recommendation").text(suggestion);

			}

		$("#output").removeClass('hide');
	}
});

function factorial(n)
{
	if (n <= 1) return 1;
	return n*factorial(n-1);
}