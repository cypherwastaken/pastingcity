(function () {
  const createSearchPopup = () => {
    const overlay = document.createElement('div');
    overlay.id = 'searchOverlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(8px);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1000;
    `;

    const popup = document.createElement('div');
    popup.id = 'searchPopup';
    popup.style.cssText = `
      background: #1e1e1e;
      color: #fff;
      border-radius: 8px;
      padding: 20px;
      max-width: 600px;
      width: 90%;
      display: flex;
      flex-direction: column;
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 0.3s ease, transform 0.3s ease;
    `;

    popup.innerHTML = `
      <div class="search-container" style="display: flex; align-items: center; margin-bottom: 15px;">
        <input type="text" class="search-input" id="searchInput" placeholder="Search users..." style="flex-grow: 1; padding: 10px; border: 1px solid #444; border-radius: 4px; background: #333; color: #fff;">
        <button class="search-button" id="searchButton" style="background: #444; border: none; padding: 10px; border-radius: 4px; cursor: pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 20px; height: 20px;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M18.65 10.65a7.35 7.35 0 11-14.7 0 7.35 7.35 0 0114.7 0z" />
          </svg>
        </button>
      </div>
      <div class="user-list" id="userList" style="max-height: 300px; overflow-y: auto; margin-top: 20px; border: 1px solid #444; padding: 10px; border-radius: 5px;"></div>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.style.opacity = '1';
      popup.style.opacity = '1';
      popup.style.transform = 'scale(1)';
    }, 10);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePopup();
    });

    document.getElementById('searchButton').addEventListener('click', async () => {
      const input = document.getElementById('searchInput').value;
      const userList = document.getElementById('userList');

      userList.innerHTML = '<p>Loading...</p>';

      try {
        const response = await fetch(`https://api.photop.live/user/search?term=${encodeURIComponent(input)}&amount=15`);
        const users = await response.json();

        userList.innerHTML = '';

        users.forEach(user => {
          const userDiv = document.createElement('div');
          userDiv.className = 'user-item';
          userDiv.style.cssText = 'display: flex; align-items: center; padding: 10px; border-bottom: 1px solid #555; cursor: pointer;';
          userDiv.onclick = () => {
            window.location.href = `https://app.photop.live/?user=${user._id}#profile`;
          };

          const profilePic = document.createElement('img');
          const profilePicSrc = user.Settings?.ProfilePic === 'default'
            ? 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zY3JpcHQtMSIgaGVpZ2h0PSIxMDAiIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4gPHBhdGggZD0iTTEwMCAxMEw1MCAzMEw1MCA1MEwxMCA2MEw2MCA3MEw2MCA4MEw4MCA5MEw4MCAxMEw2MCAxMEw2MCAyMEwzOCA0MEwzOCAyMEwzMCAzMEwyMCAzMCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbGluZW1jYXBzPSJyb3VuZCIgZmlsbD0icm91bmQiIHN0cm9rZS1saW5lbm9nY2Fwcz0icm91bmQiIHN0cm9rZS1saW5lbW9nY2Fwcz0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZW1vZ25jYXA9InJvdW5kIiBzdHJva2UtbGluZW1vZ25jbGFzPSJyb3VuZCIgc3Ryb2tlLWxpbmVjbGFzcD0ibm9uZSIgc3Ryb2tlLWxpbmVsZXggc3Ryb2tlLXRyYXRhY3Qgc3Ryb2tlLWhhbmRwY2luPSJzY3JpcHQtMyIvPg=='
            : `https://photop-content.s3.amazonaws.com/ProfileImages/${user.Settings?.ProfilePic || 'default.jpg'}`;
          profilePic.src = profilePicSrc;
          profilePic.alt = `${user.User}'s profile picture`;
          profilePic.style.cssText = 'width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;';

          const username = document.createElement('span');
          username.textContent = user.User;
          username.style.cssText = 'color: #ccc;';

          userDiv.appendChild(profilePic);
          userDiv.appendChild(username);

          userList.appendChild(userDiv);
        });
      } catch (error) {
        userList.innerHTML = '<p style="color: #f00;">Error loading users. Please try again later.</p>';
        console.error(error);
      }
    });
  };

  const closePopup = () => {
    const overlay = document.getElementById('searchOverlay');
    if (overlay) {
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 300);
    }
  };

  const opensearch = () => {
    if (!document.getElementById('searchOverlay')) createSearchPopup();
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'F2') {
      if (!document.getElementById('searchOverlay')) createSearchPopup();
    }
  });

  const newPostButtonsDiv = document.querySelector('.newPostButtons');

  const pollElement = document.getElementById('poll');
  if (!document.getElementById('searchuser')) {
    const newButton = document.createElement('button');
    newButton.classList.add('postActionButton');
    newButton.id = 'searchuser';
    newButton.onclick = opensearch;

    newButton.innerHTML = `
      <svg style="position: relative; height: 100%; width: 100%; cursor: pointer;" id="ConfigurePostButtonSvg" viewBox="0 0 513.607 513.607">
        <g id="ConfigurePostButtonG" fill="var(--themeColor)" stroke="#ffffff" stroke-width="0">
          <path d="m503.384 243.685c-30.059-12.05-58.533-34.623-82.345-65.281-24.287-31.271-43.862-71.117-56.609-115.233l-14.588-50.485c-1.854-6.418-7.729-10.836-14.41-10.836s-12.556 4.418-14.41 10.836l-14.587 50.484c-12.747 44.116-32.322 83.964-56.609 115.233-23.812 30.658-52.286 53.231-82.346 65.281-5.61 2.249-9.322 7.645-9.417 13.688-.095 6.044 3.446 11.554 8.983 13.977l4.663 2.041c59.676 26.122 108.444 90.453 133.8 176.5l15.534 52.718c1.88 6.38 7.737 10.76 14.389 10.76s12.508-4.38 14.389-10.76l15.535-52.718c25.355-86.047 74.124-150.378 133.801-176.5l4.662-2.041c5.536-2.424 9.079-7.934 8.983-13.977-.095-6.043-3.807-11.439-9.417-13.688zm-91.172 47.726c16.416 21.648 30.609 45.268 43.42 69.309l-20.132 9.898c-12.801-20.649-26.456-39.87-41.898-58.713l-25.707 17.039c3.743 6.343 7.566 12.688 11.237 19.147zm-143.623-26.004c-23.892 0-43.298-19.408-43.298-43.298 0-23.892 19.408-43.298 43.298-43.298 23.892 0 43.298 19.408 43.298 43.298 0 23.89-19.407 43.298-43.298 43.298zm141.103 49.675c-17.413-22.99-36.316-44.387-56.67-63.201-12.576-10.734-25.699-21.177-39.556-30.379-11.099-7.715-22.795-14.717-34.936-20.302-6.178-3.553-13.056-4.902-20.557-4.249-15.67 1.207-30.288 6.621-44.116 13.87l-5.801 3.224c6.692 5.456 12.58 12.517 17.344 20.333 4.246 7.358 8.193 15.257 11.754 23.078zm-146.46 80.625c-13.594-12.379-27.027-22.934-41.898-32.74l-23.405 16.124c12.684 18.68 27.444 36.788 42.755 55.509l20.494-17.363c-5.46-5.156-11.45-9.254-17.443-13.523zm206.187-77.415c-9.224-10.891-18.859-21.373-28.566-31.881l-21.681 16.518c12.703 16.9 24.516 34.25 35.215 52.569l19.46-12.671c-5.88-7.586-12.03-15.506-18.594-23.435z"></path>
        </g>
      </svg>
    `;
    newPostButtonsDiv.appendChild(newButton);
  }
})();
