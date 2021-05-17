# Desing Pattern
- [Desing Pattern](#desing-pattern)
  - [creation](#creation)
    - [factory](#factory)
    - [singleton](#singleton)
  - [structure](#structure)
    - [decoration](#decoration)
  - [behavior](#behavior)
    - [strategy](#strategy)
    - [provider and consumer](#provider-and-consumer)
    - [chain of responsibility](#chain-of-responsibility)

## creation
### factory
### singleton

## structure
### decoration
redux 的 applyMiddleware is also decorator, because it returned a enhanced store.  
The basic idea of Decorator Design pattern is to augment (or) decorate the behavior of the underlying base component without the need to change/extend the base component.[Redux Middleware design pattern](https://vmayakumar.wordpress.com/2016/12/27/redux-middleware/)  

Decorator模式有什么好处？它实际上把核心功能和附加功能给分开了。核心功能指FileInputStream这些真正读数据的源头，附加功能指加缓冲、压缩、解密这些功能。如果我们要新增核心功能，就增加Component的子类，例如ByteInputStream。如果我们要增加附加功能，就增加Decorator的子类，例如CipherInputStream。两部分都可以独立地扩展，而具体如何附加功能，由调用方自由组合，从而极大地增强了灵活性。
[装饰器](https://www.liaoxuefeng.com/wiki/1252599548343744/1281319302594594)

## behavior
### strategy

reducers of redux is a nice case to interpret
strategy pattern. Instead of put kinds of algorithms in switch case, separate them apart is better
``` mermaid
classDiagram
Context o-- Strategy
Strategy <|-- ConcreteStrategyA
Strategy <|-- ConcreteStrategyB
Context: +algorithm(): void
Context: +setStrategy(Strategy): void
Strategy: +algorithm(): void
ConcreteStrategyA: +algorithm(): void
ConcreteStrategyB: +algorithm(): void
```
### provider and consumer
react's context api

### chain of responsibility

- middleware of express, koa

- 财务审批就是一个责任链模式。假设某个员工需要报销一笔费用，审核者可以分为：

Manager：只能审核1000元以下的报销；
Director：只能审核10000元以下的报销；
CEO：可以审核任意额度。

用责任链模式设计此报销流程时，每个审核者只关心自己责任范围内的请求，并且处理它。对于超出自己责任范围的，扔给下一个审核者处理，这样，将来继续添加审核者的时候，不用改动现有逻辑。
[责任链](https://www.liaoxuefeng.com/wiki/1252599548343744/1281319474561057)  