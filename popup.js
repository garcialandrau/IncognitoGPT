document.getElementById('toggleButton').onclick = function() {
  var button = document.getElementById('toggleButton');
  chrome.storage.sync.get('proxyEnabled', function(data) {
    var newSetting = !data.proxyEnabled;
    chrome.storage.sync.set({proxyEnabled: newSetting}, function() {
      button.innerText = newSetting ? 'Disable Proxy' : 'Enable Proxy';
    });
  });
}

window.onload = function() {
  chrome.storage.sync.get(['proxyEnabled', 'proxyHost', 'proxyPort'], function(data) {
    document.getElementById('proxyHost').value = data.proxyHost || '';
    document.getElementById('proxyPort').value = data.proxyPort || '';
    document.getElementById('toggleButton').innerText = data.proxyEnabled ? 'Disable Proxy' : 'Enable Proxy';
  });
}

document.getElementById('proxyHost').onchange = function() {
  chrome.storage.sync.set({proxyHost: this.value}, function() {});
}

document.getElementById('proxyPort').onchange = function() {
  chrome.storage.sync.set({proxyPort: this.value}, function() {});
}
