import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UsersComponent } from './pages/users/users.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { PasswordLostComponent } from './pages/password-lost/password-lost.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { CharacterDetailsComponent } from './pages/characters/character-details/character-details.component';
import { PlanetsComponent } from './pages/planets/planets.component';
import { PlanetDetailsComponent } from './pages/planets/planet-details/planet-details.component';
import { StarshipsComponent } from './pages/starships/starships.component';
import { StarshipDetailsComponent } from './pages/starships/starship-details/starship-details.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'password-lost', component: PasswordLostComponent },
      { path: 'password-reset', component: PasswordResetComponent },
      { path: 'password-reset/:token', component: PasswordResetComponent },
      { path: 'users', component: UsersComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'search', component: SearchComponent },
      { path: 'characters', component: CharactersComponent },
      { path: 'characters/:id', component: CharacterDetailsComponent },
      { path: 'planets', component: PlanetsComponent },
      { path: 'planets/:id', component: PlanetDetailsComponent },
      { path: 'starships', component: StarshipsComponent },
      { path: 'starships/:id', component: StarshipDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
