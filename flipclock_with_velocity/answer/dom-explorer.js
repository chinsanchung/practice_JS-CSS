export default (el, f = () => {}) => {
  const stack = [el];
    
  let i = 0;

  let target;
  while(stack.length) {
    target = stack.shift();
    if (target.children && target.children.length) {
      for (const childEl of target.children) stack.push(childEl);
      f(target);
    }
    console.log(target);
  }
};

