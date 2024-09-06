// URL of the Openwhyd playlist in JSON format
const url = 'https://openwhyd.org/adrien?format=json';

// Function to fetch data and display it
async function fetchPlaylist() {
  const loadingIndicator = document.getElementById('loading');
  loadingIndicator.style.display = 'block';

  try {
    // Fetch the data from the URL
    const response = await fetch(url);
    
    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error('Failed to fetch data. Please try again later.');
    }
    
    // Parse the JSON data
    const data = await response.json();
    
    // Check if data is an array and display it
    if (Array.isArray(data)) {
      displayPlaylist(data);
    } else {
      document.getElementById('playlist').textContent = 'Unexpected data format.';
    }
  } catch (error) {
    document.getElementById('playlist').textContent = error.message;
  } finally {
    loadingIndicator.style.display = 'none';
  }
}

// Function to display the playlist
function displayPlaylist(data) {
  const playlistContainer = document.getElementById('playlist');
  playlistContainer.innerHTML = ''; // Clear any previous content

  // Create a list of tracks
  const trackList = document.createElement('ul');
  data.forEach(track => {
    const listItem = document.createElement('li');
    
    // Include track name and artist
    listItem.textContent = `${track.title || 'No Title Available'} - ${track.artist || 'Unknown Artist'}`;
    
    trackList.appendChild(listItem);
  });

  playlistContainer.appendChild(trackList);
}

// Add event listener for search functionality
document.getElementById('search').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const filteredData = data.filter(track => 
        (track.title && track.title.toLowerCase().includes(query)) || 
        (track.artist && track.artist.toLowerCase().includes(query))
      );
      displayPlaylist(filteredData);
    })
    .catch(error => console.error('Error filtering data:', error));
});

// Fetch the playlist when the page loads
fetchPlaylist();
