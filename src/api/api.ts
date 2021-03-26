export async function getApi() {
  try {
    const response = await fetch('https://www.cbr-xml-daily.ru/latest.js');
    const json: any = await response.json();
    if (!json.rates) {
      console.log('Not found')
      return {}
    }
    return json.rates
  } catch (error) {
    console.log(error)
  }
}
