// Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

// Material Angular imports
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

// Module & components imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { GlobalService } from './services/global/global.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UsersComponent } from './pages/users/users.component';
import { SearchComponent } from './pages/search/search.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { PasswordLostComponent } from './pages/password-lost/password-lost.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { CharacterDetailsComponent } from './pages/characters/character-details/character-details.component';
import { PlanetsComponent } from './pages/planets/planets.component';
import { PlanetDetailsComponent } from './pages/planets/planet-details/planet-details.component';
import { StarshipsComponent } from './pages/starships/starships.component';
import { StarshipDetailsComponent } from './pages/starships/starship-details/starship-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { AuthBackgroundComponent } from './components/auth-background/auth-background.component';
import { PageBackgroundComponent } from './components/page-background/page-background.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavigationComponent,
    ProfileComponent,
    UsersComponent,
    SearchComponent,
    PasswordResetComponent,
    PasswordLostComponent,
    CharactersComponent,
    CharacterDetailsComponent,
    PlanetsComponent,
    PlanetDetailsComponent,
    StarshipsComponent,
    StarshipDetailsComponent,
    AuthBackgroundComponent,
    PageBackgroundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatListModule,
    FlexLayoutModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule
  ],
  providers: [
    GlobalService,
    PageEvent,
    MatTableDataSource,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', floatLabel: 'auto' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
