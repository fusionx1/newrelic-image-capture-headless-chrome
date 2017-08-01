# New Relic Image Capture on NodeJS
This is used to image capture newrelic metrics using headless chrome and NodeJS

## Requirements
1. Install nodejs preferrably ver 6 and up. Node.js is a platform built on Chrome's JavaScript runtime for easily building fast and scalable network applications. - https://nodejs.org/en/download/
2. Install Chrome Canary or if you are already using chrome version 59, Google Chrome Canary has the newest of the new Chrome features. Be forewarned: it's designed for developers and early adopters, and can sometimes break down completely.
 - https://www.google.com/chrome/browser/canary.html
3. Install jq. jq is a lightweight and flexible command-line JSON processor. - https://stedolan.github.io/jq/
4. You need to have a working Terminus - https://pantheon.io/docs/terminus/install/
5. Working onelogin account
6. Working Yubi Key(Tested on gpg2)

## How to install
1. npm install --save simple-headless-chrome
2. add your onelogin credentials on main.js
3. Make sure your canary chrome or if having a version 59 are in placed or existing in one these directories:

> "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"

> "/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary"


## Usage
1. Running it directly from nodejs

```node main.js [YUBI_KEY] [SITE_UUID] [NEWRELIC_ACCT_ID] [NEWRELIC_APP_ID]```

2. Running it via Terminus(Much more friendlier you just need to have the sitename and your yubi key, everything else will be fetched automatically)

```./newrelic_image_capture.sh [SITE_NAME] [YUBI_KEY]```


## Credits 
Thanks https://github.com/LucianoGanga



