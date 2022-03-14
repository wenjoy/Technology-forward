### devops平台搭建工具

`项目管理（PM）`：jira。运营可以上去提问题，可以看到各个问题的完整的工作流，待解决未解决等；

`代码管理`：gitlab。jenkins或者K8S都可以集成gitlab，进行代码管理，上线，回滚等；

`持续集成CI（Continuous Integration）`：gitlab ci。开发人员提交了新代码之后，立刻进行构建、（单元）测试。根据测试结果，我们可以确定新代码和原有代码能否正确地集成在一起。

`持续交付CD（Continuous Delivery）`：gitlab cd。完成单元测试后，可以把代码部署到连接数据库的 Staging 环境中更多的测试。如果代码没有问题，可以继续手动部署到生产环境中。

`镜像仓库`：VMware Harbor，私服nexus。

`容器`：Docker。

`编排`：K8S。

`服务治理`：Consul。

`脚本语言`：Python。

`日志管理`：Cat+Sentry，还有种常用的是ELK。

`系统监控`：Prometheus。

`负载均衡`：Nginx。

`网关`：Kong，zuul。

`链路追踪`：Zipkin。

`产品和UI图`：蓝湖。

`公司内部文档`：Confluence。

`报警`：推送到工作群。

作者：小龙飞
链接：https://juejin.cn/post/6934872015991996429
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



---

[万字长文带你彻底搞懂什么是 DevOps](https://dockone.io/article/2434765)

红帽的文章[了解 DevOps](https://www.redhat.com/zh/topics/devops)

Devops

 DevOps（Development和Operations的组合词）是一种重视“软件开发人员（Dev）”和“IT运维技术人员（Ops）”之间沟通合作的文化、运动或惯例。透过自动化“软件交付”和“架构变更”的流程，来使得构建、测试、发布软件能够更加地快捷、频繁和可靠。

---

持续交付和持续部署的区别看这三篇就能弄清楚：

amazon的这篇文章https://aws.amazon.com/cn/devops/continuous-delivery/

如何理解持续集成、持续交付、持续部署？ - yumminhuang的回答 - 知乎 https://www.zhihu.com/question/23444990/answer/89426003

红帽的这篇给我的感觉就是，持续交付是有持续交付的能力，就是说你的代码是随时能准备好上生产环境的。跟CI阶段比，多了test环境和stage环境的验证。

> 归根结底，我们没必要纠结于这些语义，您只需记得 CI/CD 其实就是一个流程（通常形象地表述为管道），用于实现应用开发中的高度持续自动化和持续监控。因案例而异，该术语的具体含义取决于 CI/CD 管道的自动化程度。许多企业最开始先添加 CI，然后逐步实现交付和部署的自动化（例如作为[云原生应用](https://www.redhat.com/zh/topics/cloud-native-apps)的一部分）。
>
> [CI/CD是什么？如何理解持续集成、持续交付和持续部署](https://www.redhat.com/zh/topics/devops/what-is-ci-cd)
>
> 

---

持续集成

[**持续集成，降低集成的痛苦**](https://support.huaweicloud.com/reference-devcloud/devcloud_reference_0016.html) 这个是节选*本文内容节选自《敏捷无敌之DevOps时代》，作者：王立杰、许舟平、姚冬（清华大学出版社）。*



