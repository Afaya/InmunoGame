import { Risk } from "../models/risks";

const temperatureLevelHighRisk = 5;
const temperatureLevelMediumRisk = 10;
const humidityLevelHighRisk = 20;
const humidityLevelMediumRisk = 30;
const particlesLevelExtraHighRisk = 150;
const particlesLevelHighRisk = 100;
const particlesLevelMediumRisk = 50;

export function calculateInfluenzaRatius(
  temperature: number,
  humidity: number
): Risk {
  let riskCalculated: Risk = {
    title: "Baja",
    description:
      "Las condiciones de temperatura y humedad de la habitación son las adecuadas",
    class: "lowRisk",
  };

  if (
    temperature < temperatureLevelHighRisk &&
    humidity < humidityLevelHighRisk
  ) {
    riskCalculated.title = "Muy Alta";
    riskCalculated.description =
      "Ventile la habitación, y aumente la temperatura de la misma y su humedad";
    riskCalculated.class = "extraHighRisk";
  } else if (
    temperature < temperatureLevelHighRisk ||
    humidity < humidityLevelHighRisk
  ) {
    riskCalculated.title = "Alta";
    riskCalculated.description = "Ventile la habitación, y ";
    riskCalculated.description +=
      temperature < temperatureLevelHighRisk
        ? "aumente la temperatura de la habitación"
        : "aumente la humedad de la habitación";
    riskCalculated.class = "highRisk";
  } else if (
    temperature < temperatureLevelMediumRisk &&
    humidity < humidityLevelMediumRisk
  ) {
    riskCalculated.title = "Media";
    riskCalculated.description =
      "Aumente la temperatura de la habitación o su humedad";
    riskCalculated.class = "mediumRisk";
  }

  return riskCalculated;
}

export function calculateParticlesRisk(pm25: number, pm100: number): Risk {
  let riskCalculated: Risk = {
    title: "Baja",
    description: "El nivel de partículas en suspensión es el adecuado",
    class: "lowRisk",
  };

  if (
    pm25 > particlesLevelExtraHighRisk &&
    pm100 > particlesLevelExtraHighRisk
  ) {
    riskCalculated.title = "Muy Alta";
    riskCalculated.description = "Ventile la habitación y aspire el polvo";
    riskCalculated.class = "extraHighRisk";
  } else if (pm25 > particlesLevelHighRisk || pm100 > particlesLevelHighRisk) {
    riskCalculated.title = "Alta";
    riskCalculated.description = "Aspire el polvo de la estancia";
    riskCalculated.class = "highRisk";
  } else if (
    pm25 > particlesLevelMediumRisk ||
    pm100 > particlesLevelMediumRisk
  ) {
    riskCalculated.title = "Media";
    riskCalculated.description = "Ventile la habitación";
    riskCalculated.class = "mediumRisk";
  }

  return riskCalculated;
}
