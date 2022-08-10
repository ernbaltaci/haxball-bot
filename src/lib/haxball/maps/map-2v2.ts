const map2v2 = () => {
  return `{

		"name" : "Unique Futsal 2v2 Map",
	
		"width" : 420,
	
		"height" : 200,
	
		"spawnDistance" : 180,
	
		"bg" : { "type" : "hockey", "width" : 368, "height" : 171, "kickOffRadius" : 65, "cornerRadius" : 0 },
	
		"vertexes" : [
			/* 0 */ { "x" : -368, "y" : 171, "trait" : "ballArea", "cMask" : ["ball" ], "bCoef" : 1 },
			/* 1 */ { "x" : -368, "y" : 65, "trait" : "ballArea", "cMask" : ["ball" ], "bCoef" : 1 },
			/* 2 */ { "x" : -368, "y" : -65, "trait" : "ballArea", "cMask" : ["ball" ], "bCoef" : 1 },
			/* 3 */ { "x" : -368, "y" : -171, "trait" : "ballArea", "bCoef" : 1, "cMask" : ["ball" ] },
			/* 4 */ { "x" : 368, "y" : 171, "trait" : "ballArea", "cMask" : ["ball" ], "bCoef" : 1 },
			/* 5 */ { "x" : 368, "y" : 65, "trait" : "ballArea", "cMask" : ["ball" ], "bCoef" : 1 },
			/* 6 */ { "x" : 368, "y" : -65, "trait" : "ballArea", "cMask" : ["ball" ], "bCoef" : 1 },
			/* 7 */ { "x" : 368, "y" : -171, "trait" : "ballArea", "cMask" : ["ball" ], "bCoef" : 1 },
			
			/* 8 */ { "x" : 0, "y" : 65, "trait" : "kickOffBarrier" },
			
			/* 9 */ { "x" : 0, "y" : -65, "trait" : "line" },
			
			/* 10 */ { "bCoef" : 0.1, "cMask" : ["ball" ], "trait" : "goalNet", "x" : -384, "y" : -65, "color" : "FFFFFF" },
			/* 11 */ { "bCoef" : 0.1, "cMask" : ["ball" ], "trait" : "goalNet", "x" : 384, "y" : -65, "color" : "FFFFFF" },
			/* 12 */ { "bCoef" : 0.1, "cMask" : ["ball" ], "trait" : "goalNet", "x" : -384, "y" : 65, "color" : "FFFFFF" },
			/* 13 */ { "bCoef" : 0.1, "cMask" : ["ball" ], "trait" : "goalNet", "x" : 384, "y" : 65, "color" : "FFFFFF" },
			
			/* 14 */ { "bCoef" : 1, "trait" : "ballArea", "x" : 368, "y" : 171 },
			/* 15 */ { "bCoef" : 1, "trait" : "ballArea", "x" : 368, "y" : -171 },
			
			/* 16 */ { "bCoef" : 0, "trait" : "line", "x" : 0, "y" : 171 },
			/* 17 */ { "bCoef" : 0, "trait" : "line", "x" : 0, "y" : -171 },
			
			/* 18 */ { "x" : 0, "y" : 65, "trait" : "kickOffBarrier" },
			/* 19 */ { "x" : 0, "y" : -65, "trait" : "kickOffBarrier" },
			
			/* 20 */ { "x" : 377, "y" : -65, "trait" : "line", "cMask" : ["ball" ], "bCoef" : 1, "color" : "007DC7" },
			
			/* 21 */ { "x" : 377, "y" : -171, "trait" : "ballArea", "cMask" : ["ball" ], "bCoef" : 1 },
			
			/* 22 */ { "x" : -377, "y" : -65, "trait" : "line", "cMask" : ["ball" ], "bCoef" : 1, "color" : "EB0202" },
			
			/* 23 */ { "x" : -377, "y" : -171, "trait" : "ballArea", "cMask" : ["ball" ], "bCoef" : 1 },
			
			/* 24 */ { "x" : -377, "y" : 65, "trait" : "line", "cMask" : ["ball" ], "bCoef" : 1, "color" : "EB0202" },
			
			/* 25 */ { "x" : -377, "y" : 171, "trait" : "ballArea", "cMask" : ["ball" ], "bCoef" : 1 },
			
			/* 26 */ { "x" : 377, "y" : 65, "trait" : "line", "cMask" : ["ball" ], "bCoef" : 1, "color" : "007DC7" },
			
			/* 27 */ { "x" : 377, "y" : 171, "trait" : "ballArea", "cMask" : ["ball" ], "bCoef" : 1 },
			
			/* 28 */ { "x" : 0, "y" : 199, "trait" : "kickOffBarrier" },
			/* 29 */ { "x" : 0, "y" : 65, "trait" : "kickOffBarrier" },
			/* 30 */ { "x" : 0, "y" : -65, "trait" : "kickOffBarrier" },
			/* 31 */ { "x" : 0, "y" : -199, "trait" : "kickOffBarrier" }
	
		],
	
		"segments" : [
			{ "v0" : 0, "v1" : 1, "trait" : "ballArea" },
			{ "v0" : 2, "v1" : 3, "trait" : "ballArea" },
			{ "v0" : 4, "v1" : 5, "trait" : "ballArea" },
			{ "v0" : 6, "v1" : 7, "trait" : "ballArea" },
			
			{ "v0" : 8, "v1" : 9, "trait" : "kickOffBarrier", "curve" : 180, "cGroup" : ["blueKO" ] },
			{ "v0" : 8, "v1" : 9, "trait" : "kickOffBarrier", "curve" : -180, "cGroup" : ["redKO" ] },
			
			{ "vis" : true, "bCoef" : 0.1, "cMask" : ["all" ], "trait" : "goalNet", "v0" : 2, "v1" : 10, "color" : "FFFFFF", "curve" : -35 },
			{ "vis" : true, "bCoef" : 0.1, "cMask" : ["all" ], "trait" : "goalNet", "v0" : 6, "v1" : 11, "color" : "FFFFFF", "curve" : 35 },
			{ "vis" : true, "bCoef" : 0.1, "cMask" : ["all" ], "trait" : "goalNet", "v0" : 1, "v1" : 12, "color" : "FFFFFF", "curve" : 35 },
			{ "vis" : true, "bCoef" : 0.1, "cMask" : ["all" ], "trait" : "goalNet", "v0" : 5, "v1" : 13, "color" : "FFFFFF", "curve" : -35 },
			{ "vis" : true, "bCoef" : 0.1, "cMask" : ["ball" ], "trait" : "goalNet", "v0" : 10, "v1" : 12, "x" : -585, "color" : "FFFFFF", "curve" : -35 },
			{ "vis" : true, "bCoef" : 0.1, "cMask" : ["ball" ], "trait" : "goalNet", "v0" : 11, "v1" : 13, "x" : 585, "color" : "FFFFFF", "curve" : 35 },
			
			{ "vis" : true, "color" : "FFFFFF", "bCoef" : 1, "trait" : "ballArea", "v0" : 1, "v1" : 0, "cMask" : ["ball" ], "x" : -368 },
			{ "vis" : true, "color" : "FFFFFF", "bCoef" : 1, "trait" : "ballArea", "v0" : 5, "v1" : 4, "cMask" : ["ball" ], "x" : 368 },
			{ "vis" : true, "color" : "FFFFFF", "bCoef" : 1, "trait" : "ballArea", "v0" : 2, "v1" : 3, "cMask" : ["ball" ], "x" : -368 },
			{ "vis" : true, "color" : "FFFFFF", "bCoef" : 1, "trait" : "ballArea", "v0" : 6, "v1" : 7, "cMask" : ["ball" ], "x" : 368 },
			{ "vis" : true, "color" : "FFFFFF", "bCoef" : 1, "trait" : "ballArea", "v0" : 0, "v1" : 14, "y" : 171 },
			{ "vis" : true, "color" : "FFFFFF", "bCoef" : 1, "trait" : "ballArea", "v0" : 3, "v1" : 15, "y" : -171 },
			
			{ "curve" : 0, "vis" : true, "color" : "FFFFFF", "bCoef" : 0, "trait" : "line", "v0" : 16, "v1" : 17 },
			{ "curve" : -180, "vis" : true, "color" : "FFFFFF", "bCoef" : 0, "trait" : "line", "v0" : 9, "v1" : 8 },
			{ "curve" : 180, "vis" : true, "color" : "FFFFFF", "bCoef" : 0, "trait" : "line", "v0" : 19, "v1" : 18 },
			{ "curve" : 0, "vis" : true, "color" : "FFFFFF", "bCoef" : 0, "trait" : "line", "v0" : 2, "v1" : 1 },
			{ "curve" : 0, "vis" : true, "color" : "FFFFFF", "bCoef" : 0, "trait" : "line", "v0" : 6, "v1" : 5 },
			
			{ "vis" : false, "color" : "FFFFFF", "bCoef" : 1, "trait" : "ballArea", "v0" : 20, "v1" : 21, "cMask" : ["ball" ], "x" : 330 },
			{ "vis" : false, "color" : "FFFFFF", "bCoef" : 1, "trait" : "ballArea", "v0" : 22, "v1" : 23, "cMask" : ["ball" ], "x" : -330, "curve" : 0 },
			{ "vis" : false, "color" : "FFFFFF", "bCoef" : 1, "trait" : "ballArea", "v0" : 24, "v1" : 25, "cMask" : ["ball" ], "x" : -330 },
			{ "vis" : false, "color" : "FFFFFF", "bCoef" : 1, "trait" : "ballArea", "v0" : 26, "v1" : 27, "cMask" : ["ball" ], "x" : 330 },
			
			{ "v0" : 28, "v1" : 29, "trait" : "kickOffBarrier" },
			{ "v0" : 30, "v1" : 31, "trait" : "kickOffBarrier" }
	
		],
	
		"goals" : [
			{ "p0" : [-370,-62 ], "p1" : [-370,68 ], "team" : "red" },
			{ "p0" : [370,65 ], "p1" : [370,-65 ], "team" : "blue" }
	
		],
	
		"discs" : [
			{ "pos" : [-368,65 ], "trait" : "goalPost", "color" : "FFFFFF", "radius" : 5 },
			{ "pos" : [-368,-65 ], "trait" : "goalPost", "color" : "FFFFFF", "radius" : 5 },
			{ "pos" : [368,65 ], "trait" : "goalPost", "color" : "FFFFFF", "radius" : 5 },
			{ "pos" : [368,-65 ], "trait" : "goalPost", "color" : "FFFFFF", "radius" : 5 }
	
		],
	
		"planes" : [
			{ "normal" : [0,1 ], "dist" : -171, "trait" : "ballArea" },
			{ "normal" : [0,-1 ], "dist" : -171, "trait" : "ballArea" },
			
			{ "normal" : [0,1 ], "dist" : -200, "bCoef" : 0.2, "cMask" : ["all" ] },
			{ "normal" : [0,-1 ], "dist" : -200, "bCoef" : 0.2, "cMask" : ["all" ] },
			{ "normal" : [1,0 ], "dist" : -420, "bCoef" : 0.2, "cMask" : ["all" ] },
			{ "normal" : [-1,0 ], "dist" : -420, "bCoef" : 0.2, "cMask" : ["all" ] }
	
		],
	
		"traits" : {
			"ballArea" : { "vis" : false, "bCoef" : 1, "cMask" : ["ball" ] },
			"goalPost" : { "radius" : 8, "invMass" : 0, "bCoef" : 1 },
			"goalNet" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["all" ] },
			"kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] },
			"line" : { "vis" : true, "bCoef" : 0, "cMask" : ["" ] },
			"arco" : { "radius" : 2, "cMask" : ["n/d" ], "color" : "cccccc" }
	
		},
	
		"playerPhysics" : {
			"acceleration" : 0.12,
			"kickingAcceleration" : 0.1,
			"kickStrength" : 8
	
		},
	
		"ballPhysics" : {
			"radius" : 6.5,
			"color" : "FFF70F"
	
		}
	}`;
};

export default map2v2