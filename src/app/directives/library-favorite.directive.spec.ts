/*!
 * @license
 * Alfresco Example Content Application
 *
 * Copyright (C) 2005 - 2020 Alfresco Software Limited
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail.  Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

import { Component, ViewChild } from '@angular/core';
import { LibraryFavoriteDirective } from './library-favorite.directive';
import { AlfrescoApiService, CoreModule } from '@alfresco/adf-core';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppTestingModule } from '../testing/app-testing.module';

@Component({
  selector: 'app-test-component',
  template: ` <button #favoriteLibrary="favoriteLibrary" [acaFavoriteLibrary]="selection">Favorite</button> `
})
class TestComponent {
  @ViewChild('favoriteLibrary')
  directive: LibraryFavoriteDirective;

  selection = null;
}

describe('LibraryFavoriteDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let api: AlfrescoApiService;
  let component: TestComponent;
  let selection: { entry: { guid: string; id: string } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), CoreModule.forRoot(), AppTestingModule],
      declarations: [TestComponent, LibraryFavoriteDirective]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    api = TestBed.inject(AlfrescoApiService);
    selection = { entry: { guid: 'guid', id: 'id' } };
  });

  it('should not check for favorite if no selection exists', () => {
    spyOn(api.peopleApi, 'getFavoriteSite');
    fixture.detectChanges();

    expect(api.peopleApi.getFavoriteSite).not.toHaveBeenCalled();
  });

  it(
    'should mark selection as favorite when getFavoriteSite returns successfully',
    waitForAsync(() => {
      spyOn(api.peopleApi, 'getFavoriteSite').and.returnValue(Promise.resolve(null));
      component.selection = selection;
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(api.peopleApi.getFavoriteSite).toHaveBeenCalled();
        expect(component.directive.isFavorite()).toBe(true);
      });
    })
  );

  it(
    'should mark selection not favorite when getFavoriteSite errors',
    waitForAsync(() => {
      spyOn(api.peopleApi, 'getFavoriteSite').and.returnValue(Promise.reject());
      component.selection = selection;
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(api.peopleApi.getFavoriteSite).toHaveBeenCalled();
        expect(component.directive.isFavorite()).toBe(false);
      });
    })
  );

  it(
    'should call addFavorite() on click event when selection is not a favorite',
    waitForAsync(() => {
      spyOn(api.peopleApi, 'getFavoriteSite').and.returnValue(Promise.reject());
      spyOn(api.peopleApi, 'addFavorite').and.returnValue(Promise.resolve(null));
      component.selection = selection;
      fixture.detectChanges();

      expect(component.directive.isFavorite()).toBeFalsy();

      fixture.whenStable().then(() => {
        fixture.nativeElement.querySelector('button').dispatchEvent(new MouseEvent('click'));

        fixture.detectChanges();

        expect(api.peopleApi.addFavorite).toHaveBeenCalled();
      });
    })
  );

  it(
    'should call removeFavoriteSite() on click event when selection is not a favorite',
    waitForAsync(() => {
      spyOn(api.peopleApi, 'getFavoriteSite').and.returnValue(Promise.resolve(null));
      spyOn(api.favoritesApi, 'removeFavoriteSite').and.returnValue(Promise.resolve());
      component.selection = selection;
      fixture.detectChanges();

      expect(component.directive.isFavorite()).toBeFalsy();

      fixture.whenStable().then(() => {
        fixture.nativeElement.querySelector('button').dispatchEvent(new MouseEvent('click'));

        fixture.detectChanges();

        expect(api.favoritesApi.removeFavoriteSite).toHaveBeenCalled();
      });
    })
  );
});
