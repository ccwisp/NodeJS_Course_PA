const p1 = () => {
  return new Promise((r) => {
    setTimeout(() => r('Promise Number 1 '), 3000);
  });
};

const p2 = () => {
  return new Promise((r) => {
    setTimeout(() => r('Promise Number 2'), 2000);
  });
};

const coroutine = (generator) => {
  const iterator = generator();
  (nextTick = (val) => {
    const next = iterator.next(val);
    //console.log(`val is ${val}`);
    if (next.done) return next.value;
    return Promise.resolve(next.value).then(nextTick, (err) =>
      Promise.resolve(iterator.throw(err)).then(nextTick)
    );
  })();
};

coroutine(function* () {
  console.log('Let`s start!!!🎶');
  const v1 = yield p1();
  console.log('First ', v1);
  const v2 = yield p2();
  console.log('Last ', v2);
});
