#!/bin/bash
SITE_NAME=$1
YUBI_KEY=$2
TERMINUS_PATH=$HOME'/Projects/pantheon/terminus/bin/terminus'

SITE_UUID=$($TERMINUS_PATH site:info $SITE_NAME --format=json | jq .id)
SITE_UUID="${SITE_UUID%\"}"
SITE_UUID="${SITE_UUID#\"}"

API_KEY=$($TERMINUS_PATH newrelic-data:info $SITE_NAME.live | jq .application.id)
NEWRELIC_ID=$($TERMINUS_PATH newrelic-data:info $SITE_NAME.live | jq .nr_id)
NEWRELIC_APP_ID=$($TERMINUS_PATH newrelic-data:info $SITE_NAME.live | jq .application.id)

echo 'INFO':
echo 'SITE UUID:'  $SITE_UUID
echo 'YUBI KEY:'  $YUBI_KEY
echo 'NEWRELIC ID:'  $NEWRELIC_ID
echo 'NEWRLIC APP:' $NEWRELIC_APP_ID

node main.js $YUBI_KEY $SITE_UUID $NEWRELIC_ID $NEWRELIC_APP_ID
