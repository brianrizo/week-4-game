//Global function
$(document).ready(function() {
	var myChar, opponentChar, choices, enemyArray, haveCharacter, haveAttacker, numEnemies, rounds;	//Set Global Variables
	var wins = 0;
	var loses = 0;


//Sets all of the variable values
	function varSet() {		
		myChar;
		opponentChar;

		choices = [];
		enemyArray = [ {
			id: 0,
			name: "Ryu",
			pic: 'assets/images/ryu-combo.gif',
			healthPoints: 150,
			attackPower: 5
		}, {
			id: 1,
			name: "Ken",
			pic: 'assets/images/ken-combo.gif',
			healthPoints: 100,
			attackPower: 25 		
		}, {
			id: 2,
			name: "Bison",
			pic: 'assets/images/bison-combo.gif',
			healthPoints: 120,
			attackPower: 19 
		}, {
			id: 3,
			name: "Akuma",
			pic: 'assets/images/akuma-combo.gif',
			healthPoints: 140,
			attackPower: 9 
		} ];

		haveCharacter = false;
		haveAttacker = false;
		numEnemies = 3;
		rounds = 7;

//Main Section Player Select
		for(var i = 0; i < enemyArray.length; i++) {
			choices += "<div id=" + enemyArray[i].id + " class='btn character text-center' value=" + enemyArray[i].id +
			"><img class='fighters' src=" + enemyArray[i].pic + " alt=" + enemyArray[i].name + "><br> HP: " + enemyArray[i].healthPoints +
			"<br> AP: " + enemyArray[i].attackPower + " </div>";
		}
//Instructions for game
		$("#player-select").html(choices);
		$("#intro").html("Click to choose your fighter");

		$('.hero').remove();
		$('.fighting').remove();
		$('#process').html("");

		attachCharacterOnClick();
	}
//Add players selected to engage in fighting
	function printCharacters() {
		var hero = "<div id=" + enemyArray[myChar].id + " class='btn character text-center hero' value=" + enemyArray[myChar].id +
			"><img class='fighters' src=" + enemyArray[myChar].pic + " alt=" + enemyArray[myChar].name + "><br> HP: " + enemyArray[myChar].healthPoints +
			"<br> AP: " + enemyArray[myChar].attackPower + " </div>";
		var badguy = "<div id=" + enemyArray[opponentChar].id + " class='btn character text-center fighting' value=" + enemyArray[opponentChar].id +
			"><img class='fighters' src=" + enemyArray[opponentChar].pic + " alt=" + enemyArray[opponentChar].name + "><br> HP: " + enemyArray[opponentChar].healthPoints +
			"<br> AP: " + enemyArray[opponentChar].attackPower + " </div>";
		$('#myguy').html(hero);
		$('#enemy').html(badguy);
	}
//Updated notifications for what is happening during the fight
	function process() {
		var description = "You attack " + enemyArray[opponentChar].name + " for " + enemyArray[myChar].attackPower + " damage!<br>" +
			enemyArray[opponentChar].name + " counter attacks for " + enemyArray[opponentChar].attackPower + " damage!<br>" +
			"Your attack power has increased by " + rounds + "!";
		$('#process').html(description);
	}
//Selecting your player
	function attachCharacterOnClick() {
		$('.character').on("click", function(){
			if(!haveCharacter) {	
				myChar = $(this).attr('id');
				$("#myguy").append(this);
				$(this).addClass("hero");

				haveCharacter = true;
				$('#process').html("");
				$("#intro").html("Choose your opponent!");
			}
//You have a player and you're picking your opponent
			else if(!haveAttacker && haveCharacter && myChar !== $(this).attr('id')) {	
				opponentChar = $(this).attr('id');
				$("#enemy").append(this);
				$(this).addClass("fighting");

				haveAttacker = true;
				$('#process').html("");
				$("#intro").html("Keep clicking attack to fight!");
			}
		});
	}

	$('#attack').on("click", function() {
		if(!haveCharacter) {
			$('#process').html("You need to pick your fighter first!");
		}
		else if(!haveAttacker) {
			$('#process').html("Pick who you are fighting!");
		}
		else if(haveCharacter && haveAttacker) {
			rounds++;
			enemyArray[opponentChar].healthPoints  = enemyArray[opponentChar].healthPoints - enemyArray[myChar].attackPower;	//health Them
			enemyArray[myChar].healthPoints = enemyArray[myChar].healthPoints - enemyArray[opponentChar].attackPower;	//Get health


			if(enemyArray[opponentChar].healthPoints < 0) {
				numEnemies--;
				if(numEnemies > 0) {
					$(".fighting").remove();
					$('#process').html("");
					$("#intro").html("Who will you fight next?");
					haveAttacker = false;
				}
				else {
					process();
					alert("You win the match!  Play again!");
					wins++;
					$('#winsloses').html("Overall Wins: " + wins + "&nbsp;&nbsp;Loses: " + loses);
					varSet();
				}
				
			}
			else if(enemyArray[myChar].healthPoints < 0) {
				process();
				alert("Your fighter has been defeated!  Try again!");
				loses++;
				$('#winsloses').html("Overall Wins: " + wins + "&nbsp;&nbsp;Loses: " + loses);
				varSet();
			}
			else {
				process();
				printCharacters();
			}

			enemyArray[myChar].attackPower = enemyArray[myChar].attackPower + rounds;	//Get Stronger
		}
	});

	$('#restart').on("click", function(){
		varSet();
	});

	attachCharacterOnClick();
	varSet();

});