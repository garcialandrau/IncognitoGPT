chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    if (key === 'proxyEnabled' || key === 'proxyHost' || key === 'proxyPort') {
      updateProxy();
    }
  }
});

function updateProxy() {
  chrome.storage.sync.get(['proxyEnabled', 'proxyHost', 'proxyPort'], function(data) {
    var config = data.proxyEnabled ? {
      mode: "fixed_servers",
      rules: {
        singleProxy: {
          scheme: "http",
          host: data.proxyHost,
          port: parseInt(data.proxyPort)
        },
        bypassList: ["foobar.com"]
      }
    } : { mode: 'direct' };

    chrome.proxy.settings.set({value: config, scope: 'regular'}, function() {});

    // Set the icon based on the proxy status.
    var iconPath = data.proxyEnabled ? 'images/enabled.png' : 'images/disabled.png';
    chrome.action.setIcon({ path: iconPath });
  });
}
