document.getElementById('github-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchQuery = document.getElementById('search').value.trim();
    if (searchQuery === '') {
      alert('Please enter a search query.');
      return;
    }
    searchUsers(searchQuery);
  });
  
  function searchUsers(searchQuery) {
    const apiUrl = `https://api.github.com/search/users?q=${searchQuery}`;  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        displayUsers(data.items);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; 
    users.forEach(user => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <img src='${user.avatar_url}' alt='${user.login}' width='50' height='50'>
        <a href='${user.html_url}' target='_blank'>${user.login}</a>
      `;
      listItem.addEventListener('click', function() {
        getUserRepos(user.login);
      });
      userList.appendChild(listItem);
    });
  }

  function getUserRepos(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        displayRepos(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  
  function displayRepos(repos) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = ''; 
    repos.forEach(repo => {
      const listItem = document.createElement('li');
      listItem.textContent = repo.full_name;
      reposList.appendChild(listItem);
    });
  }
  