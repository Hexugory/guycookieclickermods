Game.registerMod("effcalc",{
	init:function(){
		//this function is called as soon as the mod is registered
		//declare hooks here
		
		//writing mods for Cookie Clicker may require a decent understanding of javascript.
		//dig around in the game files and look for "main.js", almost the entire source code is in there including further mod hook instructions and more examples! search for "MODDING API".
		
		//we declare "MOD" as a proxy for "this", since inside other functions and events "this" no longer refers to this mod but to the functions or events themselves!
		let MOD=this;
		
		Game.registerHook('logic',function(){
			if (Game.onMenu=='stats') {
				if (!l('effuck')) {
					l('menu').insertAdjacentHTML('beforeend','<div id="effuck"></div>');
				}
				
                const efficiencyCalculation = [];

                for (const i in Game.Objects)
				{
					const me=Game.Objects[i];
                    if (me.locked) continue;
					const thisCps = (me.storedTotalCps/me.amount) ? (me.storedTotalCps/me.amount) : me.storedCps;
					efficiencyCalculation.push({
						name: me.name,
						cpspc: ((thisCps*Game.globalCpsMult)/me.price)
					});
				}

				efficiencyCalculation.sort(function(a, b) {
					return b.cpspc - a.cpspc;
				});

                let efficiencyStr = '<div class="subsection">'+
                '<div class="title">Efficiency</div>';
				
                for (const i of efficiencyCalculation) {
                    efficiencyStr += '<div class="listing"><b>'+i.name+' :</b> '+i.cpspc+'</div>';
                };

                efficiencyStr += '</div>'
				
				l('effuck').innerHTML = efficiencyStr;
			}
		});
	}
});