export interface ForecastResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: weatherData;
  hourly_units: tempHumData;
  hourly: tempHumData;
}

export interface tempHumData {
  time: Date[];
  temperature_2m: number[];
  relativehumidity_2m: number[];
}

export interface weatherData {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: Date;
}
