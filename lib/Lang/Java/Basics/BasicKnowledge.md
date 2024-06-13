# JAVA 基础知识

👉 [The Java Tutorials](https://docs.oracle.com/javase/tutorial/)

## Hello World

```java
public class HelloWorld { // 声明一个公共类
    public static void main(String[] args) { // main 方法是程序的入口点
        System.out.println("Hello, World!");
    }
}
```

这个简单的程序包含一个名为 `HelloWorld` 的类，其中有一个名为 `main` 的方法。在 Java 程序中，`main` 方法是程序的入口点。当你运行这个程序时，系统将首先查找 `main` 方法，并从那里开始执行。

解释一下代码的各个部分：

- `public class HelloWorld`: 定义了一个公共类，类名为 `HelloWorld`。**Java 程序的文件名应该与公共类的名字相同**，并以 `.java` 为文件扩展名。

- `public static void main(String[] args)`: 这是程序的主方法，是程序执行的起点。Java 程序总是从 `main` 方法开始执行。`public static void` 是方法的修饰符，表示这个方法是公共的、静态的，没有返回值。

- `System.out.println("Hello, World!");`: 这一行使用 `System.out.println` 方法在控制台输出文本 "Hello, World!"。`println` 表示输出并换行，将文本输出到控制台。

## JAVA 基本数据类型

Java 的基本数据类型，以及与 JavaScript 的对比：

1. **整数类型：**

   - Java: `byte`, `short`, `int`, `long`
   - JavaScript: `Number`类型表示所有数值，包括整数和浮点数

2. **浮点数类型：**

   - Java: `float`, `double`
   - JavaScript: `Number`类型，不区分整数和浮点数

3. **字符类型：**

   - Java: `char`, 用单引号表示（如 `'a'`）
   - JavaScript: JavaScript 中没有专门的字符类型，字符通常由单个字符的字符串表示（如 `'a'`）

4. **布尔类型：**

   - Java: `boolean`
   - JavaScript: `boolean`

5. **其他：**
   - Java: `String`（不是基本数据类型，但是非常常用,用双引号表示（如 `"Hello"`））
   - JavaScript: `String`

对比时需要注意的一些差异和注意事项：

- **变量声明：**

  - Java 中需要明确声明变量的类型，例如 `int x = 10;`。
  - JavaScript 中变量的类型由赋值决定，使用 `let x = 10;` 即可。

- **类型转换：**

  - 在 Java 中，进行不同类型之间的转换时需要显式地进行类型转换。
  - 在 JavaScript 中，由于是弱类型语言，可以更灵活地进行隐式类型转换。

- **null vs undefined：**

  - 在 Java 中，`null` 是一个特殊的引用类型，表示对象的引用缺失。
  - 在 JavaScript 中，`undefined` 表示变量声明但未赋值，而 `null` 表示空对象引用。

- **数组：**
  - Java 中数组是对象，需要明确定义数组的大小，并且数组元素类型必须一致。
  - JavaScript 中数组是动态的，可以容纳不同类型的元素，并且长度可以动态变化。

## 修饰符

Java 中的修饰符用于控制类、方法、变量等对象的**访问权限、可见性、作用域**等。

根据修饰符的功能，Java 中的修饰符可以分为以下两类：

- **访问控制修饰符**：用于控制**对象的访问权限**。
- **非访问控制修饰符**：用于控制**对象的其他属性，如可见性、作用域等**。

### **访问控制修饰符**

| 修饰符        | 可见性       |
| ------------- | ------------ |
| **private**   | 仅限当前类   |
| **protected** | 当前类和子类 |
| **public**    | 任何类       |

### **非访问控制修饰符**

- **abstract**：表示该类是抽象类，不能实例化。
- **static**：表示该成员是静态成员，属于类而不是对象。
- **final**：表示该成员是常量，不可修改。
- **transient**：表示该成员不会被序列化。
- **volatile**：表示该成员的值可能会在多个线程之间共享，需要使用同步机制来保证线程安全。
- **native**：表示该成员的实现由本地代码实现。

以下是一些常见的修饰符的使用示例：

```java
public class MyClass {

    private int a; // 仅限当前类可见

    protected int b; // 当前类和子类可见

    public int c; // 任何类可见

    public static void main(String[] args) {} // main必须包含public修饰符

    abstract void myMethod(); // 该类是抽象类，不能实例化

    static int myStaticField; // 该成员是静态成员，属于类而不是对象

    final int myFinalField = 10; // 该成员是常量，不可修改

    transient int myTransientField; // 该成员不会被序列化

    volatile int myVolatileField; // 该成员的值可能会在多个线程之间共享

    native void myNativeMethod(); // 该成员的实现由本地代码实现

}
```

在实际开发中，需要根据实际情况来选择合适的修饰符。

## 注解(Annotation)

注解是一种特殊的修饰符，它可以用于修饰类、方法、变量等对象。注解可以在编译时和运行时被读取，并执行相应的处理。

注解的语法格式如下：

```java
@注解名(参数名 = 参数值)
```

注解的参数可以是基本数据类型、字符串、枚举类型、注解类型、Class 类型以及以上类型的数组。

注解的参数可以有默认值，如果没有指定参数值，则使用默认值。

以下是一些常见的注解的使用示例：

```java
@Deprecated // 表示该方法已过时
public void myMethod() {}

@SuppressWarnings(value = "unchecked") // 表示忽略警告

@Override // 表示该方法是重写的父类方法

@Target(ElementType.TYPE) // 表示该注解只能用于类上

@Retention(RetentionPolicy.RUNTIME) // 表示该注解在运行时可见

public @interface MyAnnotation {} // 表示该注解是一个注解类型
```

`@Override` 用于告诉编译器，被注解的方法是重写（覆盖）父类中的一个方法。这个注解提供了一种机制，用于检查编译时是否真的覆盖了父类的方法。

在 Java 中，子类可以继承父类的方法，而有时子类可能会重写（覆盖）父类的某个方法。为了确保在子类中真的覆盖了父类中的方法，使用 `@Override` 注解可以让编译器进行检查，如果被注解的方法并没有覆盖父类中的方法，编译器将会产生一个编译错误。

例如：

```java
class Animal {
    void makeSound() {
        System.out.println("Some generic sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Bark");
    }
}
```

在上面的例子中，`Dog` 类继承自 `Animal` 类，并重写了 `makeSound` 方法。`@Override` 注解用于确保 `makeSound` 方法确实是在子类中覆盖了父类的方法。如果在 `Dog` 类中没有正确覆盖 `makeSound` 方法，编译器将会产生错误。

总而言之，`@Override` 注解是一种在代码中提供说明和安全检查的方式，用于确保子类正确地覆盖了父类中的方法。

## 面向对象

面向对象编程（OOP）是一种编程范式，Java 是一种支持面向对象编程的语言之一。在 Java 中，面向对象编程是通过类和对象来实现的。以下是 Java 中面向对象编程的一些重要概念：

1. **类（Class）**：

   - 类是 Java 中用来描述对象的模板。它定义了对象的属性（成员变量）和行为（方法）。
   - 类由属性和方法构成，属性用来描述对象的状态，方法用来描述对象的行为。
   - 类通过关键字 `class` 来声明。

2. **对象（Object）**：

   - 对象是类的实例。在 Java 中，通过关键字 `new` 来创建类的对象。
   - 对象具有状态和行为，状态由对象的属性表示，行为由对象的方法表示。

3. **封装（Encapsulation）**：

   - 封装是一种将数据和操作（方法）捆绑在一起的机制，它隐藏了对象的内部实现细节，只对外部提供公共接口。
   - 在 Java 中，封装通过访问控制修饰符（如 `private`、`public`、`protected`）来实现，以及提供 getter 和 setter 方法来控制属性的访问。

4. **继承（Inheritance）**：

   - 继承是一种在已有类的基础上创建新类的机制，新类可以继承已有类的属性和方法，并且可以添加自己的新属性和方法。
   - 继承可以减少代码的重复性，提高代码的复用性和可维护性。
   - 在 Java 中，通过 `extends` 关键字来实现继承。

5. **多态（Polymorphism）**：
   - 多态是指同一个方法调用在不同的对象上可以有不同的行为。在 Java 中，多态主要通过方法的重写（Override）和方法的重载（Overload）来实现。
   - 方法的重写是指子类可以重写父类的方法，以实现子类特有的行为。
   - 方法的重载是指在一个类中定义多个同名方法，但是参数列表不同，以实现同样的功能。

通过这些面向对象的概念，Java 提供了一种灵活且强大的编程方式，可以更好地组织和管理代码，提高代码的可读性、可维护性和可扩展性。

### 包

在 Java 中，包（Package）是一种用于组织和管理类和接口的机制。包提供了命名空间的概念，使得不同的类可以被组织到不同的包中，从而避免了命名冲突，并且提高了代码的可维护性和组织性。

以下是 Java 中包的一些重要概念和用法：

1. **命名空间（Namespace）**：

   - 包为 Java 类提供了一个命名空间，每个包都具有唯一的名称，以确保不同包中的类不会发生冲突。
   - 包名是层级结构的，通常使用域名的反转形式作为包名的起始部分，以确保全球唯一性，例如 `com.example.project`。

2. **包的声明**：

   - 在 Java 源代码文件的开头使用 `package` 关键字声明所属的包。例如：`package com.example.project;`
   - 如果没有指定包名，则类将属于默认包（unnamed package），但不建议在生产环境中使用默认包。

3. **包的目录结构**：

   - 包名的结构对应于文件系统中的目录结构。例如包 `com.example.project` 的类文件将位于目录 `com/example/project` 下。
   - 编译器根据类的包声明将类文件保存到相应的目录中。

4. **导入其他包**：

   - 使用 `import` 关键字来导入其他包中的类或接口，以便在当前类中使用它们。
   - 可以导入单个类或整个包。例如：`import com.example.otherpackage.OtherClass;` 或 `import com.example.otherpackage.*;`

5. **包的访问控制**：
   - 默认情况下，包中的类对其他包中的类不可见，除非它们被声明为 `public`，这样才能在其他包中访问。
   - 可以使用访问控制修饰符 `public`、`protected`、`private` 或者默认（没有修饰符）来控制类的可见性。

使用包可以将相关的类和接口组织起来，使得代码更易于管理和维护。此外，包还支持访问控制，可以控制类的可见性，从而实现信息隐藏和封装。在编写较大规模的 Java 应用程序时，良好的包结构是非常重要的。

### 类

#### java 中的类和 JavaScript 中的类有什么不同

Java 和 JavaScript 中的类有几个重要的不同之处，主要是由于两种语言的设计理念和用途不同：

1. **类型系统的不同**：

   - Java 是一种静态类型语言，意味着在编译时类型是已知的，并且变量的类型通常在声明时被确定。Java 中的类和对象必须严格遵循类型规定。
   - JavaScript 是一种动态类型语言，变量的类型在运行时才确定。JavaScript 中的类和对象的结构更加灵活，可以在运行时动态地添加或修改属性和方法。

2. **类的定义方式**：

   - 在 Java 中，类是通过关键字 `class` 来定义的，类中的属性和方法必须严格遵循语法规则，并且需要在编译时进行类型检查。
   - 在 JavaScript 中，类可以通过关键字 `class` 来定义，但也可以通过其他方式来创建对象，比如使用构造函数或者字面量对象。JavaScript 中的类和对象更加灵活，可以动态地添加或修改属性和方法。

3. **继承机制的不同**：

   - 在 Java 中，类的继承是通过关键字 `extends` 来实现的，一个子类可以继承父类的属性和方法，并且可以覆盖（override）父类的方法。
   - 在 JavaScript 中，类的继承是通过原型链来实现的，子类通过原型继承父类的属性和方法，同时也可以覆盖父类的方法。JavaScript 还支持更灵活的组合继承和原型继承方式。

4. **构造函数和初始化**：
   - 在 Java 中，类的构造函数用于初始化对象的状态，并且可以被重载。在实例化对象时，必须调用适当的构造函数。
   - 在 JavaScript 中，构造函数也用于初始化对象的状态，但是 JavaScript 中的构造函数更加灵活，可以像普通函数一样调用，并且对象的状态可以在任何时候动态地修改。

总的来说，Java 中的类更加严格和静态，适用于大型项目和团队开发，而 JavaScript 中的类更加灵活和动态，适用于快速原型开发和小型项目。

#### 创建一个类

在 Java 中，类是一种面向对象的编程模型，用于描述对象的属性和行为。类是对象的模板，可以用来创建对象。

类的定义语法如下：

```java
public class MyClass {
    // 属性
    int x = 5;

    // 方法
    void myMethod() {
        System.out.println("Hello, World!");
    }
}
```

在上面的例子中，`MyClass` 是一个类，包含一个整型属性 `x` 和一个方法 `myMethod`。

在 Java 中，类的属性和方法可以有不同的访问控制修饰符，用于控制属性和方法的访问权限。

#### 创建对象

在 Java 中，类是对象的模板，可以用来创建对象。对象是类的实例，可以使用 `new` 关键字来创建对象。

创建对象的语法如下：

```java
public class MyClass {
    int x = 5;

    public static void main(String[] args) {
        MyClass myObj = new MyClass(); // 创建对象
        System.out.println(myObj.x); // 访问对象的属性
    }
}
```

在上面的例子中，`MyClass` 是一个类，`myObj` 是 `MyClass` 类的一个对象。`new` 关键字用于创建对象，`myObj.x` 用于访问对象的属性。

### 构造方法

在 Java 中，构造方法（Constructor）是一种特殊类型的方法，用于在创建对象时初始化对象的状态。构造方法的名称必须与类名完全相同，并且没有返回类型（甚至不是 void 类型）。构造方法通常用于执行对象的初始化操作，例如设置对象的初始状态或初始化对象的成员变量。

以下是 Java 中构造方法的一些重要特点和用法：

1. **构造方法的命名**：
   - 构造方法的名称必须与类名完全相同，包括大小写。
   - 构造方法没有返回类型，甚至不是 void 类型。

```java
public class MyClass {
    // 构造方法的名称与类名相同
    public MyClass() {
        // 构造方法的内容
    }
}
```

2. **默认构造方法**：
   - 如果在类中没有明确声明任何构造方法，则编译器将自动生成一个默认的无参构造方法。
   - 默认构造方法不包含任何参数，并且只是执行空操作。

```java
public class MyClass {
    // 默认构造方法由编译器自动生成
}
```

3. **重载构造方法**：
   - 类可以有多个构造方法，可以根据参数列表的不同来进行重载。
   - 通过提供不同的构造方法重载，可以支持不同的对象初始化方式。

```java
public class MyClass {
    private int value;

    // 构造方法重载
    public MyClass() {
        this.value = 0;
    }

    public MyClass(int value) {
        this.value = value;
    }
}
```

4. **使用 `this` 关键字**：
   - 在构造方法内部，可以使用 `this` 关键字来调用同一个类的其他构造方法，实现代码的重用和简化。

```java
public class MyClass {
    private int value;

    public MyClass() {
        this(0); // 调用另一个构造方法
    }

    public MyClass(int value) {
        this.value = value;
    }
}
```

5. **构造方法的调用顺序**：
   - 在创建对象时，构造方法的调用顺序是由父类向子类依次执行的。首先调用父类的构造方法，然后再调用子类的构造方法。
   - 如果子类的构造方法没有显式调用父类的构造方法，则会默认调用父类的无参构造方法。

构造方法在 Java 中扮演着重要的角色，它们用于初始化对象的状态，并且支持重载和调用其他构造方法的机制，提供了灵活的对象初始化方式。

### 继承

在 Java 中，类的继承是指一个类可以基于另一个已存在的类来创建新类的机制。被继承的类称为父类（或超类、基类），继承的类称为子类（或派生类）。子类继承了父类的属性和方法，并且可以添加新的属性和方法，或者重写父类的方法。

以下是 Java 中类的继承的一些重要概念：

1. **继承关键字**：

   - 在 Java 中，使用关键字 `extends` 来实现继承关系。子类通过 `extends` 关键字来声明继承哪个父类。
   - 语法：`class Subclass extends Superclass { ... }`

2. **子类与父类关系**：

   - 子类继承了父类的属性和方法，可以直接访问父类的非私有成员（即 `public`、`protected` 和包内可见的成员）。
   - 子类可以在其内部定义新的属性和方法，也可以重写（覆盖）父类的方法。

3. **方法的重写（Override）**：

   - 子类可以在继承的基础上重新定义父类中已有的方法，称为方法的重写。子类中的重写方法必须具有相同的方法签名（方法名和参数列表）。
   - 通过 `@Override` 注解来标识一个方法是重写父类的方法，这样可以提高代码的可读性和可维护性。
   - 重写方法的访问修饰符不能比父类中被重写方法的访问修饰符更严格。

4. **super 关键字**：

   - 在子类中，可以使用 `super` 关键字来引用父类的属性和方法。
   - `super()` 用于调用父类的构造方法。在子类的构造方法中，可以通过 `super()` 调用父类的构造方法来执行父类的初始化操作。

5. **构造方法的继承**：
   - 子类会自动调用父类的无参构造方法（如果存在），如果父类没有无参构造方法，子类必须显式调用父类的其他构造方法。

通过继承，Java 提供了一种强大的代码复用机制，可以在不同的类之间共享通用的属性和方法，并且可以通过重写和扩展来实现子类的特定需求。但是需要谨慎使用继承，避免产生过度耦合和复杂的继承链。

### 静态

在 Java 中，关键字 `static` 用于声明类级别的成员，包括变量、方法和代码块。静态成员与特定的实例对象无关，它们属于类本身而不是类的实例。以下是 Java 中静态成员的主要特点和用法：

1. **静态变量（Static Variables）**：
   - 静态变量也称为类变量，它们与类相关联而不是与类的每个实例相关联。只有一个静态变量的副本，无论创建了多少个类的实例。
   - 静态变量使用 `static` 关键字进行声明。通常在类加载时就会初始化，并且可以通过类名来访问。
   - 静态变量通常用于表示类级别的常量或者在整个类的实例之间共享的数据。

```java
public class MyClass {
    static int count = 0;
    // 其他成员和方法...
}
```

2. **静态方法（Static Methods）**：
   - 静态方法属于类，而不是属于类的实例。它们可以直接通过类名调用，而无需创建类的实例。
   - 静态方法通常用于实现与类相关的功能，例如工具方法或工厂方法。
   - 静态方法不能直接访问非静态的成员变量和方法，因为它们没有与任何实例对象相关联。

```java
public class MyClass {
    static void printMessage() {
        System.out.println("Hello, world!");
    }
    // 其他成员和方法...
}
```

3. **静态代码块（Static Blocks）**：
   - 静态代码块是在类加载时执行的一段代码块，用于初始化静态变量或执行其他静态初始化操作。
   - 静态代码块使用 `static` 关键字和花括号 `{}` 包裹，没有方法名。
   - 静态代码块按照在类中的顺序执行，并且只会执行一次。

```java
public class MyClass {
    static {
        // 静态初始化代码
        // 可以初始化静态变量或者执行其他静态操作
    }
}
```

总的来说，静态成员在 Java 中提供了一种在类级别上共享信息的方式，它们与类相关联而不是与类的实例相关联，可以通过类名直接访问。使用静态成员可以提高代码的灵活性和可维护性，但是需要注意静态成员可能导致的一些潜在问题，例如线程安全性和内存泄漏。

### super、this 关键字

在 Java 中，`super` 和 `this` 都是关键字，用于引用对象和调用构造方法。它们的主要作用如下：

1. **super 关键字**：
   - `super` 关键字用于引用父类的成员变量、方法或者构造方法。
   - 在子类中，使用 `super` 关键字可以调用父类的构造方法、访问父类的成员变量和方法，以及调用父类中被子类覆盖的方法。
   - 在子类的构造方法中，如果没有显式调用 `super()` 来调用父类的构造方法，编译器会默认调用父类的无参构造方法。

```java
class Parent {
    int parentVariable;

    Parent(int value) {
        this.parentVariable = value;
    }

    void parentMethod() {
        System.out.println("Parent Method");
    }
}

class Child extends Parent {
    int childVariable;

    Child(int value1, int value2) {
        super(value1); // 调用父类的构造方法
        this.childVariable = value2;
    }

    void childMethod() {
        super.parentMethod(); // 调用父类的方法
        System.out.println("Child Method");
    }
}
```

2. **this 关键字**：
   - `this` 关键字用于引用当前对象，即正在执行代码的对象实例。
   - 在方法中，`this` 可以用于引用当前对象的成员变量和方法。
   - 在构造方法中，`this()` 用于调用同一个类中的其他构造方法，用于避免代码重复和实现构造方法的重载。

```java
class MyClass {
    int variable;

    MyClass(int value) {
        this.variable = value; // 使用 this 引用成员变量
    }

    void method() {
        System.out.println("Method");
    }

    void method(int value) {
        this.method(); // 调用当前对象的方法
    }
}
```

总的来说，`super` 和 `this` 关键字在 Java 中都是用于引用对象和调用构造方法的关键字，`super` 用于引用父类的成员和构造方法，而 `this` 用于引用当前对象的成员和构造方法。使用这两个关键字可以实现灵活的对象引用和构造方法调用。

### 多态

多态（Polymorphism）是面向对象编程中的一个重要概念，它允许不同类的对象对同一个消息做出响应，从而提高了代码的灵活性和可扩展性。在 Java 中，多态主要通过方法的重写（Override）和方法的重载（Overload）来实现。

1. **方法的重写（Override）**：
   - 方法的重写是指子类可以重新定义父类中已有的方法，以实现子类特定的行为。
   - 在子类中定义与父类相同的方法名、参数列表和返回类型，即可实现方法的重写。
   - 重写方法的访问修饰符不能比父类中被重写方法的访问修饰符更严格。
   - 在运行时，根据对象的实际类型决定调用哪个版本的重写方法。

```java
class Animal {
    void makeSound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Dog barks");
    }
}

class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("Cat meows");
    }
}

Animal dog = new Dog();
dog.makeSound(); // 输出 "Dog barks"

Animal cat = new Cat();
cat.makeSound(); // 输出 "Cat meows"
```

2. **方法的重载（Overload）**：
   - 方法的重载是指在同一个类中，可以定义多个方法，它们具有相同的名称但是参数列表不同的特征。
   - 方法的重载是在编译时确定调用哪个版本的方法，根据传递的参数类型和数量来决定。

```java
class Calculator {
    int add(int a, int b) {
        return a + b;
    }

    double add(double a, double b) {
        return a + b;
    }
}

Calculator calc = new Calculator();
System.out.println(calc.add(1, 2)); // 输出 3
System.out.println(calc.add(1.5, 2.5)); // 输出 4.0
```

多态是面向对象编程中的一个重要概念，它使得代码更灵活、可扩展，并且提高了代码的可读性。在 Java 中，通过方法的重写和重载实现了多态性，使得同一个方法名可以根据对象的实际类型调用不同的方法。

### 访问权限

在 Java 中，访问权限控制是通过访问修饰符（Access Modifiers）来实现的，它可以控制类、成员变量、方法和构造方法的可见性和访问权限。Java 中有四种访问修饰符，分别是：`public`、`protected`、`default`（默认，不使用修饰符）和 `private`。

1. **public**：
   - 使用 `public` 修饰的成员可以被任何类访问，无论它们是否在同一个包中。
   - `public` 成员可以被其他类的实例访问、调用和继承。

```java
public class MyClass {
    public int publicVariable;

    public void publicMethod() {
        // 方法实现
    }
}
```

2. **protected**：
   - 使用 `protected` 修饰的成员只能被同一个包中的类和该类的子类访问。
   - `protected` 成员可以在子类中被继承和访问，但是在其他包中的类无法访问。

```java
class MyClass {
    protected int protectedVariable;

    protected void protectedMethod() {
        // 方法实现
    }
}
```

3. **default（默认，不使用修饰符）**：
   - 默认访问权限（也称为包级访问权限）适用于同一个包中的类，没有使用任何访问修饰符的成员。
   - 没有使用任何访问修饰符的成员可以被同一个包中的其他类访问。

```java
class MyClass {
    int defaultVariable;

    void defaultMethod() {
        // 方法实现
    }
}
```

4. **private**：
   - 使用 `private` 修饰的成员只能在当前类中访问，无法被其他类直接访问。
   - `private` 成员不能被继承，也不能被其他类的实例访问和调用。

```java
public class MyClass {
    private int privateVariable;

    private void privateMethod() {
        // 方法实现
    }
}
```

使用访问权限修饰符可以帮助控制类的封装性和隐藏内部实现细节，提高代码的安全性和可维护性。合理使用访问权限可以有效地防止对程序的误操作和不良影响。

### 抽象

在 Java 中，抽象（Abstraction）是一种面向对象编程的概念，它允许你将类的设计从其具体实现中分离出来，使得类只提供必要的接口和行为，而不关心具体的实现细节。抽象是通过抽象类（Abstract Class）和接口（Interface）来实现的。

1. **抽象类（Abstract Class）**：
   - 抽象类是用 `abstract` 关键字声明的类，它不能被实例化，只能用作其他类的父类。
   - 抽象类可以包含抽象方法和非抽象方法。
   - 抽象方法是没有实现体的方法，只有方法签名，必须在子类中被重写。
   - 非抽象方法可以有实现体，子类可以选择是否重写这些方法。

```java
abstract class Shape {
    // 抽象方法
    abstract double area();

    // 非抽象方法
    void display() {
        System.out.println("This is a shape.");
    }
}
```

2. **接口（Interface）**：
   - 接口是一种抽象类型，它只包含抽象方法和常量（默认为 `public static final`）。
   - 接口定义了一组方法，但是不包含方法的实现。
   - 类通过 `implements` 关键字实现接口，并实现接口中的所有方法。
   - 类可以实现多个接口，从而实现多继承的效果。

```java
interface Animal {
    void eat();
    void sleep();
}

class Dog implements Animal {
    @Override
    public void eat() {
        System.out.println("Dog is eating.");
    }

    @Override
    public void sleep() {
        System.out.println("Dog is sleeping.");
    }
}
```

抽象类和接口都是用来实现抽象的概念，但它们有不同的使用场景和特点：

- 抽象类用于描述一种“是什么”的关系，通常用于描述类之间的继承关系，并且可以包含成员变量和非抽象方法。
- 接口用于描述一种“能做什么”的关系，通常用于描述类的行为规范，并且一个类可以实现多个接口。

通过抽象类和接口，Java 提供了一种强大的抽象机制，使得代码更加灵活和可扩展，同时也提高了代码的可读性和可维护性。

### 匿名类

在 Java 中，匿名类（Anonymous Class）是一种没有名称的内部类，它可以在声明的同时实例化并重写其父类或接口的方法。匿名类通常用于简单的临时实现或重写，并且可以在代码中直接使用，而不必显式地定义一个新的类。

以下是匿名类的一些重要特点和使用方法：

1. **语法**：
   - 匿名类的语法形式为：`new 父类名或接口名() { ... }`，其中 `{ ... }` 中包含类的定义和方法的重写。

```java
// 匿名类实现 Runnable 接口
Runnable runnable = new Runnable() {
    @Override
    public void run() {
        System.out.println("Anonymous class is running.");
    }
};
```

2. **应用场景**：
   - 匿名类通常用于创建临时的、一次性的对象，特别是在回调函数或事件处理中使用较多。
   - 匿名类常用于实现接口的单一方法，简化了代码的书写，避免了定义新的类。

```java
// 使用匿名类实现 ActionListener 接口
button.addActionListener(new ActionListener() {
    @Override
    public void actionPerformed(ActionEvent e) {
        System.out.println("Button clicked.");
    }
});
```

3. **访问外部变量**：
   - 匿名类可以访问外部的局部变量，但是这些变量必须声明为 `final` 或者是实际上是 `final` 的（Java 8 之后可以不加 `final` 关键字）。
   - 匿名类在访问外部变量时，会将这些变量隐式地复制为 final 局部变量。

```java
int x = 10;
Runnable runnable = new Runnable() {
    @Override
    public void run() {
        System.out.println("Value of x: " + x);
    }
};
```

匿名类提供了一种简洁而灵活的方式来创建临时的、一次性的对象，并且可以直接在代码中定义和使用，而无需显式地定义一个新的类。通过匿名类，可以更加方便地实现接口的单一方法或者对现有类进行简单的扩展和重写。

## 常用类

### Object 类

在 Java 中，`Object` 类是所有类的根类，即所有其他类都是直接或间接地继承自 `Object` 类。`Object` 类位于 `java.lang` 包中，因此在 Java 中无需显式导入就可以使用它。`Object` 类提供了一些通用的方法，可以被所有对象调用。

以下是 `Object` 类的一些常用方法：

1. **`toString()` 方法**：
   - `toString()` 方法返回对象的字符串表示形式。默认情况下，`toString()` 方法返回的是对象的类名，后跟 "@" 符号和对象的哈希码。

```java
public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
```

2. **`equals(Object obj)` 方法**：
   - `equals(Object obj)` 方法用于比较两个对象是否相等。默认情况下，`equals()` 方法比较的是对象的引用是否相等（即内存地址）。
   - 子类可以重写 `equals()` 方法以实现自定义的相等性比较逻辑。

```java
public boolean equals(Object obj) {
    return (this == obj);
}
```

3. **`hashCode()` 方法**：
   - `hashCode()` 方法返回对象的哈希码值。哈希码用于在哈希表等数据结构中快速定位对象。
   - 如果重写了 `equals()` 方法，通常也需要重写 `hashCode()` 方法，以保证对象相等时哈希码相等。

```java
public int hashCode() {
    return super.hashCode();
}
```

4. **`getClass()` 方法**：
   - `getClass()` 方法返回对象的运行时类（Runtime Class）。
   - 运行时类是在运行时确定的对象所属的类。

```java
public final Class<?> getClass() {
    return Class.forName();
}
```

5. **`clone()` 方法**：
   - `clone()` 方法用于创建并返回当前对象的一个副本（浅拷贝）。
   - 如果需要实现深拷贝，可以重写 `clone()` 方法，并在其中复制对象的所有成员变量。

```java
protected native Object clone() throws CloneNotSupportedException;
```

`Object` 类提供了一些基本的方法，是所有类的共同基础。在 Java 中，所有的类都继承自 `Object` 类，因此可以使用 `Object` 类中定义的这些通用方法。在实际的编程中，虽然很少直接使用 `Object` 类，但是它为所有类提供了一些基本的功能支持，是 Java 语言中非常重要的一部分。

### 数组

在 Java 中，数组是一种用来存储相同类型数据元素的数据结构，它是一种线性数据结构，具有固定大小。Java 中的数组具有以下特点：

1. **声明数组**：
   - 在 Java 中声明数组需要指定数组的类型和数组的名称，并可以选择指定数组的大小。
   - 可以使用以下两种方式声明数组：
     - `数据类型[] 数组名称;`
     - `数据类型 数组名称[];`

```java
int[] numbers; // 声明一个整型数组
double[] scores = new double[5]; // 声明一个包含 5 个 double 类型元素的数组
```

2. **初始化数组**：
   - 在声明数组的同时，可以选择对数组进行初始化，也可以在后续的代码中对数组进行初始化。
   - 可以使用大括号 `{}` 来指定数组的初始化值。

```java
int[] numbers = {1, 2, 3, 4, 5}; // 初始化一个整型数组
String[] names = new String[3]; // 初始化一个包含 3 个字符串类型元素的数组
names[0] = "Alice";
names[1] = "Bob";
names[2] = "Charlie";
```

3. **访问数组元素**：
   - 可以使用下标（索引）来访问数组中的元素，数组的下标从 0 开始，最大值为数组长度减一。
   - 可以使用 `数组名称[下标]` 的方式来访问数组元素。

```java
int[] numbers = {1, 2, 3, 4, 5};
System.out.println(numbers[0]); // 输出数组的第一个元素
```

4. **数组长度**：
   - 可以使用 `数组名称.length` 来获取数组的长度，即数组中元素的个数。
   - 数组的长度是固定的，一旦创建就不能改变。

```java
int[] numbers = {1, 2, 3, 4, 5};
System.out.println(numbers.length); // 输出数组的长度
```

5. **多维数组**：
   - Java 支持多维数组，即数组中的元素可以是数组，从而形成多维的数据结构。
   - 可以使用逗号分隔的多个方括号来声明和访问多维数组。

```java
int[][] matrix = new int[3][3]; // 声明一个二维整型数组
matrix[0][0] = 1;
```

数组是 Java 中非常常用的数据结构，它提供了一种方便的方式来存储和操作一组相同类型的数据。通过数组，可以更加高效地管理大量的数据，并且可以使用下标来快速访问数组中的元素。

### Sting 类

在 Java 中，`String` 类是一个用于表示字符串的类，它属于 `java.lang` 包。`String` 类是不可变的，即一旦创建了 `String` 对象，它的值就不能被修改。Java 中的字符串是一个对象，而不是基本数据类型。

以下是 `String` 类的一些重要特点和常用方法：

1. **创建字符串对象**：
   - 可以使用字符串字面值直接创建字符串对象。
   - 也可以使用 `new` 关键字来创建字符串对象。

```java
String str1 = "Hello, World!"; // 使用字符串字面值创建字符串对象
String str2 = new String("Hello, World!"); // 使用 new 关键字创建字符串对象
```

2. **字符串的不可变性**：
   - `String` 对象一旦创建后，其值就不能被修改。
   - 对字符串进行操作（如连接、截取、替换等），实际上是返回一个新的 `String` 对象，原来的字符串对象保持不变。

```java
String str = "Hello";
str += " World"; // 连接字符串，创建了一个新的字符串对象
```

3. **字符串的常用方法**：
   - `length()`：返回字符串的长度。
   - `charAt(int index)`：返回指定索引处的字符。
   - `substring(int beginIndex, int endIndex)`：返回指定范围内的子字符串。
   - `indexOf(String str)`：返回指定子字符串在原字符串中第一次出现的位置。
   - `equals(Object obj)`：比较两个字符串是否相等。
   - `toLowerCase()` / `toUpperCase()`：将字符串转换为小写 / 大写。
   - `split(String regex)`：根据给定的正则表达式分割字符串。

```java
String str = "Hello, World!";
System.out.println(str.length()); // 输出字符串的长度
System.out.println(str.charAt(0)); // 输出字符串的第一个字符
System.out.println(str.substring(0, 5)); // 输出子字符串 "Hello"
System.out.println(str.indexOf("World")); // 输出子字符串 "World" 在原字符串中的位置
```

4. **字符串的不可变性带来的优势**：
   - 字符串常量池：Java 中的字符串常量被保存在一个特殊的内存区域中，称为字符串常量池（String Pool）。相同的字符串常量在常量池中只会存在一份副本，这样可以节省内存空间。
   - 线程安全：由于字符串是不可变的，多个线程可以同时访问和操作字符串而不会发生冲突。

`String` 类在 Java 中是非常重要的，它提供了丰富的方法来操作字符串，并且由于其不可变性，使得字符串在多线程环境中更加安全，也更容易进行字符串常量的共享和优化。

### HashSet 类

在 Java 中，`HashSet` 是 `java.util` 包下的一个集合类，它实现了 `Set` 接口，用于存储一组唯一的元素。`HashSet` 基于哈希表实现，具有以下特点：

1. **不允许重复元素**：
   - `HashSet` 不允许存储重复的元素，即集合中的元素是唯一的。
   - 当尝试将重复的元素添加到 `HashSet` 中时，`HashSet` 会自动忽略重复元素。

```java
HashSet<String> set = new HashSet<>();
set.add("apple");
set.add("banana");
set.add("apple"); // 尝试添加重复元素，被自动忽略
System.out.println(set); // 输出: [banana, apple]
```

2. **无序集合**：
   - `HashSet` 中的元素是无序的，即不保证元素的顺序和插入的顺序一致。
   - 遍历 `HashSet` 得到的元素顺序可能会发生变化。

```java
HashSet<Integer> set = new HashSet<>();
set.add(2);
set.add(1);
set.add(3);
System.out.println(set); // 输出: [1, 2, 3] 或者 [3, 1, 2] 等不同顺序
```

3. **基于哈希表实现**：
   - `HashSet` 内部基于哈希表实现，因此插入、删除、查找元素的时间复杂度是 O(1)。
   - 在使用自定义类作为元素时，需要正确实现 `hashCode()` 和 `equals()` 方法，以保证元素的唯一性。

```java
class Person {
    String name;
    int age;

    // 构造方法、其他方法

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return age == person.age && Objects.equals(name, person.name);
    }
}
```

4. **性能优化**：
   - 由于 `HashSet` 内部是基于哈希表实现的，因此在大部分情况下，`HashSet` 具有较好的性能表现。
   - 在需要存储大量数据并且要求元素唯一性的情况下，`HashSet` 是一个常用的选择。

`HashSet` 在 Java 中是一个常用的集合类，用于存储一组唯一的元素。它提供了高效的插入、删除、查找操作，并且具有良好的性能和内存利用率。在使用自定义类作为元素时，需要注意正确实现 `hashCode()` 和 `equals()` 方法，以确保元素的唯一性和正确性。

### HashMap 类

在 Java 中，`HashMap` 是 `java.util` 包下的一个集合类，它实现了 `Map` 接口，用于存储键值对（key-value pair）。`HashMap` 基于哈希表实现，具有以下特点：

1. **键值对存储**：
   - `HashMap` 存储的是一组键值对，每个键值对包含一个键和一个值。
   - 键和值都可以是任意类型的对象。

```java
HashMap<String, Integer> map = new HashMap<>();
map.put("apple", 10);
map.put("banana", 20);
```

2. **键的唯一性**：
   - `HashMap` 中的键是唯一的，即同一个键只能对应一个值。
   - 如果尝试使用相同的键存储新值，则新值会覆盖原有键对应的值。

```java
HashMap<String, Integer> map = new HashMap<>();
map.put("apple", 10);
map.put("apple", 20); // 键 "apple" 对应的值被覆盖为 20
```

3. **无序集合**：
   - `HashMap` 中的键值对是无序存储的，即不保证键值对的顺序和插入的顺序一致。
   - 遍历 `HashMap` 得到的键值对顺序可能会发生变化。

```java
HashMap<String, Integer> map = new HashMap<>();
map.put("apple", 10);
map.put("banana", 20);
System.out.println(map); // 输出的顺序可能为 {banana=20, apple=10} 或者 {apple=10, banana=20} 等不同顺序
```

4. **基于哈希表实现**：
   - `HashMap` 内部基于哈希表实现，因此插入、删除、查找键值对的时间复杂度是 O(1)。
   - 在使用自定义类作为键时，需要正确实现 `hashCode()` 和 `equals()` 方法，以保证键的唯一性。

```java
class Person {
    String name;
    int age;

    // 构造方法、其他方法

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return age == person.age && Objects.equals(name, person.name);
    }
}
```

5. **性能优化**：
   - 由于 `HashMap` 内部是基于哈希表实现的，因此在大部分情况下，`HashMap` 具有较好的性能表现。
   - 在需要高效存储和查找键值对的情况下，`HashMap` 是一个常用的选择。

`HashMap` 在 Java 中是一个常用的集合类，用于存储一组键值对。它提供了高效的插入、删除、查找操作，并且具有良好的性能和内存利用率。在使用自定义类作为键时，需要注意正确实现 `hashCode()` 和 `equals()` 方法，以确保键的唯一性和正确性。
