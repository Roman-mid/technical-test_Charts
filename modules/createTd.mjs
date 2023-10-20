
function createTd(context, nameClass) {
  const td = document.createElement('td');
  td.textContent = context;
  td.className = nameClass;
  return td
};

export default createTd;