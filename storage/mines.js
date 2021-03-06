/*

    type: MINE TYPE
    kgps: KG/s mined at level 1
    upcost: Cost to upgrade level 1 -> 2
    rarity: 1 LOWEST, 5 HIGHEST (6 SUPER)

    1 -> Around $1000/s
    2 -> Around $8000/s
    3 -> Around $20,000/s
    4 -> Around $50,000/s
    5 -> Around $100,000/s
    6 -> Around $500,000/s

    Level 1-2 Upgrade = cost of 2 minutes of kgps
    Increases by 5% (iterative) every level up (2 d.p.)

    Level 1 backpack - 10 seconds worth of kg
    Increases by 2.5% (iterative) every level up (2 d.p.)

    Max level -> 250

    Prestige info: (100th prestige to rebirth)
    - Increases kgps by 3.5% per prestige
    - Increases backpack size 2% per prestige

    Rebirth info:
    - Must have all 5 mines at prestige 100 level 250
    - Increases kgps by 5% per rebirth
    - Increases backpack size by 5% per rebirth
    - 50% more points awarded

*/
module.exports = [
   {
      type: "Hydrogen",
      rarity: 3,
      ppk: 14,
      kgps: 1428.57
   },
   {
      type: "Lithium",
      rarity: 1,
      ppk: 18,
      kgps: 55.56
   },
   {
      type: "Sodium",
      rarity: 1,
      ppk: 15,
      kgps: 66.67
   },
   {
      type: "Potassium",
      rarity: 2,
      ppk: 650,
      kgps: 12.31
   },
   {
      type: "Rubidium",
      rarity: 2,
      ppk: 2500,
      kgps: 3.2
   },
   {
      type: "Cesium",
      rarity: 3,
      ppk: 11000,
      kgps: 1.82
   },
   {
      type: "Francium",
      rarity: 6,
      ppk: 35000000,
      kgps: 0.01
   },
   {
      type: "Beryllium",
      rarity: 3,
      ppk: 7480,
      kgps: 2.67
   },
   {
      type: "Magnesium",
      rarity: 1,
      ppk: 6,
      kgps: 166.67
   },
   {
      type: "Calcium",
      rarity: 2,
      ppk: 200,
      kgps: 40
   },
   {
      type: "Strontium",
      rarity: 4,
      ppk: 1000,
      kgps: 50
   },
   {
      type: "Barium",
      rarity: 1,
      ppk: 100,
      kgps: 10
   },
   {
      type: "Radium",
      rarity: 5,
      ppk: 5000000,
      kgps: 0.02
   },
   {
      type: "Scandium",
      rarity: 3,
      ppk: 10000,
      kgps: 2
   },
   {
      type: "Yttrium",
      rarity: 4,
      ppk: 40,
      kgps: 1250
   },
   {
      type: "Titanium",
      rarity: 4,
      ppk: 10,
      kgps: 5000
   },
   {
      type: "Zirconium",
      rarity: 2,
      ppk: 1570,
      kgps: 5.1
   },
   {
      type: "Hafnium",
      rarity: 5,
      ppk: 1200,
      kgps: 83.33
   },
   {
      type: "Rutherfordium",
      rarity: 5,
      ppk: 5000000,
      kgps: 0.02
   },
   {
      type: "Vanadium",
      rarity: 1,
      ppk: 14,
      kgps: 71.43
   },
   {
      type: "Niobium",
      rarity: 1,
      ppk: 100,
      kgps: 10
   },
   {
      type: "Tantalum",
      rarity: 1,
      ppk: 140,
      kgps: 7.14
   },
   {
      type: "Dubnium",
      rarity: 5,
      ppk: 5000000,
      kgps: 0.02
   },
   {
      type: "Chromium",
      rarity: 3,
      ppk: 10,
      kgps: 2000
   },
   {
      type: "Molybdenum",
      rarity: 2,
      ppk: 30,
      kgps: 266.67
   },
   {
      type: "Tungsten",
      rarity: 1,
      ppk: 40,
      kgps: 25
   },
   {
      type: "Seaborgium",
      rarity: 5,
      ppk: 10000000,
      kgps: 0.01
   },
   {
      type: "Manganese",
      rarity: 1,
      ppk: 1.5,
      kgps: 666.67
   },
   {
      type: "Technetium",
      rarity: 4,
      ppk: 5000000,
      kgps: 0.01
   },
   {
      type: "Rhenium",
      rarity: 3,
      ppk: 100000,
      kgps: 0.2
   },
   {
      type: "Bohrium",
      rarity: 6,
      ppk: 11000000,
      kgps: 0.05
   },
   {
      type: "Iron",
      rarity: 1,
      ppk: 0.04,
      kgps: 25000
   },
   {
      type: "Ruthenium",
      rarity: 2,
      ppk: 8000,
      kgps: 1
   },
   {
      type: "Osmium",
      rarity: 3,
      ppk: 40000,
      kgps: 0.5
   },
   {
      type: "Hassium",
      rarity: 6,
      ppk: 17000000,
      kgps: 0.03
   },
   {
      type: "Cobalt",
      rarity: 2,
      ppk: 50,
      kgps: 160
   },
   {
      type: "Rhodium",
      rarity: 3,
      ppk: 200000,
      kgps: 0.1
   },
   {
      type: "Iridium",
      rarity: 3,
      ppk: 40000,
      kgps: 0.5
   },
   {
      type: "Meitnerium",
      rarity: 6,
      ppk: 17500000,
      kgps: 0.03
   },
   {
      type: "Nickel",
      rarity: 1,
      ppk: 40,
      kgps: 25
   },
   {
      type: "Palladium",
      rarity: 4,
      ppk: 20000,
      kgps: 2.5
   },
   {
      type: "Platinum",
      rarity: 3,
      ppk: 40000,
      kgps: 0.5
   },
   {
      type: "Darmstadtium",
      rarity: 6,
      ppk: 12250000,
      kgps: 0.04
   },
   {
      type: "Copper",
      rarity: 1,
      ppk: 7,
      kgps: 142.86
   },
   {
      type: "Silver",
      rarity: 2,
      ppk: 1000,
      kgps: 8
   },
   {
      type: "Gold",
      rarity: 4,
      ppk: 50000,
      kgps: 1
   },
   {
      type: "Roentgenium",
      rarity: 6,
      ppk: 11500000,
      kgps: 0.04
   },
   {
      type: "Zinc",
      rarity: 2,
      ppk: 3,
      kgps: 2666.67
   },
   {
      type: "Cadmium",
      rarity: 3,
      ppk: 4.5,
      kgps: 4444.45
   },
   {
      type: "Mercury",
      rarity: 2,
      ppk: 58,
      kgps: 137.93
   },
   {
      type: "Copernicium",
      rarity: 6,
      ppk: 16000000,
      kgps: 0.03
   },
   {
      type: "Boron",
      rarity: 3,
      ppk: 11140,
      kgps: 1.8
   },
   {
      type: "Aluminium",
      rarity: 1,
      ppk: 2,
      kgps: 500
   },
   {
      type: "Gallium",
      rarity: 4,
      ppk: 525,
      kgps: 95.24
   },
   {
      type: "Indium",
      rarity: 1,
      ppk: 500,
      kgps: 2
   },
   {
      type: "Thallium",
      rarity: 2,
      ppk: 480,
      kgps: 16.67
   },
   {
      type: "Nihonium",
      rarity: 5,
      ppk: 18250000,
      kgps: 0.01
   },
   {
      type: "Carbon",
      rarity: 1,
      ppk: 24,
      kgps: 41.67
   },
   {
      type: "Silicon",
      rarity: 3,
      ppk: 2.5,
      kgps: 8000
   },
   {
      type: "Germanium",
      rarity: 2,
      ppk: 1200,
      kgps: 6.67
   },
   {
      type: "Tin",
      rarity: 1,
      ppk: 20,
      kgps: 50
   },
   {
      type: "Lead",
      rarity: 2,
      ppk: 3,
      kgps: 2666.67
   },
   {
      type: "Flerovium",
      rarity: 5,
      ppk: 9500000,
      kgps: 0.01
   },
   {
      type: "Nitrogen",
      rarity: 3,
      ppk: 5,
      kgps: 4000
   },
   {
      type: "Liquid Nitrogen",
      rarity: 5,
      ppk: 0.07,
      kgps: 1428571.43
   },
   {
      type: "Phosphorus",
      rarity: 3,
      ppk: 300,
      kgps: 66.67
   },
   {
      type: "Arsenic",
      rarity: 2,
      ppk: 1.5,
      kgps: 5333.34
   },
   {
      type: "Antimony",
      rarity: 1,
      ppk: 6,
      kgps: 166.67
   },
   {
      type: "Bismuth",
      rarity: 2,
      ppk: 25,
      kgps: 320
   },
   {
      type: "Moscovium",
      rarity: 6,
      ppk: 13500000,
      kgps: 0.04
   },
   {
      type: "Oxygen",
      rarity: 4,
      ppk: 3,
      kgps: 16666.67
   },
   {
      type: "Sulfur",
      rarity: 2,
      ppk: 500,
      kgps: 16
   },
   {
      type: "Selenium",
      rarity: 1,
      ppk: 150,
      kgps: 6.67
   },
   {
      type: "Tellurium",
      rarity: 1,
      ppk: 240,
      kgps: 4.17
   },
   {
      type: "Polonium",
      rarity: 6,
      ppk: 16000000,
      kgps: 0.03
   },
   {
      type: "Livermorium",
      rarity: 6,
      ppk: 18000000,
      kgps: 0.02
   },
   {
      type: "Fluorine",
      rarity: 1,
      ppk: 1900,
      kgps: 0.53
   },
   {
      type: "Chlorine",
      rarity: 2,
      ppk: 1.5,
      kgps: 5333.34
   },
   {
      type: "Chlorine Gas",
      rarity: 4,
      ppk: 3.5,
      kgps: 14285.71
   },
   {
      type: "Bromine",
      rarity: 2,
      ppk: 50,
      kgps: 160
   },
   {
      type: "Iodine",
      rarity: 1,
      ppk: 83,
      kgps: 12.05
   },
   {
      type: "Astatine",
      rarity: 3,
      ppk: 1,
      kgps: 20000
   },
   {
      type: "Tennessine",
      rarity: 5,
      ppk: 10255010,
      kgps: 0.01
   },
   {
      type: "Helium",
      rarity: 3,
      ppk: 52,
      kgps: 384.62
   },
   {
      type: "Neon",
      rarity: 1,
      ppk: 330,
      kgps: 3.03
   },
   {
      type: "Argon",
      rarity: 1,
      ppk: 2.5,
      kgps: 400
   },
   {
      type: "Krypton",
      rarity: 3,
      ppk: 330,
      kgps: 60.61
   },
   {
      type: "Xenon",
      rarity: 2,
      ppk: 1200,
      kgps: 6.67
   },
   {
      type: "Radon",
      rarity: 1,
      ppk: 1,
      kgps: 1000
   },
   {
      type: "Oganesson",
      rarity: 6,
      ppk: 16250000,
      kgps: 0.03
   },
   {
      type: "Diamond",
      rarity: 6,
      ppk: 16250000,
      kgps: 0.03
   },
   {
      type: "Emerald",
      rarity: 4,
      ppk: 500000,
      kgps: 0.1
   },
   {
      type: "Steel",
      rarity: 1,
      ppk: 0.1,
      kgps: 10000
   },
   {
      type: "Coal",
      rarity: 1,
      ppk: 38,
      kgps: 26.32
   },
   {
      type: "Charcoal",
      rarity: 1,
      ppk: 1,
      kgps: 1000
   }
];
