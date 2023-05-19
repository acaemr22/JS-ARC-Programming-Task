// known materials and their properties stored in a js array
let materials = [
  { name: "Encoder", code: "4.1", kind: "Adet", perMass: "0.01", cost: "20" },
  {
    name: "Magnetic Encoder",
    code: "4.2M",
    kind: "Adet",
    perMass: "0.03",
    cost: "50",
  },
  {
    name: "Ploikarbon Plaka",
    code: "3.1",
    kind: "Metrekare",
    perMass: "0.5",
    cost: "200",
  },
  {
    name: "Alimünyum 2024 Plaka",
    code: "3.2-2",
    kind: "Metrekare",
    perMass: "3.5",
    cost: "30",
  },
  {
    name: "Alüminyum 4145 Plaka",
    code: "3.2-4",
    kind: "Metrekare",
    perMass: "4.5",
    cost: "50",
  },
  {
    name: "Omniwheel",
    code: "2.Omni",
    kind: "Adet",
    perMass: "0.4",
    cost: "30",
  },
  {
    name: "6 in. Wheel",
    code: '2."6in"',
    kind: "Adet",
    perMass: "0.3",
    cost: "20",
  },
  {
    name: "4 in. Wheel",
    code: '2."4in"',
    kind: "Adet",
    perMass: "0.2",
    cost: "15",
  },
  { name: "NavX", code: "1/NavX", kind: "Adet", perMass: "0.1", cost: "200" },
  { name: "RoboRIO", code: "1/RIO", kind: "Adet", perMass: "1", cost: "250" },
  { name: "Modem", code: "1/Modem", kind: "Adet", perMass: "0.2", cost: "50" },
  {
    name: "Circuit Breaker",
    code: "5: CB",
    kind: "Adet",
    perMass: "1.5",
    cost: "20",
  },
  {
    name: "Robot Signal Light",
    code: "5: RSL",
    kind: "Adet",
    perMass: "0.5",
    cost: "80",
  },
  {
    name: "16 AWG Wire",
    code: "6.'16'",
    kind: "Metre",
    perMass: "0.25",
    cost: "2.2",
  },
  {
    name: "18 AWG Wire",
    code: "6.'18'",
    kind: "Metre",
    perMass: "0.35",
    cost: "0.75",
  },
];

// initialize taking input function via require
var prompt = require("prompt-sync")({ sigint: true });

// Take input of material codes
let materialCodes = prompt("Material codes: ").match(/\d[.:/]\s?\S*/g);
// initialize an array
let allMaterialCodes = [];
// add all of the known material codes from our materials array
materials.forEach((element) => {
  allMaterialCodes.push(element.code);
});

// Take quantities of the materials that inputted and than make an array from them with using split function
let materialQuantities = prompt("Material quantities: ").split(" ");

// Take the material codes and quantities add an object to inputtedMaterialProps for each of these quantity, material code, totalCost, cost, kind, mass, totalMass, objIndex, group also make sure to check if kind of is equals to Adet, if it equals than quantity must be an integer if it is not an integer than console an error (to find if it is adet or not check which object it is via finding index of the mainCode in allMaterialCodes array and than detect object from it index and access its kind property)
let inputtedMaterialProps = [];

for (let i = 0; i < materialCodes.length; i++) {
  let mainCode = materialCodes[i];
  let mainQuantity = materialQuantities[i];
  if (
    Number(mainQuantity) % 1 != 0 &&
    materials[allMaterialCodes.indexOf(mainCode)].kind === "Adet"
  ) {
    console.error("Error: Quantity must be an integer");
    break;
  }
  if (allMaterialCodes.indexOf(mainCode) == -1) {
    console.error("Error: Unknown material code");
    break;
  }
  inputtedMaterialProps.push({
    name: materials[allMaterialCodes.indexOf(mainCode)].name,
    code: mainCode,
    quantity: Number(mainQuantity),
    objIndex: allMaterialCodes.indexOf(mainCode),
    cost: materials[allMaterialCodes.indexOf(mainCode)].cost,
    perMass: materials[allMaterialCodes.indexOf(mainCode)].perMass,
    totalCost:
      materials[allMaterialCodes.indexOf(mainCode)].cost *
      Number(mainQuantity),
    totalMass:
      materials[allMaterialCodes.indexOf(mainCode)].perMass *
      Number(mainQuantity),
    kind: materials[allMaterialCodes.indexOf(mainCode)].kind,
  });
}

// an array that will use forEach to store all of the total costs in an array(materialCosts) and than will order costs in descending order
let materialCosts = [];
inputtedMaterialProps.forEach((element) => {
  materialCosts.push(element.totalCost);
});

materialCosts.sort((a, b) => {
  return a - b;
});

// Reverse used to convert its asc order to desc order.
materialCosts.reverse();

// initalize an array which will store the names of the materials that have the its cost in the materialCosts array
let materialCostsNames = [];

