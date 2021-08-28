const getWeatherData = async (address) => {
  let res;
  let data;
  try {
    res = await fetch(`http://localhost:3000/weather?address=${address}`);
  } catch (error) {
    throw new Error('Failed to fetch details.');
  }
  data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
};

const weatherForm = document.querySelector('form');
const searchEl = document.querySelector('input');

const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  const address = searchEl.value;
  try {
    const { location, forecast } = await getWeatherData(address);
    messageOne.textContent = location;
    messageTwo.textContent = forecast;
  } catch (error) {
    messageOne.textContent = error.message;
    messageTwo.textContent = '';
  }
});
