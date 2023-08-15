import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SensorHomeComponent } from "./pages/sensor-home/sensor-home.component";
import { EvolutionDataComponent } from "./pages/evolution-data/evolution-data.component";

const routes: Routes = [
  { path: "", component: SensorHomeComponent },
  { path: "home", component: SensorHomeComponent },
  { path: "evolution", component: EvolutionDataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
