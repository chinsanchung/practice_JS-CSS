const printTags = (el) => {
  console.log(el);
  for (const child of el.children) {
    if (child.children.length > 0) printTags(child);
  }
}

printTags(document.querySelector('.container'));
