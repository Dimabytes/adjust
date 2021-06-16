const checkNASAInCustomers = (payloads) => payloads.some(p => p.customers.join(' ').includes('NASA'))

const compareLaunches = (a, b) => {
  const aPayloadsCount = a.rocket.second_stage.payloads.length;
  const bPayloadsCount = b.rocket.second_stage.payloads.length;
  if(aPayloadsCount !== bPayloadsCount) {
    return bPayloadsCount - aPayloadsCount;
  }
  return new Date(b.launch_date_utc).getTime() - new Date(a.launch_date_utc).getTime();
}

const prepareData = (rawData) => {
  return rawData
    .filter(el => el.launch_year === '2018' && checkNASAInCustomers(el.rocket.second_stage.payloads))
    .sort(compareLaunches)
    .map(el => ({
      flight_number: el.flight_number,
      mission_name: el.mission_name,
      payloads_count: el.rocket.second_stage.payloads.length,
    }));
}

const renderData = (data) => {
  document.getElementById('out').textContent = JSON.stringify(data, null, 2)

}

module.exports = {
  prepareData: prepareData,
  renderData: renderData
};
