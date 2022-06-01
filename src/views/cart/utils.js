function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function genItemClassNames(className, id) {
  return `${className} ${className}-${id}`;
};

function genDatasetIdAttr(id) {
  return `data-id="${id}"`;
}
