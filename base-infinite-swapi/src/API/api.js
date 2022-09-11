export const fetchUrl = async (url) => {
  const response = await fetch(url);
  console.log(response);
  return response.json();
};


export const fetchSpeciesUrl = async (url) => {
  const response = await fetch(url);
  console.log(response);
  return response.json();
};