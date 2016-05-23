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

## References ##
* [Yeoman](http://yeoman.io/) for boiler plate web app and build code
* Polymer Elements for cross platform [date](https://github.com/bendavis78/paper-date-picker) and [time](https://github.com/bendavis78/paper-time-picker) pickers
* [Moyan Brenn](https://www.flickr.com/photos/aigle_dore/5234272389/in/photolist-5eRhwN-8YSvNX-8Yx1PF-baAsqR-kFTMex-pFRNj7-pGFM5s-pY3DiK-pY9RTU-pYGkHi-p2t8Jr-pFDRa8-pG297J-p2r6pG-pGEhpR-63gaKC-8A4a9s-bZ2vcS-pYYzvs-pFYJt6-7oayTd-pFVBC8-baAsxP-64HMgm-8ziBXK-pYEMHt-snaZ4Z-pYka48-pFYftC-pYcvCB-8YVHaC-pGxtb7-p3w1ZV-76UWgV-63bX7T-8ziBbX-63gaE9-81SuVv-x272Wf-63gcUC-63gddo-6os7H6-c9Vk9u-Eqbu-7YDT2x-drZGx3-EpDc-ALHej-63u7iY-k7HKvv) for his Rome image under Creative Commons licence
* [Flat UI Color Palette] (https://flatuicolors.com/)
*  [Google Places](https://developers.google.com/places/javascript/)
