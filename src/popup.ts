document.getElementById('submit').addEventListener('click', () => {
  const comment = document.getElementById('comment').value;
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.runtime.sendMessage({action: 'submitComment', comment, url: tabs[0].url}, (response) => {
      document.getElementById('status').textContent = 'Comment submitted!';
      document.getElementById('comment').value = '';
    });
  });
});
