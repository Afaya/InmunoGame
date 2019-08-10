export interface GraphDataModel {
    date: string;
    valueInfluenza: number;
    valueAllergy: number;
}

export interface EvolutionDataModel {
    getData_date: Date;
    humidity: number;
    particle25: number;
    particle100: number;
    sensorsdata_id: number;
    temperature: number;
}
