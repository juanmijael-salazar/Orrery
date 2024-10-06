export const basicInformation = {
  sun: {
    description:
      "The Sun is the star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, with internal convective motion that generates a magnetic field via a dynamo process.",
    radius: "696,340 km",
    distanceFromSun: "0 km",
    mass: "333,000 Earth masses",
    temperatureRange: "5500°C - 15 million°C",
    dayLength: "25 days (at the equator)",
    yearLength: "365.25 Earth days",
    missions: 0,
  },
  mercury: {
    description:
      "Smallest planet, lacks a significant atmosphere, has a surface covered in craters, and is the first planet from the Sun.",
    radius: "2439.7 km",
    distanceFromSun: "57.9 million km",
    mass: "0.330 Earth masses",
    temperatureRange: "-173°C to 427°C",
    dayLength: "4222.6 hours",
    yearLength: "88 Earth days",
    missions: 4,
  },
  venus: {
    description:
      "Similar in size to Earth, has a thick atmosphere rich in carbon dioxide, features volcanic landscapes, and is the second planet from the Sun.",
    radius: "6051.8 km",
    distanceFromSun: "108.2 million km",
    mass: "4.87 Earth masses",
    temperatureRange: "462°C",
    dayLength: "2802 hours",
    yearLength: "225 Earth days",
    missions: 43,
  },
  earth: {
    description:
      "Only known planet to support life, has diverse environments with oceans and continents, an atmosphere rich in oxygen, and is the third planet from the Sun.",
    radius: "6371 km",
    distanceFromSun: "149.6 million km",
    mass: "1 Earth mass",
    temperatureRange: "-88°C to 58°C",
    dayLength: "24 hours",
    yearLength: "365.25 days",
    missions: 0,
  },
  mars: {
    description:
      "Known as the 'Red Planet' features mountains, valleys, has the largest volcano in the solar system, and is the fourth planet from the Sun.",
    radius: "3389.5 km",
    distanceFromSun: "227.9 million km",
    mass: "0.107 Earth masses",
    temperatureRange: "-140°C to 20°C",
    dayLength: "24.6 hours",
    yearLength: "687 Earth days",
    missions: 60,
  },
  jupiter: {
    description:
      "Largest planet in the solar system, a gas giant with a thick atmosphere, famous for the Great Red Spot and numerous moons, and is the fifth planet from the Sun.",
    radius: "69911 km",
    distanceFromSun: "778.5 million km",
    mass: "318 Earth masses",
    temperatureRange: "-145°C",
    dayLength: "9.9 hours",
    yearLength: "11.9 Earth years",
    missions: 9,
  },
  saturn: {
    description:
      "Recognized for its stunning ring system, is a gas giant with a large number of moons, including Titan, and is the sixth planet from the Sun.",
    radius: "58232 km",
    distanceFromSun: "1433.5 million km",
    mass: "95 Earth masses",
    temperatureRange: "-178°C",
    dayLength: "10.7 hours",
    yearLength: "29.5 Earth years",
    missions: 7,
  },
  uranus: {
    description:
      "An ice giant with a unique sideways rotation, has a blue color due to methane in its atmosphere, features a ring system, and is the seventh planet from the Sun.",
    radius: "25362 km",
    distanceFromSun: "2872.5 million km",
    mass: "14 Earth masses",
    temperatureRange: "-224°C",
    dayLength: "17.2 hours",
    yearLength: "84 Earth years",
    missions: 2,
  },
  neptune: {
    description:
      "Similar to Uranus in composition, known for its deep blue color and strong winds, has several moons including Triton, and is the eighth planet from the Sun.",
    radius: "24622 km",
    distanceFromSun: "4495.1 million km",
    mass: "17 Earth masses",
    temperatureRange: "-214°C",
    dayLength: "16.1 hours",
    yearLength: "164.8 Earth years",
    missions: 1,
  },
  pluto: {
    description:
      "Once classified as the ninth planet, it is now categorized as a 'dwarf planet' Plutón has a rocky surface covered in ice and is known for its highly elliptical orbit. It has a thin atmosphere that can freeze and condense onto its surface. Plutón is located in the Kuiper Belt, beyond Neptune. It was reclassified as a dwarf planet by the International Astronomical Union (IAU) in 2006.",
    radius: "1186 km",
    distanceFromSun: "5906 million km",
    mass: "0.0025 Earth masses",
    temperatureRange: "-233°C to -223°C",
    dayLength: "153.3 hours",
    yearLength: "248 Earth years",
    missions: 1,
  },
};
export const constant = {
  approx: {
    sizeConst: 1,
    distanceConst: 1,
    selfRotateConst: 1,
    rotaingSpeedAroundSunConst: 1,
    max_view: 275000,
    max_speed: 1,
    min_speed: 0,
    point_light_limit: 300,
  },
  real: {
    sizeConst: 0.5,
    distanceConst: 2.5,
    selfRotateConst: 0.01,
    rotaingSpeedAroundSunConst: 0.075,
    max_view: 750000,
    max_speed: 100,
    min_speed: 0,
    point_light_limit: 30000,
  },
};
export const sunData = {
  approx: 15,
  real: 696,
};
export const select = (selector) => document.querySelector(selector);
export const showInfo = (name) => {
  const temp = basicInformation[name];
  Object.keys(temp).forEach((key) => {
    select(`.info-value.${key}`).innerText = temp[key];
  });
};
