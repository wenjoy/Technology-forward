我想取到页面上form的值，然后用axios发送请求出去。发现自己到form和formdata的认识还很欠缺。

取form的值倒是简单，可以用formData很容易做到new FormData(document.myForm)，但是用axios发出的时候，服务端报错，因为服务端要求application/x-www-form-urlencoded。查了一下才知道，只要发的是formdata，就只能是**`multipart/form-data`** 格式。

> FormData will always be sent as **`multipart/form-data`**.
>
> If you want to send FormData as **`x-www-form-urlencoded`**, encode the content items:

要手动编码成urlencoded，参考：[new FormData() "application/x-www-form-urlencoded"](https://stackoverflow.com/questions/7542586/new-formdata-application-x-www-form-urlencoded)

multipart/form-data 和x-www-form-urlencoded 的不同，这篇文章介绍得很详细：https://dev.to/getd/x-www-form-urlencoded-or-form-data-explained-in-2-mins-5hk6

[How to Convert HTML Form Field Values to a JSON Object](How to Convert HTML Form Field Values to a JSON Object)

最后用了jquery的form.serialize()最简单