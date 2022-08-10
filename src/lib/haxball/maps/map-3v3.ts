const map3v3 = () => {
  return `{

	"name" : "Unique 3v3 Maps",

	"width" : 600,

	"height" : 270,

	"spawnDistance" : 350,

	"bg" : { "type" : "hockey", "width" : 550, "height" : 240, "kickOffRadius" : 80, "cornerRadius" : 0, "color" : "" },

	"vertexes" : [
		/* 0 */ { "x" : -550, "y" : 240, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "BEBEBE" },
		/* 1 */ { "x" : -550, "y" : 80, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "EB0202" },
		/* 2 */ { "x" : -550, "y" : -80, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "EB0202" },
		/* 3 */ { "x" : -550, "y" : -240, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "BEBEBE" },
		/* 4 */ { "x" : 550, "y" : 240, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "BEBEBE" },
		/* 5 */ { "x" : 550, "y" : 80, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "007DC7" },
		/* 6 */ { "x" : 550, "y" : -80, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "007DC7" },
		/* 7 */ { "x" : 550, "y" : -240, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "BEBEBE" },
		
		/* 8 */ { "x" : 0, "y" : 270, "trait" : "kickOffBarrier" },
		/* 9 */ { "x" : 0, "y" : 80, "trait" : "kickOffBarrier", "color" : "BEBEBE" },
		
		/* 10 */ { "x" : 0, "y" : -80, "trait" : "line", "color" : "BEBEBE" },
		
		/* 11 */ { "x" : 0, "y" : -270, "trait" : "kickOffBarrier" },
		
		/* 12 */ { "x" : -580, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball" ], "trait" : "goalNet", "color" : "EB0202" },
		/* 13 */ { "x" : 580, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball" ], "trait" : "goalNet", "color" : "007DC7" },
		/* 14 */ { "x" : -580, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball" ], "trait" : "goalNet", "color" : "EB0202" },
		/* 15 */ { "x" : 580, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball" ], "trait" : "goalNet", "color" : "007DC7" },
		
		/* 16 */ { "x" : -550, "y" : -150, "trait" : "line", "curve" : 0, "color" : "BEBEBE" },
		/* 17 */ { "x" : -400, "y" : -150, "trait" : "line", "curve" : 0, "color" : "BEBEBE" },
		/* 18 */ { "x" : 550, "y" : -150, "trait" : "line", "curve" : 0, "color" : "BEBEBE" },
		/* 19 */ { "x" : 400, "y" : -150, "trait" : "line", "curve" : 0, "color" : "BEBEBE" },
		/* 20 */ { "x" : -550, "y" : 150, "trait" : "line", "curve" : 0, "color" : "BEBEBE" },
		/* 21 */ { "x" : -400, "y" : 150, "trait" : "line", "curve" : 0, "color" : "BEBEBE" },
		/* 22 */ { "x" : 550, "y" : 150, "trait" : "line", "curve" : 0, "color" : "BEBEBE" },
		/* 23 */ { "x" : 400, "y" : 150, "trait" : "line", "curve" : 0, "color" : "BEBEBE" },
		
		/* 24 */ { "x" : 550, "y" : 240, "bCoef" : 1, "trait" : "ballArea", "color" : "BEBEBE" },
		/* 25 */ { "x" : 550, "y" : -240, "bCoef" : 1, "trait" : "ballArea", "color" : "BEBEBE" },
		
		/* 26 */ { "x" : 0, "y" : 240, "bCoef" : 0, "trait" : "line", "color" : "BEBEBE" },
		/* 27 */ { "x" : 0, "y" : -240, "bCoef" : 0, "trait" : "line", "color" : "BEBEBE" },
		
		/* 28 */ { "x" : 0, "y" : 80, "trait" : "kickOffBarrier", "color" : "BEBEBE" },
		/* 29 */ { "x" : 0, "y" : -80, "trait" : "kickOffBarrier", "color" : "BEBEBE" },
		
		/* 30 */ { "x" : 559, "y" : -80, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "line" },
		
		/* 31 */ { "x" : 559, "y" : -240, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },
		
		/* 32 */ { "x" : -559, "y" : -80, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "line", "color" : "FFD700" },
		
		/* 33 */ { "x" : -559, "y" : -240, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },
		
		/* 34 */ { "x" : -559, "y" : 80, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "line", "color" : "FFD700" },
		
		/* 35 */ { "x" : -559, "y" : 240, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },
		
		/* 36 */ { "x" : 559, "y" : 80, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "line", "color" : "007DC7" },
		
		/* 37 */ { "x" : 559, "y" : 240, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },
		
		/* 38 */ { "x" : 400, "y" : -60, "bCoef" : 0, "trait" : "line", "curve" : -180, "color" : "BEBEBE" },
		/* 39 */ { "x" : 400, "y" : 60, "bCoef" : 0, "trait" : "line", "curve" : -180, "color" : "BEBEBE" },
		/* 40 */ { "x" : -400, "y" : -60, "bCoef" : 0, "trait" : "line", "curve" : 180, "color" : "BEBEBE" },
		/* 41 */ { "x" : -400, "y" : 60, "bCoef" : 0, "trait" : "line", "curve" : 180, "color" : "BEBEBE" },
		/* 42 */ { "x" : 250, "y" : -240, "bCoef" : 0, "trait" : "line", "curve" : 0, "color" : "FFFFFF" },
		/* 43 */ { "x" : 250, "y" : 240, "bCoef" : 0, "trait" : "line", "curve" : 0, "color" : "FFFFFF" },
		/* 44 */ { "x" : -250, "y" : -240, "bCoef" : 0, "trait" : "line", "color" : "FFFFFF" },
		/* 45 */ { "x" : -250, "y" : 240, "bCoef" : 0, "trait" : "line", "color" : "FFFFFF" }

	],

	"segments" : [
		{ "v0" : 0, "v1" : 1, "trait" : "ballArea" },
		{ "v0" : 2, "v1" : 3, "trait" : "ballArea" },
		{ "v0" : 4, "v1" : 5, "trait" : "ballArea" },
		{ "v0" : 6, "v1" : 7, "trait" : "ballArea" },
		
		{ "v0" : 8, "v1" : 9, "trait" : "kickOffBarrier" },
		{ "v0" : 9, "v1" : 10, "curve" : 180, "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier" },
		{ "v0" : 9, "v1" : 10, "curve" : -180, "cGroup" : ["redKO" ], "trait" : "kickOffBarrier" },
		{ "v0" : 10, "v1" : 11, "trait" : "kickOffBarrier" },
		
		{ "v0" : 2, "v1" : 12, "curve" : -35, "vis" : true, "color" : "EB0202", "bCoef" : 0.1, "cMask" : ["ball" ], "trait" : "goalNet" },
		{ "v0" : 6, "v1" : 13, "curve" : 35, "vis" : true, "color" : "007DC7", "bCoef" : 0.1, "cMask" : ["ball" ], "trait" : "goalNet" },
		{ "v0" : 1, "v1" : 14, "curve" : 35, "vis" : true, "color" : "EB0202", "bCoef" : 0.1, "cMask" : ["ball" ], "trait" : "goalNet" },
		{ "v0" : 5, "v1" : 15, "curve" : -35, "vis" : true, "color" : "007DC7", "bCoef" : 0.1, "cMask" : ["ball" ], "trait" : "goalNet" },
		{ "v0" : 12, "v1" : 14, "curve" : -35, "vis" : true, "color" : "EB0202", "bCoef" : 0.1, "cMask" : ["ball" ], "trait" : "goalNet", "x" : -585 },
		{ "v0" : 13, "v1" : 15, "curve" : 35, "vis" : true, "color" : "007DC7", "bCoef" : 0.1, "cMask" : ["ball" ], "trait" : "goalNet", "x" : 585 },
		
		{ "v0" : 16, "v1" : 17, "curve" : 0, "color" : "BEBEBE", "trait" : "line" },
		{ "v0" : 18, "v1" : 19, "curve" : 0, "color" : "BEBEBE", "trait" : "line" },
		{ "v0" : 20, "v1" : 21, "curve" : 0, "color" : "BEBEBE", "trait" : "line" },
		{ "v0" : 22, "v1" : 23, "curve" : 0, "color" : "BEBEBE", "trait" : "line" },
		{ "v0" : 17, "v1" : 21, "curve" : 0, "vis" : true, "color" : "BEBEBE", "bCoef" : 0, "trait" : "line", "x" : -400 },
		{ "v0" : 19, "v1" : 23, "curve" : 0, "vis" : true, "color" : "BEBEBE", "bCoef" : 0, "trait" : "line" },
		
		{ "v0" : 1, "v1" : 0, "vis" : true, "color" : "BEBEBE", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -665 },
		{ "v0" : 5, "v1" : 4, "vis" : true, "color" : "BEBEBE", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 665 },
		{ "v0" : 2, "v1" : 3, "vis" : true, "color" : "BEBEBE", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -665 },
		{ "v0" : 6, "v1" : 7, "vis" : true, "color" : "BEBEBE", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 665 },
		{ "v0" : 0, "v1" : 24, "vis" : true, "color" : "BEBEBE", "bCoef" : 1, "trait" : "ballArea", "y" : 240 },
		{ "v0" : 3, "v1" : 25, "vis" : true, "color" : "BEBEBE", "bCoef" : 1, "trait" : "ballArea", "y" : -240 },
		
		{ "v0" : 26, "v1" : 27, "curve" : 0, "vis" : true, "color" : "BEBEBE", "bCoef" : 0, "trait" : "line" },
		{ "v0" : 10, "v1" : 9, "curve" : -180, "vis" : true, "color" : "BEBEBE", "bCoef" : 0, "trait" : "line" },
		{ "v0" : 29, "v1" : 28, "curve" : 180, "vis" : true, "color" : "BEBEBE", "bCoef" : 0, "trait" : "line" },
		{ "v0" : 2, "v1" : 1, "curve" : 0, "vis" : true, "color" : "BEBEBE", "bCoef" : 0, "trait" : "line" },
		{ "v0" : 6, "v1" : 5, "curve" : 0, "vis" : true, "color" : "BEBEBE", "bCoef" : 0, "trait" : "line" },
		
		{ "v0" : 30, "v1" : 31, "vis" : false, "color" : "FFFFFF", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 559 },
		{ "v0" : 32, "v1" : 33, "vis" : false, "color" : "FFFFFF", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -559 },
		{ "v0" : 34, "v1" : 35, "vis" : false, "color" : "FFFFFF", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -559 },
		{ "v0" : 36, "v1" : 37, "vis" : false, "color" : "FFFFFF", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 559 },
		
		{ "v0" : 38, "v1" : 39, "curve" : -180, "vis" : true, "color" : "BEBEBE", "bCoef" : 0, "trait" : "line" },
		{ "v0" : 40, "v1" : 41, "curve" : 180, "vis" : true, "color" : "BEBEBE", "bCoef" : 0, "trait" : "line" },
		{ "v0" : 42, "v1" : 43, "curve" : 0, "vis" : true, "color" : "FFFFFF", "bCoef" : 0, "trait" : "line" },
		{ "v0" : 44, "v1" : 45, "curve" : 0, "vis" : true, "color" : "FFFFFF", "bCoef" : 0, "trait" : "line" }

	],

	"goals" : [
		{ "p0" : [-555,-80 ], "p1" : [-555,80 ], "team" : "red" },
		{ "p0" : [555,80 ], "p1" : [555,-80 ], "team" : "blue" }

	],

	"discs" : [
		{ "radius" : 5, "pos" : [-550,80 ], "color" : "FFFFFF", "trait" : "goalPost" },
		{ "radius" : 5, "pos" : [-550,-80 ], "color" : "FFFFFF", "trait" : "goalPost" },
		{ "radius" : 5, "pos" : [550,80 ], "color" : "FFFFFF", "trait" : "goalPost" },
		{ "radius" : 5, "pos" : [550,-80 ], "color" : "FFFFFF", "trait" : "goalPost" }

	],

	"planes" : [
		{ "normal" : [0,1 ], "dist" : -240, "trait" : "ballArea" },
		{ "normal" : [0,-1 ], "dist" : -240, "trait" : "ballArea" },
		
		{ "normal" : [0,1 ], "dist" : -270, "bCoef" : 0.2, "cMask" : ["all" ] },
		{ "normal" : [0,-1 ], "dist" : -270, "bCoef" : 0.2, "cMask" : ["all" ] },
		{ "normal" : [1,0 ], "dist" : -600, "bCoef" : 0.2, "cMask" : ["all" ] },
		{ "normal" : [-1,0 ], "dist" : -600, "bCoef" : 0.2, "cMask" : ["all" ] }

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
		"acceleration" : 0.13,
		"kickingAcceleration" : 0.1,
		"kickStrength" : 8

	},

	"ballPhysics" : {
		"radius" : 6.5,
		"color" : "FFF70F"

	},

	"joints" : [
		

	],

	"redSpawnPoints" : [
		

	],

	"blueSpawnPoints" : [
		

	],

	"canBeStored" : false
}`;
};

export default map3v3;
