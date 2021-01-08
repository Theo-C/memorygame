import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: 'game', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
