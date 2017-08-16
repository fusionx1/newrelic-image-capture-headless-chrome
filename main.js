const HeadlessChrome = require('simple-headless-chrome')

const browser = new HeadlessChrome({
  headless: true,
  chrome: {
      flags: [
        '--disable-popup-blocking'
      ]
  }
})
async function navigateWebsite() {
  try {
    await browser.init()
    const mainTab = await browser.newTab({
      privateTab: false
    })

  const args = process.argv;
  var yubi_key = process.argv[2];
  var site_uuid = process.argv[3];
  var newrelic_id = process.argv[4];
  var newrelic_app_id = process.argv[5];
  var framework = process.argv[6];


  ///////////////////////////////
  // Navigate to a onelogin page
  //////////////////////////////
  await mainTab.goTo('https://pantheon.onelogin.com/login')
  await mainTab.type('#user_email', 'xxxxxxxxxxxxxxxxxx')
  await mainTab.type('#user_password', 'xxxxxxxxxxxxxxxxxxx')
  await mainTab.click('#user_submit')
  await mainTab.log('Click login')
  await mainTab.log('Wait 5 seconds')
  await mainTab.wait(5000)
  await mainTab.wait(5000)
  await mainTab.saveScreenshot('onelogin')
  await mainTab.log('Took a screenshot of the onelogin form')
  await mainTab.type("input#otp_token_1.otp_token_input", yubi_key)
  // Just added yubi key
  await mainTab.click('#user_submit')
  await mainTab.log('Wait 5 seconds')
  await mainTab.wait(5000)
  await mainTab.saveScreenshot('screenshots/added-yubi')
  await mainTab.log('Took a screenshot of the onelogin form with yubikey')
  // Click on a button
  await mainTab.click('#browser_submit')
  await mainTab.wait(5000)
  await mainTab.log('wait 5s.')
  await mainTab.waitForPageToLoad()

  ///////////////////////////////
  // Navigate to a onelogin page
  //////////////////////////////
  await mainTab.log('Finally logging in successfully to one login')
  await mainTab.wait(5000)
  await mainTab.log('wait 5s.')


  await mainTab.saveScreenshot('screenshots/onelogin-dashboard')
  await mainTab.goTo('https://pantheon.onelogin.com/client/apps/select/73297966')
  await mainTab.log('clicked to authenticate pantheon admin dashoard')
  await mainTab.waitForPageToLoad()


  ///////////////////////////////////////
  // Navigate to pantheon admin dashboard
  ///////////////////////////////////////
  await  mainTab.wait(5000)
  await  mainTab.log('wait 5s.')
  await  mainTab.wait(5000)
  await  mainTab.log('wait 5s..')
  await  mainTab.wait(5000)
  await  mainTab.log('wait 5s...')
  await  mainTab.saveScreenshot('screenshots/pantheon-admin-dashboard')
  await  mainTab.log('screenshot pantheon admin dashboard')
  await  mainTab.goTo('https://admin.dashboard.pantheon.io/sites/' + site_uuid + '#live/new_relic/NewRelic')
  await  mainTab.log('navigate to the site where audit will take place')
  await  mainTab.wait(5000)
  await  mainTab.log('wait 5s.')
  await  mainTab.wait(5000)
  await  mainTab.log('wait 5s..')
  await  mainTab.wait(5000)
  await  mainTab.log('wait 5s...')
  await  mainTab.wait(5000)
  await  mainTab.log('wait 5s....')
  await  mainTab.wait(5000)
  await  mainTab.log('wait 5s.....')
  await  mainTab.saveScreenshot('screenshots/site-dashboard-tobe-audited')
  await  mainTab.wait(5000)
  await  mainTab.log('wait 5s...')
  await  mainTab.wait(5000)
  await  mainTab.log('wait 5s....')
  await  mainTab.wait(5000)
  await  mainTab.log('wait 5s.....')
  await  mainTab.click('#sso-form > button')
  await  mainTab.log('Authenticate to newrelic SSO')
  await  mainTab.wait(5000)
  await  mainTab.wait(5000)
  await  mainTab.wait(5000)

  ///////////////////////////////////////
  // Navigate to New Relic Dashboard
  ///////////////////////////////////////


  const secondTab = await browser.newTab({
    privateTab: false // Optional. Defaults to false
  })
  await secondTab.wait(5000)
  await secondTab.saveScreenshot('screenshots/nr-overview')
  await secondTab.log('finally landed to newrelic dashboard')
  await secondTab.goTo('https://rpm.newrelic.com/accounts/' + newrelic_id + '/applications/' + newrelic_app_id)
  await secondTab.log('navigate to the site where audit will take place1')
  await secondTab.wait(5000)
  await secondTab.wait(5000)
  await secondTab.log('wait 5s....')
  await secondTab.wait(5000)
  await secondTab.log('wait 5s.....')
  //const downtimeClass = "a[href='/accounts/" + newrelic_id + '/applications/' + newrelic_app_id + "/downtime']"

  await secondTab.click('#time_window_nav > h4')
  await secondTab.wait(2000)
  await secondTab.saveScreenshot('screenshots/set-7days')
  await secondTab.click('a[data-open-duration="last_7_days"]')
  await secondTab.wait(5000)
  await secondTab.saveScreenshot('screenshots/metrics-7days')

  await secondTab.click('#time_window_nav > h4')
  await secondTab.wait(2000)
  await secondTab.click('a[data-open-duration="last_90_days"]')
  await secondTab.wait(5000)
  await secondTab.wait(3000)
  await secondTab.saveScreenshot('screenshots/metrics-90days')

  const thirdTab = await browser.newTab({
    privateTab: false // Optional. Defaults to false
  })

  await thirdTab.log('getting transactions metrics')
  await thirdTab.goTo('https://rpm.newrelic.com/accounts/' + newrelic_id + '/applications/' + newrelic_app_id +'/transactions')
  await thirdTab.wait(5000)
  await thirdTab.saveScreenshot('screenshots/nr-transactions', {
     selector: '#primary_content'
  })

  const fourthTab = await browser.newTab({
    privateTab: false // Optional. Defaults to false
  })

  await fourthTab.log('getting hooks metrics')
  await fourthTab.goTo('https://rpm.newrelic.com/accounts/' + newrelic_id + '/applications/' + newrelic_app_id + framework + '/hooks')
  await fourthTab.wait(5000)
  await fourthTab.saveScreenshot('screenshots/nr-hooks')

  const fifthTab = await browser.newTab({
    privateTab: false // Optional. Defaults to false
  })

  await fifthTab.log('getting themes/plugins metrics')
  await fifthTab.goTo('https://rpm.newrelic.com/accounts/' + newrelic_id + '/applications/' + newrelic_app_id + '/' + framework + '/plugins')
  await fifthTab.wait(5000)
  await fifthTab.saveScreenshot('screenshots/nr-themes-plugins')

  const sixthTab = await browser.newTab({
    privateTab: false // Optional. Defaults to false
  })

  await sixthTab.log('getting database metrics')
  await sixthTab.goTo('https://rpm.newrelic.com/accounts/' + newrelic_id + '/applications/' + newrelic_app_id +'/datastores')
  await sixthTab.wait(5000)
  await sixthTab.saveScreenshot('screenshots/nr-database')

  const seventhTab = await browser.newTab({
    privateTab: false // Optional. Defaults to false
  })

  await seventhTab.log('getting external calls metrics')
  await seventhTab.goTo('https://rpm.newrelic.com/accounts/' + newrelic_id + '/applications/' + newrelic_app_id +'/externals')
  await seventhTab.wait(5000)
  await seventhTab.saveScreenshot('screenshots/nr-external-calls')

  const eightTab = await browser.newTab({
    privateTab: false // Optional. Defaults to false
  })

  await eightTab.log('getting sla 3months metrics')
  await eightTab.goTo('https://rpm.newrelic.com/accounts/' + newrelic_id + '/applications/' + newrelic_app_id +'/optimize/sla_report')
  await eightTab.wait(5000)
  await eightTab.saveScreenshot('screenshots/nr-3month-sla')

  const nighthTab = await browser.newTab({
    privateTab: false // Optional. Defaults to false
  })

  await nighthTab.log('getting sla 12months metrics')
  await nighthTab.goTo('https://rpm.newrelic.com/accounts/' + newrelic_id + '/applications/' + newrelic_app_id +'/optimize/sla_report?interval=months')
  await nighthTab.wait(5000)
  await nighthTab.saveScreenshot('screenshots/nr-12month-sla')


  // Close the browser
  await browser.close()
  } catch (err) {
    console.log('ERROR!', err)
  }
}

navigateWebsite()
