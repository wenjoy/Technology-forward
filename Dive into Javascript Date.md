昨天遇到个问题，在 Jenkins 上跑 UT 的时候挂掉了，但在本地是一切顺利。查看 log 发现是 snapshot 不匹配，diff 的地方是个 date string。同事有提出是因为`new Date`的时候没有传入时区。结果传入时区`new Date('2019-01-01T00:00:00.000Z')`还是不对，遂研究了一翻，记录于此。

首先大谬之处在于，`new Date` 的时候是不接受时区的。想要改变时区的话，在 nodejs 中，可以通过改变环境变量`process.env.TZ`来办到。

## Reference1.