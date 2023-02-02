const successFormHandler = async (event) => {
    event.preventDefault();
  
    if (?) {
      
      const response = await fetch(`/success`, {
        method: 'GET',
        body: JSON.stringify({ model, pictureId, make, year}),
        headers: {'Content-Type': 'application/json'},
      });
  
      if (response.ok) {
        document.location.replace('/success');
      } else {
        alert('Payment Failed! Please try again');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    debugger;
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/cars/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete car');
      }
    }
  };
  
  document
    .querySelector('.buy')
    .addEventListener('click', successFormHandler);
  
  document
    .getElementById('#deletethis')
    .addEventListener('click', delButtonHandler);
  