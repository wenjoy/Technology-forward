# Desing Pattern

## creation
### factory
### singleton

## structure
### decoration

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

## 生产者消费者 
### react 的 context