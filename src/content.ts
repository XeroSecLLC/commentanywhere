type _CommentMessage = {
  action: 'submitComment' | 'getComments';
  comment: string;
  url?: string;
}

type _CommentResponse = {
  comments: string[];
}

type _Comment = {
  id: string;
  text: string;
  timestamp: string;
}

// Check if we are on a specific URL
  const commentBox = document.createElement('div');
  commentBox.innerHTML = `
    <div style="position: fixed; bottom: 10px; right: 10px; width: 300px; height: 200px; background-color: white; border: 1px solid #ccc; padding: 10px; z-index: 1000;">
      <textarea id="commentInput" style="width: 100%; height: 120px;"></textarea>
      <button id="submitComment">Submit Comment yo dawg</button>
      <div id="commentsSection"></div>
    </div>
  `;
  document.body.appendChild(commentBox);

  // Get elements with proper type assertions
  const submitButton = document.getElementById('submitComment');
  const commentInput = document.getElementById('commentInput') as HTMLTextAreaElement;
  const commentsSection = document.getElementById('commentsSection');

  if (submitButton && commentInput && commentsSection) {
    console.log('yo dawg');

    // Add click event listener
    submitButton.addEventListener('click', (): void => {
      console.log('button submitted');
      const comment = commentInput.value;

      // Submit comment
      chrome.runtime.sendMessage(
        {
          action: 'submitComment' as const,
          comment,
          url: window.location.href,
        } satisfies _CommentMessage,
        (response): void => {
          alert('Comment submitted!');
          commentInput.value = '';
        }
      );
    });

    // Load comments
    chrome.runtime.sendMessage(
      {
        action: 'getComments' as const,
        url: window.location.href,
      } as _CommentMessage,
      (response: _CommentResponse): void => {
        response.comments.forEach((comment: string): void => {
          const commentElem = document.createElement('p');
          commentElem.textContent = comment;
          commentsSection.appendChild(commentElem);
        });
      }
    );
  }
