export default async function getJSONData({ URL, options }) {
  const result = {};

  try {
    let response = '';

    if (!options) {
      response = await fetch(URL);
    } else {
      response = await fetch(URL + options);
    }

    if (response.ok) {
      const json = await response.json();
      result.status = 'ok';
      result.body = json;
    } else {
      throw Error(response.statusText);
    }
  } catch (err) {
    result.status = 'error';
    result.errorMessage = err.message;
    result.body = {};
  }

  return result;
}
