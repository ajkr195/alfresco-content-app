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

import { CyComponent } from '../cy-component';
// import { waitForPresence, waitElement } from '../../utils/cy-utils';

export class CySearchInput extends CyComponent {
  searchButton = '.app-search-button';
  searchContainer = '.app-search-container';
  searchControl = '.app-search-control';
  searchInput = `input[id='app-control-input']`;
  searchOptionsArea = 'search-options';
  // searchFilesOption = this.searchOptionsArea.element(by.cssContainingText('.mat-checkbox', 'Files'));
  // searchFoldersOption = this.searchOptionsArea.element(by.cssContainingText('.mat-checkbox', 'Folders'));
  // searchLibrariesOption = this.searchOptionsArea.element(by.cssContainingText('.mat-checkbox', 'Libraries'));
  clearSearchButton = '.app-clear-icon';

  constructor(ancestor?: string) {
    super('aca-search-input', ancestor);
  }

  // async waitForSearchControl() {
  //   await waitForPresence(this.searchControl);
  // }

  // async isSearchContainerDisplayed() {
  //   const isContainerDisplayed = await this.searchContainer.isDisplayed();
  //   const isSearchButtonDisplayed = await this.searchButton.isDisplayed();

  //   return isContainerDisplayed && isSearchButtonDisplayed;
  // }

  clickSearchButton() {
    // BrowserActions.click(this.searchButton);
    cy.get(this.searchButton).click();
    // this.waitForSearchControl();
  }

  // async isOptionsAreaDisplayed() {
  //   await waitElement('.app-search-control');
  //   return browser.isElementPresent(this.searchOptionsArea);
  // }

  // async clickFilesOption() {
  //   await BrowserActions.click(this.searchFilesOption);
  // }

  // async clickFoldersOption() {
  //   await BrowserActions.click(this.searchFoldersOption);
  // }

  // async clickLibrariesOption() {
  //   await BrowserActions.click(this.searchLibrariesOption);
  // }

  // async isFilesOptionEnabled() {
  //   const optClass = await this.searchFilesOption.getAttribute('class');
  //   return !optClass.includes('mat-checkbox-disabled');
  // }

  // async isFoldersOptionEnabled() {
  //   const optClass = await this.searchFoldersOption.getAttribute('class');
  //   return !optClass.includes('mat-checkbox-disabled');
  // }

  // async isLibrariesOptionEnabled() {
  //   const optClass = await this.searchLibrariesOption.getAttribute('class');
  //   return !optClass.includes('mat-checkbox-disabled');
  // }

  // async isFilesOptionChecked() {
  //   const optClass = await this.searchFilesOption.getAttribute('class');
  //   return optClass.includes('mat-checkbox-checked');
  // }

  // async isFoldersOptionChecked() {
  //   const optClass = await this.searchFoldersOption.getAttribute('class');
  //   return optClass.includes('mat-checkbox-checked');
  // }

  // async isLibrariesOptionChecked() {
  //   const optClass = await this.searchLibrariesOption.getAttribute('class');
  //   return optClass.includes('mat-checkbox-checked');
  // }

  // async clearOptions() {
  //   if (await this.isFilesOptionChecked()) {
  //     await this.clickFilesOption();
  //   }
  //   if (await this.isFoldersOptionChecked()) {
  //     await this.clickFoldersOption();
  //   }
  //   if (await this.isLibrariesOptionChecked()) {
  //     await this.clickLibrariesOption();
  //   }
  // }

  // async isClearSearchButtonPresent() {
  //   return browser.isElementPresent(this.clearSearchButton);
  // }

  // async clickClearSearchButton() {
  //   if (await this.isClearSearchButtonPresent()) {
  //     await BrowserActions.click(this.clearSearchButton);
  //   }
  // }

  // async checkOnlyFiles() {
  //   await this.clearOptions();
  //   await this.clickFilesOption();
  // }

  // async checkOnlyFolders() {
  //   await this.clearOptions();
  //   await this.clickFoldersOption();
  // }

  // async checkFilesAndFolders() {
  //   await this.clearOptions();
  //   await this.clickFilesOption();
  //   await this.clickFoldersOption();
  // }

  // async checkLibraries() {
  //   await this.clearOptions();
  //   await this.clickLibrariesOption();
  // }

  searchFor(text: string) {
    // BrowserActions.clearWithBackSpace(this.searchInput);
    cy.get(this.searchInput)
      .clear()
      .type(text + `{enter}`);
  }
}
