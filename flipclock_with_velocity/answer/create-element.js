export default (name, { children, parent, attrs, callback }) => {
  const el = document.createElement(name);
  if (attrs) for (const key in attrs) el.setAttribute(key, attrs[key]);
  if (parent) parent.appendChild(el);
  if (children && children.length) for (const child of children) el.appendChild(child);
  if (callback) callback(el);
  return el;
};