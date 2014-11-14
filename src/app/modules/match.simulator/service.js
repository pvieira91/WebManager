define(['simulatorCore'], function(simulatorCore){

	var mentalityEnum={
	    defensive:1,
    	normal:2,
    	offensive:3
	};

	var teamB = {
	    name:"SL Benfica",
	    atributtes:{
	        home: 20,
	        strength: 16,
	        moral:17
	    },
	    tactic:{
	        defensive:12,
	        offensive:16,
	        mentality: mentalityEnum.offensive,
	        attackOverall:12,
	        defenseOverall:3,
	        normalOverall: 5,
	        onChange:function(){
	            alert("Recalculate tactics");
	        }
	    },
	    overall:1
	};

	var teamA = {
	    name:"FC Porto",
	    atributtes:{
	        home: 15,
	        strength: 18,
	        moral:18,
	        mentality: mentalityEnum.attacking
	    },
	    tactic:{
	        defensive:12,
	        offensive:16,
	        mentality: mentalityEnum.offensive,
	        attackOverall:12,
	        defenseOverall:3,
	        normalOverall: 5,
	        onChange:function(){
	            alert("Recalculate tactics");
	        }
	    },
	    overall:1
	};

	var _service = function(){

		return {
			homeTeam:teamA,
			visitorTeam:teamB
		};

	};

	return{
		initialize: function(app){
			app.factory("MatchSimulatorService", _service);
			setTimeout(function(){
				simulatorCore.init(teamA, teamB);
			},1000);
		}
	}
})