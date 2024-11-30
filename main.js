document.getElementById('policy-form').addEventListener('submit', function (event) {
  event.preventDefault(); 


  const age = parseInt(document.getElementById('age').value);
  const health = document.getElementById('health').value;
  const preferences = document.getElementById('preferences').value;

  // Ask for family plan details if selected
  const isFamilyPlan = preferences.toLowerCase().includes("family");
  let familyMembers = 1; 
  if (isFamilyPlan) {
    familyMembers = parseInt(prompt("Enter the number of people covered in the family plan:", 2));
    if (isNaN(familyMembers) || familyMembers <= 0) {
      alert("Invalid number of family members. Please try again.");
      return;
    }
  }

  const recommendations = getRecommendations(age, health, familyMembers);

  // Display the results
  displayResults(recommendations, preferences, familyMembers);
});

// Function to fetch policy recommendations
function getRecommendations(age, health, familyMembers) {

  const policies = [
    {
      name: 'Basic Health Plan',
      minAge: 18,
      maxAge: 30,
      health: 'Good',
      coverage: 'Minimal',
      price: '$50/month',
    },
    {
      name: 'Family Health Plan',
      minAge: 30,
      maxAge: 50,
      health: 'Average',
      coverage: 'Moderate',
      price: `$120/month + $30/person`,
    },
    {
      name: 'Comprehensive Plan',
      minAge: 50,
      maxAge: 100,
      health: 'Poor',
      coverage: 'Extensive',
      price: '$250/month',
    },
  ];

  return policies.filter(policy => {
    return (
      age >= policy.minAge &&
      age <= policy.maxAge &&
      policy.health.toLowerCase() === health.toLowerCase()
    );
  }).map(policy => {
    
    if (policy.name === 'Family Health Plan' && familyMembers > 1) {
      const basePrice = 120; 
      const additionalPersonCost = 30; 
      policy.price = `$${basePrice + (familyMembers * additionalPersonCost)}/month`;
    }
    return policy;
  });
}


function displayResults(recommendations, preferences, familyMembers) {
  const resultsDiv = document.getElementById('results');
  const resultsSection = document.getElementById('results-section');

  
  resultsDiv.innerHTML = '';

  if (recommendations.length === 0) {
    
    resultsDiv.innerHTML =
      '<p>No matching policies found. Please adjust your criteria and try again.</p>';
  } else {
    
    recommendations.forEach(policy => {
      const policyDiv = document.createElement('div');
      policyDiv.className = 'policy';
      policyDiv.innerHTML = `
        <h3>${policy.name}</h3>
        <p><strong>Coverage:</strong> ${policy.coverage}</p>
        <p><strong>Price:</strong> ${policy.price}</p>
        <p><strong>Number of People:</strong> ${familyMembers}</p>
        <p><strong>Preferences:</strong> ${preferences || 'Not specified'}</p>
      `;
      resultsDiv.appendChild(policyDiv);
    });
  }

  resultsSection.classList.remove('hidden');
}
