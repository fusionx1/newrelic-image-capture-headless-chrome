const HeadlessChrome = require('simple-headless-chrome')

const browser = new HeadlessChrome({
  headless: false,
  chrome: {
      flags: [
        '--disable-popup-blocking'
      ]
  }
})
async function navigateWebsite() {
  await browser.init({
    startNewFirstTab: false // Only if you use a version > 3.3.0. If you use >= 4.0.0, you don't need to add this setting
  })

  const mainTab = await browser.newTab({
    privateTab: false // Optional. Defaults to false
  })

  const args = process.argv;
  var yubi_key = process.argv[2];
  var site_uuid = process.argv[3];
  var newrelic_id = process.argv[4];
  var newrelic_app_id = process.argv[5];


  ///////////////////////////////
  // Navigate to a onelogin page
  //////////////////////////////
  await mainTab.goTo('https://pantheon.onelogin.com/login')
  await mainTab.fill('#user_email', 'xxxxxxxxx')
  // Type in an element
  await mainTab.fill('#user_password', 'xxxxxxxxx')
  await mainTab.click('#user_submit')
  await mainTab.log('Click login')
  await mainTab.log('Wait 5 seconds')
  await mainTab.wait(5000)
  await mainTab.saveScreenshot('./onelogin.png')
  await mainTab.log('Took a screenshot of the onelogin form')
  await mainTab.fill("input[name='otp_token_1']", yubi_key)
  // Just added yubi key
  await mainTab.click('#user_submit')
  await mainTab.log('Wait 5 seconds')
  await mainTab.wait(5000)
  await mainTab.saveScreenshot('./added-yubi.png')
  await mainTab.log('Took a screenshot of the onelogin form with yubikey')
  // Click on a button
  await mainTab.click('#browser_submit')
  await mainTab.wait(5000)
  await mainTab.log('wait 5s.')

  ///////////////////////////////
  // Navigate to a onelogin page
  //////////////////////////////
  await mainTab.log('Finally logging in successfully to one login')
  await mainTab.wait(5000)
  await mainTab.log('wait 5s.')
  await mainTab.saveScreenshot('./onelogin-dashboard')
  await mainTab.goTo('https://pantheon.onelogin.com/client/apps/select/73297966')
  await mainTab.log('clicked to authenticate pantheon admin dashoard')


  ///////////////////////////////////////
  // Navigate to pantheon admin dashboard
  ///////////////////////////////////////
  await  mainTab.wait(5000)
  await  mainTab.log('wait 5s.')
  await  mainTab.wait(5000)
  await  mainTab.log('wait 5s..')
  await  mainTab.wait(5000)
  await  mainTab.log('wait 5s...')
  await  mainTab.saveScreenshot('./pantheon-admin-dashboard.png')
  await  mainTab.log('screenshot pantheon admin dashboard')
  await  mainTab.goTo('https://admin.dashboard.pantheon.io/sites/' + site_uuid + '#live/new_relic/NewRelic')
  await  mainTab.log('navigate to the site where audit will take place111111111111')
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
  await  mainTab.saveScreenshot('./site-dashboard-tobe-audited.png')
  await  mainTab.log('navigate to the site where audit will take place1a')
  await  mainTab.click('#sso-form > button')
  await  mainTab.log('navigate to the site where audit will take place1b')
  await  mainTab.wait(5000)



  ///////////////////////////////////////
  // Navigate to New Relic Dashboard
  ///////////////////////////////////////

  const secondTab = await browser.newTab({
    privateTab: false // Optional. Defaults to false
  })
  
  await secondTab.saveScreenshot('./nr-overview.png')
  await secondTab.log('finally landed to newrelic dashboard')
  await secondTab.goTo('https://rpm.newrelic.com/accounts/' + newrelic_id + '/applications/' + newrelic_app_id)
  await secondTab.log('navigate to the site where audit will take place1')
  await secondTab.wait(5000)
  await secondTab.log('wait 5s.')
  await secondTab.saveScreenshot('./site-dashboard-tobe-audited.png')
  await secondTab.wait(5000)
  await secondTab.log('navigate to the site where audit will take place2')
  await secondTab.wait(5000)
  await secondTab.click('#time_window_nav > h4')
  await secondTab.wait(2000)
  await secondTab.saveScreenshot('./set-7days.png')
  await secondTab.click('a[data-open-duration="last_7_days"]')
  await secondTab.wait(1000)
  await secondTab.saveScreenshot('./set-7days.png')
  await secondTab.wait(5000)
  await secondTab.saveScreenshot('./metrics-7days.png')



  ///////////////////////////////////////
  // Navigate to New relic dashboard
  ///////////////////////////////////////


  // Close the browser
  await browser.close()
}

navigateWebsite()
