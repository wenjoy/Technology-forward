G7 GitLab CI/CD 实践
什么是CI/CD
continuous integration
持续集成是一种软件开发实践。在持续集成中，团队成员频繁集成他们的工作成果，一般每人每天至少集成一次，也可以多次。每次集成会经过自动构建（包括自动测试）的验证，以尽快发现集成错误。许多团队发现这种方法可以显著减少集成引起的问题，并可以加快团队合作软件开发的速度。


 continuous delivery
采用持续交付时，系统会构建并测试每一个代码变更，然后将其推送到非生产测试环境或临时环境中。生产部署前可能存在多个并行测试阶段。持续交付与持续部署之间的区别在于，需要手动批准才能更新到生产环境


 continuous deployment
对于持续部署，生产会在没有明确批准的情况下自动发生。 


为什么要CI/CD
- 软件交付缓慢
- 代码冲突问题
- 出错概率增加
- 排查错误困难
- 客户不满

有了CI/CD后：
- 尽早反馈，尽早发现错误
- 减少集成问题，每次发现问题当时解决，避免问题堆积
- 每次更改都能成功发布，降低发布风险

持续集成实践有一个基本的思想就是：越是痛苦的事情，越要经常做
怎么实践CI/CD
- gitlab CI
- Jenkins
- Travis
- Github action
- Drone 
- 自研Devops

Gitlab CI
GitLab CI/CD 是一个内置在GitLab中的工具，用于通过持续方法进行软件开发
以gui/design repo为例演示
1. 介绍pipeline页面的功能
2. 介绍gui配置的gitlab-ci配置文件
3. 介绍如何设置gitlab的pipeline
4. 提一个MR来演示工作流
5. 介绍下一步CD配置计划
G7 GitLab CI/CD实践指南 
Jenkins 
Jenkins是一个开源的、提供友好操作界面的持续集成(CI)工具
借图片简单介绍一下，让大家有个印象即可




Github action
用一个demo repo演示

---

iG7 GitLab CI/CD实践指南
为什么需要 CI/CD
尽早反馈，尽早发现错误
减少集成问题，每次发现问题当时解决，避免问题堆积
每次更改都能成功发布，降低发布风险

如何实践
持续集成 
Gitlab pipeline 搭建步骤
首先你需要一台你能控制的机器，最好是一台vps，我们需要在这个台机器上运行gitlab runner 服务，为gitlab配置pipeline做准备。
准备工作比较简单，执行以下两个命令即可：
1. 启动gitlab runner docker
 docker run -d --name gitlab-runner --restart always \
     -v /srv/gitlab-runner/config:/etc/gitlab-runner \
     -v /var/run/docker.sock:/var/run/docker.sock \
     gitlab/gitlab-runner:latest

如果启动成功，运行docker ps 会看到类似下图

2. 运行注册命令
docker exec -it <container_id> gitlab-runner register

<container_id> 即前一步创建容器的id, 在我们这个例子里就是上图中黄色高亮部分的字符串
会进入交互式命令行，程序会以问答形式引导你完成注册，下面我们会一步一步详细描述过程
首先你会看到：
Enter the GitLab instance URL (for example, https://gitlab.com/):
这个就是需要知道你的gitlab url，一般在你gitlab 仓库设置中可以看到
打开你gitlab仓库的Settings -> CI/CD Pipelines，会看到如下图的样子，其中红色和蓝色的框是我标注出来的，我们马上会用到

填入上图红色框中的url https://git.chinawayltd.com/ci，回车就会进入下一个问题：
Enter the registration token:
这个是识别你仓库的，可以理解为它的id，填入上图中蓝色框中的字符串即可，我们例子中的就是这个：KkVaikhzCFMAn6h33_nz 你要按照你的页面中显示的实际内容来填
Enter a description for the runner:
这个是描述，随便填
Enter tags for the runner (comma-separated):
这个是标签，在gitabl-ci.yml里配置要跟这个匹配，我们这个例子我写了两个oms, plugin，你可以根据你的实际情况来起名字，然后你应该能看到下面这样成功的提示：
Registering runner... succeeded                     runner=KkVaikhz
到这里我们就几乎要成功了，接着还有两个小问题，照着我们例子中的填就行
Enter an executor: docker, parallels, ssh, docker+machine, docker-ssh+machine, custom, docker-ssh, shell, virtualbox, kubernetes:
docker
Enter the default Docker image (for example, ruby:2.6):
node:16.13.0
Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!
到这里runner就注册成功了。接下来我们需要在gitlab仓库中进行配置
3. 配置gitlab-ci.yml
在你的gitalb project根目录添加gitlab-ci.yml文件，然后push的gitlab仓库。下面是一个可参考的例子：
image: node:16.13.0 //docker 镜像，前端项目都可以用这个

before_script: //每个stage中的任务执行前需要执行的命令
  - yarn
stages: //pipeline需要的阶段，比如我们这里就代表我的pipeline有两个阶段，lint和test
  - lint
  - test
lint: //这个是job，job是每个stage要做的具体内容，比如我们这个lint就是是在lint stage执行一个 npm run lint的命令，由于是在你的project里执行，所以你的project要有这个命令
  stage: lint
  script:
    - npm run lint
  tags:
    - oms //NOTE： 注意⚠️，这里就是我们前面说的标签，我用黄色高亮标记的地方，一定要匹配才行
test:
  stage: test
  script:
    - npm run test
  tags:
    - oms

如果你有更多定制的内容，或者想玩高级点的可以参考这里：https://git.chinawayltd.com/help/ci/yaml/README.md
配置完成并且提交到仓库中后，我们就完成所有工作了，接下来就可以看看我们的gitlab CI效果了
4. 我们可以试着提交一个MR，如果前面按照我们的教程完整操作下来，你应该会看到MR界面会多出来一个绿色的pipeline标志，如下图：

点击绿色的勾可以查看pipeline详情

可以很直观的看到我们的pipeline由lint和 test两个stage组成，lint成功后会继续检查test的运行情况，如果失败pipeline即终止
5. 你也可以在gilab的pipeline中查看所有历史记录

如果看到pipeline失败，点击红色的x，可以看到job运行的详情以及失败的原因


6. 推荐的combo配置
打开gitlab的Settings -> General

把这两个勾上，这样pipeline和code review都没有问题的MR才能被合并
这样借助Gitlab我们就可以实践持续集成，所有的代码都会经过流水线检查后并入，提高入库代码质量和生产效率
实践案例
目前我们在GUI项目https://git.chinawayltd.com/g7fe/gui/gui-design 落地了Gitlab CI，所有的MR都会经过pipeline检查后才能合并。
GUI的一个典型工作流程是：
需求确认 -> Coding -> 提交MR -> Pipeline检查 -> Code review -> MR 合并。
如果pipeline检查失败，MR提交者需要检查自己的代码，保证pipeline通过。
重要警示
目前我们的gitlab runner是自己维护，之前跟公司运维沟通得知公司会有升级gitlab的计划，具体时间不定，但是可能会影响到我们自己维护的gitlab runner。这个风险需要提前知悉。
持续交付
GUI目前的只有两个stage：lint和test，后面计划要实现自动打包并发版，需要新增两个stage： build和publish。实现自动打包发布需要坚实的UT作为基础，这个是下个阶段的目标。