// add material names to the materialCostsNames array according to their cost
materialCosts.forEach((costElement) => {
  inputtedMaterialProps.forEach((objElement) => {
    if (
      objElement.totalCost == costElement &&
      (materialCostsNames.indexOf(objElement.name) == -1)
    ) {
      materialCostsNames.push(objElement.name);
    }
  });
});

//  Do to same thing but for the mass and in ascending order
let materialMasses = [];
inputtedMaterialProps.forEach((element) => {
  materialMasses.push(element.totalMass);
});

materialMasses.sort((a, b) => {
  return a - b;
});

// initalize an array which will store the codes of the materials that have the its mass in the materialMasses array
let materialMassesCodes = [];

// add material codes to the materialMassesCodes array according to their mass
materialMasses.forEach((massElement) => {
  let permission = 1;
  inputtedMaterialProps.forEach((objElement) => {
    if (
      objElement.totalMass == massElement &&
      (materialMassesCodes.indexOf(objElement.code) == -1) &&
      materialMasses.indexOf(massElement) < 5 &&
      permission == 1
    ) {
      permission = 0;
      materialMassesCodes.push(objElement.code);
    }
  });
});

console.log(materialCostsNames); // materialCostsNames is the names of materials that ordered in descending order - expesive to cheap
console.log(materialMassesCodes); // materialMassesCodes is the codes of materials that ordered in ascending order - light to heavy

// Inntialize a variable to check after if logged N or Y if N logged set n to true otherwise it will be false
let n = false;

// Reduce used to iterate over materialMasses array and add all of them to each other
// Check if total mass of the robot is in apporpriate weigth if no print N otherwise Y
let robotMass = materialMasses.reduce((partialSum, a) => partialSum + a, 0);
if (robotMass > 52.5) {
  n = true;
  console.log("N");
} else if (robotMass < 52.5) {
  console.log("Y");
}

// Print total cost of robot
console.log("Total Mass of the robot: " + robotMass);
// Initialze two array in order to store perMasses of materials (if kind of material is Adet than add to adets array otherwise add to meters array than concat them to store all of the perMasses in one array)in order to find least perMass that can be used change the robot materials
//  I put per masses that has kind of meters to first part of the perMasses array because we can take as much we want from the m2 or meters but in adets we need to take much more than it necessary because we can take one by one(in adets)
let perMassesAdets = [];
let perMassesMetres = [];

inputtedMaterialProps.forEach((material) => {
  if (material.kind === "Adet") {
    perMassesAdets.push(material.perMass);
  } else if (material.kind === "Metre" || material.kind === "Metrekare") {
    perMassesMetres.push(material.perMass);
  }
});
perMassesAdets.sort((a, b) => a - b);
perMassesMetres.sort((a, b) => a - b);

// Initalized in order group the Adets kinds and Metres kinds I will use this later in forEach loop to don't allow a kind of non-Adet mass to match with an Adet kind material
let meters = perMassesMetres.length - 1;
let perMasses = perMassesMetres.concat(perMassesAdets);

// If n is true then suggest which materials to change(do this with iterating over perMasses and iterating over inputted materialMasses in order to

// If we need to take some of teh materials in the robot iterate over perMasses

if (n === true) {
  let a = 0;
  let usedCodes = [];
  perMasses.forEach((perMass) => {
    // In order to have access to name and code of the material that current perMass in it we need to iterate over inputted material and check if the iterated material's perMass is equals to curernt perMas
    // Not: We don't want to use the same material twice in the same perMass so we use usedCodes array to check if the iterated material's code is in it or not
    // Not: If user adds a material that has kind of Adet in it and after this material if user adds a non-Adet material that has the same perMass as Adet material the program will match the Adet kind first rather than matching the non-Adet kind, (in the perMasses array we had non-Adets first then Adets so we don'T want to match a non-Adet's perMass with Adet object) in order to fix this we need to match non-Adet kind related perMasses first in order to the that program needs to check if perMass is in the part that non-Adet kind perMasses are than kind of material must be not Adet otherwise must be kind of Adet ----- with that the program will match perMasses with their same material object
    inputtedMaterialProps.forEach((material) => {
      let materialPerMass = material.perMass;
      if (
        materialPerMass === perMass &&
        (usedCodes.indexOf(material.code) == -1) &&
        (perMasses.indexOf(perMass) <= meters
          ? (material.kind != "Adet")
          : material.kind === "Adet")
      ) {
        usedCodes.push(material.code);
        let difference = robotMass - 52.5;
        let quantityOut = 0;
        if (material.totalMass < difference) {
          quantityOut = material.quantity;
        } else {
          if (material.kind === "Adet") {
            quantityOut = Math.ceil(difference / materialPerMass);
          } else {
            quantityOut = Number((difference / materialPerMass).toFixed(3));
          }
        }

        if (n === true) {
          console.log(
            "\nMaterial Name: " + material.name,
            "\nMaterial quantity that should be out: " + quantityOut,
            material.kind
          );
        }
        robotMass -= quantityOut * materialPerMass;
        if (robotMass <= 52.5) {
          n = false;
        }
      }
    });
  });
}
