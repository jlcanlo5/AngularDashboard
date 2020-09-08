//Esto es lazyload para no cargar de golpe todos los componentes
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    
    { path: 'progress', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) }

];

export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true });