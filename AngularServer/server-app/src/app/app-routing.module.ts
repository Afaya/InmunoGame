import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SensorHomeComponent } from "./pages/sensor-home/sensor-home.component";
import { EvolutionDataComponent } from "./pages/evolution-data/evolution-data.component";
import { PredictionPageComponent } from "./pages/prediction-page/prediction-page.component";

const routes: Routes = [
  { path: "", component: SensorHomeComponent },
  { path: "home", component: SensorHomeComponent },
  { path: "evolution", component: EvolutionDataComponent },
  { path: "prediction", component: PredictionPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
