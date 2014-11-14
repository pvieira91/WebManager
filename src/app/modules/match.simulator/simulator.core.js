define(["eventBus"], function(eventBus){

	setTimeout(function(){
		eventBus.subscribe("onPause", function(event, data){

		});
	},1500);


	var _homeTeam = null;
	var _visitorTeam = null;


	var _generator = function(){
		if(_homeTeam=== null || _visitorTeam===null){
			throw new Error("Simulator: Both teams must be defined!");
		}
	};



	var mentalityEnum={
	    defensive:1,
    	normal:2,
    	offensive:3
	};

	var fieldEnum = {
    	ATTACK_A : 1,
    	MIDFIELD: 2,
    	ATTACK_B : 3
	};

	var commentEnum = {
		HOME:1,
		VISITOR:2,
		INFO:3
	};

	var cont = 0;

	var simulator={
	    home: 0.04,
	    strength: 0.9,
	    moral: 0.06
	};

	var _startGame = function(homeTeam, visitorTeam){
    
    	homeTeam.overall = (simulator.home * homeTeam.atributtes.home) * 1 + (simulator.strength * homeTeam.atributtes.strength) + (simulator.moral * homeTeam.atributtes.moral);
    	visitorTeam.overall = (simulator.home * visitorTeam.atributtes.home) * 0 + (simulator.strength * visitorTeam.atributtes.strength) + (simulator.moral * visitorTeam.atributtes.moral);
    
    	var dif= Math.abs(homeTeam.overall-visitorTeam.overall)/20;    
	    var a = (homeTeam.overall/(homeTeam.overall+visitorTeam.overall));
	    var b = (visitorTeam.overall/(homeTeam.overall+visitorTeam.overall));
	        
	    _addComment(commentEnum.HOME,"Começa o jogo.");
	    _launchEvent(fieldEnum.MIDFIELD, homeTeam, visitorTeam);
	    _updateBallPosition(2);
	};

	var _launchEvent = function(field, teamA, teamB){
    
    	var isTeamAHome = teamA.name === _homeTeam.name;

	    if(cont>20){
	    	eventBus.publish("onMatchEnd");
	    	_updateBallPosition(2);
	        return;
	    }
	    cont++;
	    
	    switch(field){
	        case fieldEnum.ATTACK_A:
	            setTimeout(function(){
	            	_eventAttack(teamA,teamB);
	            	_updateBallPosition(isTeamAHome ? 3 : 1);
	            },1000);
	            break;
	        case fieldEnum.ATTACK_B:
	            setTimeout(function(){
	            	_eventAttack(teamB, teamA);
	            	_updateBallPosition(isTeamAHome ? 1 : 3);
	            },1000);
	            break;    
	        case fieldEnum.MIDFIELD:
	            setTimeout(function(){
	            	_eventMidfield(teamA, teamB);
	            	_updateBallPosition(2);
	            },1000);
	            break;
	    };

	};



	function _getOffensiveValueFromMentality(mentality){
	    var value = 0;
	    
	    switch(mentality){
	        case mentalityEnum.defensive:
	            value = 5;
	            break;
	        case mentalityEnum.offensive:
	            value = 17;
	            break;    
	        case mentalityEnum.normal:
	            value = 12;
	            break;
	        default:
	            throw new Error("Simulator: Incorrect value!!");
	    }
	    
	    return value;
	}

	function _getDeffensiveValueFromMentality(mentality){
    	var value = 0;
	    switch(mentality){
	        case mentalityEnum.defensive:
	            value = 17;
	            break;
	        case mentalityEnum.offensive:
	            value = 5;
	            break;    
	        case mentalityEnum.normal:
	            value = 12;
	            break;
	        default:
	            throw new Error("Incorrect value!!");
	    }
	    
	    return value;
	}

	function _eventAttack(teamA, teamB){
   		
   		
   		var isTeamAHome = teamA.name === _homeTeam.name;
	    

	    var teamBQuality = teamB.overall * 0.75;
	    var deffensiveValueFromMentality =_getDeffensiveValueFromMentality(teamB.tactic.mentality);
	    var teamBDefensiveTactic = (teamB.tactic.defensive*(2/4) + deffensiveValueFromMentality*(2/4))*0.25;
	    var teamBGoodEvent = teamBQuality + teamBDefensiveTactic;
	    
	    var teamAQuality = teamA.overall * 0.75;
	    var offensiveValueFromMentality = _getOffensiveValueFromMentality(teamA.tactic.mentality);
	    
	    var teamAAttackingTactic = (teamA.tactic.offensive*(2/4) + offensiveValueFromMentality*(2/4))*0.25;
	    var teamAGoodEvent  = teamAQuality + teamAAttackingTactic;
	    
	    var probTeamA = (teamAGoodEvent/(teamAGoodEvent+teamBGoodEvent)) * 100;
	    var probTeamB = (teamBGoodEvent/(teamAGoodEvent+teamBGoodEvent)) * 100;
	    
	    var random = Math.floor((Math.random() * 100) + 1);
	    
	    if(random<probTeamA){
	        //teamA
	        
	        var newRandom = Math.floor((Math.random() * 100) + 1);
	        
	        if(newRandom<((1/3)*100)){
	            _addComment(	isTeamAHome ? commentEnum.HOME : commentEnum.VISITOR, "Remate para fora.");
	            _launchEvent(fieldEnum.MIDFIELD, teamA, teamB);
	        }
	        else if(newRandom<((2/3)*100)){
	            _addComment(	isTeamAHome ? commentEnum.HOME : commentEnum.VISITOR, "Canto.");
	            _launchEvent(fieldEnum.ATTACK_A, teamA, teamB);
	        }
	        else{
	            _addComment(	isTeamAHome ? commentEnum.HOME : commentEnum.VISITOR, "GOOOOOOLOOOOOOOOO");

	            _addGoal(isTeamAHome ? commentEnum.HOME : commentEnum.VISITOR);
	            _launchEvent(fieldEnum.MIDFIELD, teamA, teamB);
	        }
	    }else{
	        var newRandom = Math.floor((Math.random() * 100) + 1);
	        
	        if(newRandom<((4/10)*100)){
	            //bola continua na defesa
	            
	            _addComment(isTeamAHome ? commentEnum.VISITOR : commentEnum.HOME,"Defendem como podem.");
	           _launchEvent(fieldEnum.ATTACK_A, teamA, teamB);
	            //_eventAttack(teamA, teamB);
	        }
	        else if(newRandom<((9/10)*100)){
	            
	            _addComment(isTeamAHome ? commentEnum.VISITOR : commentEnum.HOME,"Recuperação de bola");
	            _launchEvent(fieldEnum.MIDFIELD, teamA, teamB);
	            //_eventMidfield(teamA, teamB);
	        }
	        else{
	            _addComment(isTeamAHome ? commentEnum.VISITOR : commentEnum.HOME,"Contra ataque perigoso!");
	            _launchEvent(fieldEnum.ATTACK_B, teamA, teamB);
	            //_eventAttack(teamB, teamA);
	        }
	    }
	}

	function _eventMidfield(teamA, teamB){
	    
	    var isTeamAHome = teamA.name === _homeTeam.name;
	    
	    var probTeamA = teamA.overall/(teamA.overall + teamB.overall) * 100;
	    var probTeamB = teamB.overall/(teamA.overall + teamB.overall) * 100;
	    
	     var random = Math.floor((Math.random() * 100) + 1);
	    
	    if(random<probTeamA){
	         //teamA   
	        var newRandom = Math.floor((Math.random() * 100) + 1);
	        //se tactica defensiva + prob de ficar no meio campo
	        //se tactica ofensiva + prob de ir para o ataque ou perder a bola
	        //se tactica normal + prob 
	        var goToAttack = teamA.tactic.attackOverall;
	        var goToMid = teamA.tactic.normalOverall;
	        var goToDefense = teamA.tactic.defenseOverall;
	        
	        var probAttack = (goToAttack) / (goToAttack + goToMid + goToDefense) * 100;
	        var probMid = (goToMid) / (goToAttack + goToMid + goToDefense) * 100;
	        var probDefense = (goToDefense) / (goToAttack + goToMid + goToDefense) * 100;
	        
	        var newRandom = Math.floor((Math.random() * 100) + 1);
	        
	        if(newRandom<probAttack){
	            //attack
	            _addComment(isTeamAHome ? commentEnum.HOME : commentEnum.VISITOR,"Avança para o ataque.");
	            _launchEvent(fieldEnum.ATTACK_A, teamA, teamB);
	        }else if(newRandom>probAttack && newRandom < (probAttack+probMid)){
	            //mid
	            _addComment(isTeamAHome ? commentEnum.HOME : commentEnum.VISITOR,"Mantêm a posse de bola");
	            _launchEvent(fieldEnum.MIDFIELD, teamA, teamB);
	        }
	        else{
	        	_addComment(isTeamAHome ? commentEnum.HOME : commentEnum.VISITOR,"Perderam a bola em zona");
	            _launchEvent(fieldEnum.ATTACK_B, teamA, teamB);
	        }
	        
	        
	    }else{
	         //teamB   
	        var newRandom = Math.floor((Math.random() * 100) + 1);
	        //se tactica defensiva + prob de ficar no meio campo
	        //se tactica ofensiva + prob de ir para o ataque ou perder a bola
	        //se tactica normal + prob 
	        var goToAttack = teamB.tactic.attackOverall;
	        var goToMid = teamB.tactic.normalOverall;
	        var goToDefense = teamB.tactic.defenseOverall;
	        
	        var probAttack = (goToAttack) / (goToAttack + goToMid + goToDefense) * 100;
	        var probMid = (goToMid) / (goToAttack + goToMid + goToDefense) * 100;
	        var probDefense = (goToDefense) / (goToAttack + goToMid + goToDefense) * 100;
	        
	        var newRandom = Math.floor((Math.random() * 100) + 1);
	        
	        if(newRandom<probAttack){
	            //attack
	            _addComment(isTeamAHome ? commentEnum.VISITOR : commentEnum.HOME,"Avança para o ataque.");
	            _launchEvent(fieldEnum.ATTACK_B, teamA, teamB);
	            //_eventAttack(teamB, teamA);
	        }else if(newRandom>probAttack && newRandom < (probAttack+probMid)){
	            //mid
	            _addComment(isTeamAHome ? commentEnum.VISITOR : commentEnum.HOME,"Mantêm a posse de bola.");
	            _launchEvent(fieldEnum.MIDFIELD, teamA, teamB);
	        }
	        else{
	            _addComment(isTeamAHome ? commentEnum.VISITOR : commentEnum.HOME,"Perderam a bola.");
	            _launchEvent(fieldEnum.ATTACK_A, teamA, teamB);
	        }
	        
	    }
	        
	    
	}



	function _addComment(type, text){
		eventBus.publish("newComment", {type: type, text:text})
	};

	function _addGoal(teamType){
		eventBus.publish("onGoal", {teamType:teamType})
	}

	function _updateBallPosition(ballPosition){
		eventBus.publish("onChangeBallPosition", {position:ballPosition});
	}


	return{
		init: function(homeTeam, visitorTeam){
			_homeTeam = homeTeam;
			_visitorTeam = visitorTeam;

			_startGame(_homeTeam, _visitorTeam);
		}
	};

});