async function fetchData(link) {
  try {
      const data = await fetch(link);
      const resp = await data.json();
      const userActive = await resp.interactions;
      return userActive
  } catch (error) {
      alert(`An error occurred: ${error.message}`)
  }

};

export default fetchData;