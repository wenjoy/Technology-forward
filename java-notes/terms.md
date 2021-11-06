# Terms

## tomcat 
## servlet
## JPA
- Java 持久化 API (JPA)是一个 Java 应用程序接口 规范
- 
## Hibernate
- Hibernate是一种Java语言下的对象关系映射(ORM)解决方案 
- 2003年9月，Hibernate开发团队进入JBoss公司，开始全职开发Hibernate，从这个时候开始Hibernate得到了突飞猛进的普及和发
## mybatis
- MyBatis是一个Java持久化框架
- 它通过XML描述符或注解把对象与存储过程或SQL语句关联起来
## kitManager
## Ivy
Apache Ivy是一个管理项目依赖的工具
- ant
- maven
## JSP
JSP全名为Java Server Pages
## Spring

## JavaBean
JavaBean 是一种JAVA语言写成的可重用组件。JavaBean符合一定规范编写的Java类，不是一种技术，而是一种规范
它的方法命名，构造及行为必须符合特定的约定：

所有属性为private。

这个类必须有一个公共的缺省构造函数。即是提供无参数的构造器。

这个类的属性使用getter和setter来访问，其他方法遵从标准命名规范。

这个类应是可序列化的。实现serializable接口。



## POJO
"Plain Ordinary Java Object"，简单普通的java对象。主要用来指代那些没有遵循特定的java对象模型，约定或者框架的对象

 ## JDK, JRE, JVM
 JDK 就是java开发的全家桶，包括了JRE和JVM，以及一些工具，像是javac用来编译java代码到class字节码

JRE更轻量，只为了运行class字节码，是个RUN time。不编译，一般服务器上可以只装个JRE

JVM就是虚拟机

可以参考这篇，讲得很清晰了：[面经手册 · 第23篇《JDK、JRE、JVM，是什么关系？》](https://segmentfault.com/a/1190000038620833)



## 安装JDK

`brew install --cask homebrew/cask-versions/adoptopenjdk8`

jdk太混乱了，有多个版本，最主要的是orcale的和第三方adopt OpenJDK， 安装参考[macOS 所有版本 JDK 安装指南 (with Homebrew)](https://www.cnblogs.com/imzhizi/p/macos-jdk-installation-homebrew.html)

## 安装Maven

`brew install maven`

`mvn -v` 查看版本

java到依赖管理， 类比node的NPM，廖雪峰的教程讲得很详细了[Maven介绍](https://www.liaoxuefeng.com/wiki/1252599548343744/1309301146648610)

## JAVA_HOME

Maven 管理的项目启动过程报错，设置了java home就可以了

```bash
module jdk.compiler does not export com.sun.tools.javac.processing to unnamed module @0x5803052
```

有些java的框架会用到这个环境变变量，所以玩java项目最好设置好这个，以免不必要的麻烦，细节可以参考这篇文章[Java为什么要设置环境变量、JAVA_HOME](https://blog.csdn.net/u010297957/article/details/51334951)

Mac 下java home的路径一般是这样的：

`/Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home`

## JAR包是什么

是个java的各种文件的压缩包，有的jar包是可执行的，执行命令：

`java -jar test.jar` 可以参考这篇文章[关于 JAR 包我们应该知道的](https://www.jianshu.com/p/2b2e7d7fb160)
