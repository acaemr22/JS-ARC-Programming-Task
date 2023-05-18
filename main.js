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
let material_codes = prompt("Material codes: ").match(/\d[.:/]\s?\S*/g);
console.log(material_codes);
// initialize an array
let all_material_codes = [];
// add all of the known material codes from our materials array
materials.forEach((element) => {
  all_material_codes.push(element.code);
});

// Take quantities of the materials that inputted and than make an array from them with using split function
let material_quantities = prompt("Material quantities: ").split(" ");

// Take the material codes and quantities add an object to inputted_material_props for each of these couples of quantity, material code, total_cost, cost, kind, mass, total_mass, obj_index, also make sure to check if kind of is equals to Adet material_quantity, if it equals than quantity must be an integer if it is not an integer than console an error (to find if it is adet or not check which object it is via finding index of the main_code in all_material_codes array and than detect object from it index and access its kind property)
let inputted_material_props = [];

for (let i = 0; i < material_codes.length; i++) {
  let mainCode = material_codes[i];
  let main_quantity = material_quantities[i];
  if (
    Number(main_quantity) % 1 != 0 &&
    materials[all_material_codes.indexOf(mainCode)].kind === "Adet"
  ) {
    console.error("Error: Quantity must be an integer");
    break;
  }
  if (all_material_codes.indexOf(mainCode) == -1) {
    console.error("Error: Unknown material code");
    break;
  }
  inputted_material_props.push({
    name: materials[all_material_codes.indexOf(mainCode)].name,
    code: mainCode,
    quantity: Number(main_quantity),
    obj_index: all_material_codes.indexOf(mainCode),
    cost: materials[all_material_codes.indexOf(mainCode)].cost,
    perMass: materials[all_material_codes.indexOf(mainCode)].perMass,
    total_cost:
      materials[all_material_codes.indexOf(mainCode)].cost *
      Number(main_quantity),
    total_mass:
      materials[all_material_codes.indexOf(mainCode)].perMass *
      Number(main_quantity),
    kind: materials[all_material_codes.indexOf(mainCode)].kind,
  });
}

// an array that will use forEach to store all of the total costs in an array(material_costs) and than will order weights in descending order
let material_costs = [];
inputted_material_props.forEach((element) => {
  material_costs.push(element.total_cost);
});

material_costs.sort((a, b) => {
  return a - b;
});

material_costs.reverse();

// initalize an array which will store the names of the materials that have the its cost in the material_costs array
let material_costs_names = [];

// add material names to the material_costs_names array according to their cost
material_costs.forEach((cost_element) => {
  inputted_material_props.forEach((obj_element) => {
    if (
      obj_element.total_cost == cost_element &&
      (material_costs_names.indexOf(obj_element.name) == -1)
    ) {
      material_costs_names.push(obj_element.name);
    }
  });
});

//  Do to same thing but for the mass and in ascending order
let material_masses = [];
inputted_material_props.forEach((element) => {
  material_masses.push(element.total_mass);
});

material_masses.sort((a, b) => {
  return a - b;
});

// initalize an array which will store the codes of the materials that have the its mass in the material_masses array
let material_masses_codes = [];

// add material codes to the material_masses_codes array according to their mass
material_masses.forEach((mass_element) => {
  let permission = 1;
  inputted_material_props.forEach((obj_element) => {
    if (
      obj_element.total_mass == mass_element &&
      (material_masses_codes.indexOf(obj_element.code) == -1) &&
      material_masses.indexOf(mass_element) < 5 &&
      permission == 1
    ) {
      permission = 0;
      material_masses_codes.push(obj_element.code);
    }
  });
});

console.log(material_costs_names); // material_costs_names is the names of materials that ordered in descending order - expesive to cheap
console.log(material_masses_codes); // material_masses_codes is the codes of materials that ordered in ascending order - light to heavy

// Inntialize a variable to check after if logged N or Y if N logged set n to true otherwise it will be false
let n = false;

// Check if total mass of the robot is in apporpriate weigth if no print N otherwise Y
let robotMass = material_masses.reduce((partialSum, a) => partialSum + a, 0);
if (robotMass > 52.5) {
  n = true;
  console.log("N");
} else if (robotMass < 52.5) {
  console.log("Y");
}

// Print total cost of robot
console.log("Total Mass of the robot: " + robotMass);
// Initialze two array in order to store perMasses of materials (if kind of material is Adet than add to adets array otherwise add to meters array than concat them to store all of the perMasses in one array)in order to find least perMass that can be used change the robot materials
//  I put per masses that has kind of meters to first part of the perMasses array because we can take as much we want from the m2 or meters but in adets we need to take much more than it necessary because we can take one by one
let perMassesAdets = [];
let perMassesMetres = [];

inputted_material_props.forEach((material) => {
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
// console.log(perMassesMetres.length);
let perMasses = perMassesMetres.concat(perMassesAdets);

// If n is true then suggest which materials to change(do this with iterating over perMasses and iterating over inputted material_masses in order to

// If we need to take some of teh materials in the robot iterate over perMasses

if (n === true) {
  let a = 0;
  let usedCodes = [];
  perMasses.forEach((perMass) => {
    // In order to have access to name and code of the material that current perMass in it we need to iterate over inputted material and check if the iterated material's perMass is equals to curernt perMas
    // Not: We don't want to use the same material twice in the same perMass so we use usedCodes array to check if the iterated material's code is in it or not
    // Not: If user adds a material that has kind of Adet in it and after this material if user adds a non-Adet material that has the same perMass as Adet material the program will match the Adet kind first rather than matching the non-Adet kind in order to fix this we need to match non-Adet kind related perMasses first in order to the that program needs to check if perMass is in the part that non-Adet kind perMasses are than kind of material must be not Adet otherwise must be kind of Adet ----- with that the program will match perMasses with their same material object
    // console.log("PerMass", perMass);
    inputted_material_props.forEach((material) => {
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
        if (material.total_mass < difference) {
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
