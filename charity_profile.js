document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("volunteer-btn");
  const form = document.getElementById("volunteer-form");

  // Handle volunteer form display
  if (btn && form) {
    btn.addEventListener("click", function () {
      form.style.display = "block";
    });
  }

  const volunteerForm = document.getElementById("volunteer-form");
  if (volunteerForm) {
    volunteerForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent form submission

      // Get values from form
      let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      let phone = document.getElementById("phone").value;

      // Phone number validation
      let phonePattern = /^[0-9]{3}-[0-9]{2}-[0-9]{3}$/;

      if (name && email && phone) {
        if (phonePattern.test(phone)) {
          alert("Thank you for volunteering!");
        } else {
          alert("Please enter a valid phone number (e.g., 123-45-678).");
        }
      } else {
        alert("Please fill out all fields.");
      }
    });
  }

  // The code below is what's supposed to happen if everything worked properly but I've been getting errors and despite everything ive tried, I cannot figure it out.
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://api.every.org/v0.2/nonprofits?search_meta={ "query": "Uplift LGBTQ Youth Outreach Center", "distance": 100 }';

  // Fetch nonprofit data
  fetch(proxyUrl + apiUrl, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer pk_live_288211cfd6c477ce0eb899f3ac07190f'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); // For debugging 

    const apiDataDiv = document.getElementById('api-data');
    const charityName = document.getElementById('charity-name');

    if (apiDataDiv && data.nonprofit) {
      // Dynamically display the nonprofit name and description
      apiDataDiv.innerHTML = `
        <h2>${data.nonprofit.name}</h2>
        <p>${data.nonprofit.description}</p>
        <a href="${data.nonprofit.websiteUrl}" target="_blank">Visit Website</a>
      `;
      // Set the name in the header dynamically
      charityName.textContent = data.nonprofit.name;
    } else {
      apiDataDiv.innerHTML = `<p>Sorry, we couldn't retrieve nonprofit data.</p>`;
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
});
