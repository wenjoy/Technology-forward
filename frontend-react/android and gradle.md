useState like a construct function, if want value change, use useEffect set the value

wrapper里面的是
`distributionUrl=https\://services.gradle.org/distributions/gradle-4.6-	all.zip` gradle的版本
`classpath 'com.android.tools.build:gradle:3.2.1'` 是 gradle 的插件版本
```
Cause: org.jetbrains.plugins.gradle.tooling.util.ModuleComponentIdentifierImpl.getModuleIdentifier()

```
根本原因：
Gradle 5.0 不兼容 Android 3.2. 相信以后，还是会兼容的，实在不行还是老实的升级吧。