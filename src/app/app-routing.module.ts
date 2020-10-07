import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "infection-deck",
    loadChildren: () =>
      import("./pages/infection-deck/infection-deck.module").then((m) => m.InfectionDeckPageModule),
  },
  {
    path: '',
    redirectTo: '/infection-deck',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
