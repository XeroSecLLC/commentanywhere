chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'submitComment') {
    // Store the comment in a database or local storage
    // Example with local storage:
    const commentsKey = `comments_${request.url}`;
    chrome.storage.local.get([commentsKey], (result) => {
      let comments = result[commentsKey] || [];
      comments.push(request.comment);
      chrome.storage.local.set({[commentsKey]: comments}, () => {
        sendResponse({status: 'success'});
      });
    });
    return true; // Required when using asynchronous sendResponse
  }

  if (request.action === 'getComments') {
    const commentsKey = `comments_${request.url}`;
    chrome.storage.local.get([commentsKey], (result) => {
      sendResponse({comments: result[commentsKey] || []});
    });
    return true; // Required for async
  }
});
