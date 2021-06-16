import { renderData, prepareData } from "./solution";

fetch('https://api.spacexdata.com/v3/launches/past')
  .then(res => res.json())
  .then(data => {
  const preparedData = prepareData(data);
  renderData(preparedData);
});

