import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { CityPage } from './pages/city/city.page';
import { GenderPage } from './pages/gender/gender.page';
import { LanguagePage } from './pages/language/language.page';

const routes: Routes = [
  {
    path: ROUTER_UTILS.config.category.city,
    component: CityPage
  },
  {
    path: ROUTER_UTILS.config.category.gender,
    component: GenderPage
  },
  {
    path: ROUTER_UTILS.config.category.language,
    component: LanguagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
