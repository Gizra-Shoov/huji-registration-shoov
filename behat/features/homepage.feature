Feature: Homepage
  In order to be able to view and get info about the site
  As an anonymous user
  We need to be able to have access to the homepage

  @javascript
  Scenario: Visit the homepage
    Given I am an anonymous user
    When  I visit the homepage
    And   I click How to Register link
    And   I on the registration process
    Then   I should see "פרטים נוספים בנושאי ההרשמה"
