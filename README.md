# Eventure
The Event Planning App

## Overview ##
This application allows a user to create an event and see a displayed view of the created events. I built it using vanilla js, but I do use a little bit of polymer for a customized date and time picker. The events are stored in memory for now and the sign in page has no functioning backend. Supports major modern browsers(IE10+).

## How to Run ##

### Production ###
The deployed production version can be seen on [github pages](https://lexro.github.io/Eventure).

### Running a local version ###

```
git clone https://github.com/lexro/Eventure.git
npm install && bower install
gulp serve
```
This should open up `Eventure` in your default browser at `http://localhost:9000`.

## Feature Set ##
This application has the following features:
1. Single page app
2. Home page with nav menu and hero image
3. Event creation
  * autocomplete fields
  * validation
  * location autocomplete integration using google places api
  * date and time integrate using polymer components
4. Event display using the stored events
5. Account creation page
  * required field validation
  * secure password requirements
6. Appropriate links to and from pages
7. Optimized for mobile, tablet, and desktop/laptop
8. Colors and images where appropriate
9. Appropriate form design
10. Screen reader compatible
11. Support for Modern browsers (IE10+)
