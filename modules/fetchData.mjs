async function fetchData() {
  try {
      const data = await fetch("https://substantive.pythonanywhere.com/");
      const resp = await data.json();
      const userActive = await resp.interactions;
      return userActive
  } catch (error) {
      alert(`An error occurred: ${error.message}`)
  }

};

export default fetchData;