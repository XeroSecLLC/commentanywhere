// Check if we are on a specific URL
if (window.location.href.includes("example.com/specific-page")) {
  const commentBox = document.createElement('div');
  commentBox.innerHTML = `
    <div style="position: fixed; bottom: 10px; right: 10px; width: 300px; height: 200px; background-color: white; border: 1px solid #ccc; padding: 10px; z-index: 1000;">
      <textarea id="commentInput" style="width: 100%; height: 120px;"></textarea>
      <button id="submitComment">Submit Comment</button>
      <div id="commentsSection"></div>
    </div>
  `;
  document.body.appendChild(commentBox);

  document.getElementById('submitComment').addEventListener('click', () => {
    const comment = document.getElementById('commentInput').value;
    // Call backend to submit the comment
    chrome.runtime.sendMessage({action: 'submitComment', comment, url: window.location.href}, (response) => {
      alert('Comment submitted!');
      document.getElementById('commentInput').value = '';
    });
  });

  // Load comments for this page
  chrome.runtime.sendMessage({action: 'getComments', url: window.location.href}, (response) => {
    const commentsSection = document.getElementById('commentsSection');
    response.comments.forEach(comment => {
      const commentElem = document.createElement('p');
      commentElem.textContent = comment;
      commentsSection.appendChild(commentElem);
    });
  });
}
