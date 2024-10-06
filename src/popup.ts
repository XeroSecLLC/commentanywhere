type CommentMessage = {
  action: 'submitComment' | 'getComments';
  comment: string;
  url?: string;
}

// Get DOM elements with proper type assertions once at the start
const _submitButton = document.getElementById('submit');
const _commentInput = document.getElementById('comment') as HTMLTextAreaElement | HTMLInputElement;
const statusElement = document.getElementById('status');

// Add null checks before adding event listener
if (submitButton && commentInput && statusElement) {
  console.log({commentInput});

  submitButton.addEventListener('click', (): void => {
    const comment = commentInput.value;

    chrome.tabs.query(
      { active: true, currentWindow: true },
      (tabs): void => {
        // Make sure we have a valid tab and URL
        if (tabs[0]?.url) {
          chrome.runtime.sendMessage(
            {
              action: 'submitComment' as const,
              comment,
              url: tabs[0].url,
            } satisfies CommentMessage,
            (response): void => {
              statusElement.textContent = 'Comment submitted!';
              commentInput.value = '';
            }
          );
        } else {
          statusElement.textContent = 'Error: Could not determine current page URL';
        }
      }
    );
  });
}

// Add error handling if elements aren't found
else {
  console.error('Required DOM elements not found:', {
    submitButton: !!submitButton,
    commentInput: !!commentInput,
    statusElement: !!statusElement
  });
}
