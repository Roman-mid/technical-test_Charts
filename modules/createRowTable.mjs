import createTd from "./createTd.mjs";

function createRowTable(context1, context2, context3, element) {
  const tr = document.createElement('tr');
  tr.append(createTd(context1, "table__name"));
  tr.append(createTd(context2, "table__count"));
  tr.append(createTd(context3, "table__percentages"));
  element.append(tr);
};

export default createRowTable;