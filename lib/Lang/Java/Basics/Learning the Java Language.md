# Learning the Java Language

👉 [Trail: Learning the Java Language](https://docs.oracle.com/javase/tutorial/java/index.html)

## Interfaces and Inheritance

### Interfaces

从广义上理解，接口描述了某样事物如何与外界交互，就像一种说明书，通过调用说明书的某种方法，便可以操纵这件事物，从编程中的类，到应用平台，再到操作系统和计算机，以及生活中的一些物体，都可以看做是拥有(_实现了_)接口的事物。

#### Interfaces in Java

在 Java 编程语言中，一个接口是一个引用类型，类似于类，他只能包含常量，方法签名，default 方法，static 方法，嵌套类型。方法体只能在 default 方法和 static 方法中出现。接口不可以被实例化，他们只能被类所实现或者被其他接口扩展。

#### Defining an Interface

一个接口声明包含修饰符，关键字 interface，接口名，一个由逗号分隔的继承列表（如果有的话），以及接口体。

```java
public interface GroupedInterface extends Interface1, Interface2, Interface3 {

    // constant declarations

    // base of natural logarithms
    double E = 2.718282;

    // method signatures
    void doSomething (int i, double x);
    int doSomethingElse(String s);
}
```

接口可以像类继承别的类一样继承别的接口，但是一个类只能继承一个类，但是一个接口可以继承多个接口。

#### The Interface Body

接口体可以包含抽象方法，默认方法和静态方法。一个抽象方法是一个仅有方法签名而没有对应实现的方法。默认方法使用 `default` 修饰符定义，静态方法使用 `static` 关键字定义。所有的抽象方法，默认方法和静态方法都隐式的是 `public` 的。
