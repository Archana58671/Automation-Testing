Feature: Wircs Application Demo Using Playwright and Cucumber

Background: Launch Wircs Application
 Given I opens Wircs website


    @one
    Scenario: Creating a Risk
        When I Login to Wircs application as Testuser Risk Adviser
        And I click on Risk tile
        And I click on Add button on left side
        And I Fill the mandatory details with test owner field as Testuser WU
        And I click on Submit button
       

    
    Scenario: Editing a Risk
        When I Login to Wircs application as Testuser WU
        And I click on Risk tile
        And I search and click on the newly created risk
        And I click on the Risk name in Risk Information section
        And I Edit the Risk name
        And I click on Submit button
        Then I should see edited Risk name in Risk Information section

   
    Scenario: Apply Filter In Risk Tile
        When I Login to Wircs application
        And I click on Risk tile
        And I click on Risk 1148
        And I Enter text in Filter section
        Then I should see the result of applied filter

    
    Scenario: Verifying text on Risk Landing page
        When I Login to Wircs application
        And I click on Risk tile
        And I click on Risk 1148
        And I hover the mouse on Control
        Then I should see the Control details

    
    Scenario: Apply Filter In Risk Grouping Tile
        When I Login to Wircs application
        And I click on Risk Grouping tile
        And I click on Custom Groups
        And I Enter text in Filter section of Risk Grouping
        Then I should see the result of applied filter of Risk Grouping

    
    Scenario: Verifying side-by-side Report
        When I Login to Wircs application
        And I click on Risk tile
        And I click on Reports
        And I Click on side-by-side Report
        Then I should not see the Risk Adviser field 





