Objective-Objective-C是C语言的严格超集－－任何C语言程序不经修改就可以直接通过Objective-C编译器，在Objective-C中使用C语言代码也是完全合法的。Objective-C被描述为盖在C语言上的薄薄一层，因为Objective-C的原意就是在C语言主体上加入面向对象的特性。

|ext|describe|
|--|--|--|
|.h|头文件。头文件包含类，类型，函数和常数的声明。|
|.m|源代码文件。这是典型的源代码文件扩展名，可以包含 Objective-C 和 C 代码。|
|.mm|源代码文件。带有这种扩展名的源代码文件，除了可以包含Objective-C和C代码以外还可以包含C++代码。仅在你的Objective-C代码中确实需要使用C++类或者特性的时候才用这种扩展名。|

## 语法
Objective-C的面向对象语法源于Smalltalk消息传递风格。所有其他非面向对象的语法，包括变量类型，预处理器（preprocessing），流程控制，函数声明与调用皆与C语言完全一致。

```objective-c
@interface Circle:NSObject   //为Circle类定义接口；NSObject表示是父类。
{
//成员变量
 ShapeColor fillColor;
 ShapeRect bounds;
}
//以下是方法声明
//当方法的标识符为+是表示静态函数，-则为一般函数。
-(void) setFillColor: (ShapeColor) fillColor; //冒号前面的依次是方法标识符、返回值类型和方法名；冒号后面的内容依次为参数类型和参数名。
-(void) setBounds:(ShapeRect) bounds;
-(void) draw;
@end     //结束声明
```


```objective-c
//引入头文件
 #import <Foundation/Foundation.h>
 //定义继承自NSObject的Box类
@interface Box:NSObject
{
    double length;   
    double breadth;  
    double height;   
}
@property(nonatomic, readwrite) double height; // 属性
  -(double) volume; //类方法
@end //类定义结束

//类实现
@implementation Box
@synthesize height; //创建属性的访问器
  -(id)init
  {
    self = [super init];
    length = 1.0;
    breadth = 1.0;
    return self;
  }

  -(double) volume
  {
    return length*breadth*height;
  }
@end //类实现结束

//主函数
int main( )
{    
   Box *box1 = [[Box alloc]init];    
   Box *box2 = [[Box alloc]init];  //创建Box类对象并初始化
   double volume = 0.0;  
   // 对类的属性赋值
   box1.height = 5.0; 
   box2.height = 10.0;
   //box1
   volume = [box1 volume];
   NSLog(@"Volume of Box1 : %f", volume);
   // box2
   volume = [box2 volume];
   NSLog(@"Volume of Box2 : %f", volume);
   return 0;
}

```
方括号内第一项是对象，其余部分是你需要对象执行的操作；
在objective-c中通知对象执行某种操作，称为发送消息

refs: 
1. [difference with c++](https://www.runoob.com/w3cnote/objective-c-tutorial.html)
2. [basic course](https://www.yiibai.com/objective_c/objective_c_program_structure.html)