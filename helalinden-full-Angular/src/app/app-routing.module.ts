import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAracComponent } from './components/admin/admin-arac/admin-arac.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminKiraComponent } from './components/admin/admin-kira/admin-kira.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AracComponent } from './components/arac/arac.component';
import { HomeComponent } from './components/home/home.component';
import { KirasayfaComponent } from './components/kirasayfa/kirasayfa.component';
import { LoginComponent } from './components/login/login.component';
import { UserpanelComponent } from './components/userpanel/userpanel.component';
import { UyeComponent } from './components/uye/uye.component';
import { AuthGuard } from './services/AuthGuard';


const routes: Routes = [
  {
    path: '',
    component : HomeComponent

  },
  {
    path: 'araclar',
    component : AracComponent

  },
  {
    path: 'uyeler',
    component : UyeComponent

  },
  {
    path: 'login',
    component : LoginComponent

  },
  {
    path: 'userpanel/:UyeId',
    component : UserpanelComponent

  },
  {
    path: 'kiralama',
    component : KirasayfaComponent

  },
  {
    path: 'admin/arac',
    component : AdminAracComponent,
    canActivate : [AuthGuard],
    data:{
      yetkiler: ['Admin'],
      gerigit : '/login'
    }

  },
  {
    path: 'admin/arac/:KategoriId',
    component : AdminAracComponent,
    canActivate : [AuthGuard],
    data:{
      yetkiler: ['Admin'],
      gerigit : '/login'
    }

  },
  {
    path: 'admin/kategori',
    component : AdminKategoriComponent,
    canActivate : [AuthGuard],
    data:{
      yetkiler: ['Admin'],
      gerigit : '/login'
    }

  },
  {
    path: 'admin/kira',
    component :AdminKiraComponent,
    canActivate : [AuthGuard],
    data:{
      yetkiler: ['Admin'],
      gerigit : '/login'
    }

  },
  {
    path: 'adminpanel',
    component :AdminPanelComponent,
    canActivate : [AuthGuard],
    data:{
      yetkiler: ['Admin'],
      gerigit : '/login'
    }

  },
  {
    path: 'admin/uye',
    component : AdminUyeComponent,
    canActivate : [AuthGuard],
    data:{
      yetkiler: ['Admin'],
      gerigit : '/login'
    }

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
