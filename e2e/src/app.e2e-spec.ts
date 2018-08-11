import { AppPage } from './app.po';
import { by, browser, element } from 'protractor';

describe('ESM App', function() {
  it('Title should be EsmSite', function() {
    browser.get('http://localhost:4200/');

    expect(browser.getTitle()).toEqual('EsmSite');
  });
});

describe('ESM Test Suite', function(){
  var firstName = element(by.css("input[formControlName=firstName]"));
  var lastName = element(by.css("input[formControlName=lastName]"));
  var username = element(by.css("input[formControlName=username]"));
  var password = element(by.css("input[formControlName=password]"));
  var firstTab = element(by.tagName('mat-tab'));
  var secondTab = element(by.css("mat-tab[label=Tier Description]"));
  var RegisterButton = element(by.buttonText('Register'));
  var LoginButton = element(by.buttonText('Login'));
  var LogoutButton = element(by.buttonText('Logout'));
it('Register User', function() {
  browser.get('http://localhost:4200/register');
  firstName.sendKeys('kvn');
  lastName.sendKeys('kvn');
  username.sendKeys('kvn');
  password.sendKeys('k123');
  RegisterButton.click();
  expect(browser.getTitle()).toEqual('EsmSite');
});

it('Login User', function() {
  browser.get('http://localhost:4200/login');
  username.sendKeys('kvn');
  password.sendKeys('k123');
  LoginButton.click();
   
});
it('Logout User', function() {
  
  LogoutButton.click();

});
});
