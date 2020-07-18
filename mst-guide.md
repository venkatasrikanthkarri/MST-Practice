# Mobx State Tree

> ### Tutorials

- [You Don't Know Mobx State Tree](https://www.youtube.com/watch?v=LKyCJB27oNM)

- [Egghead Course](https://egghead.io/courses/manage-application-state-with-mobx-state-tree)
- [Mobx State Tree tutorial](https://www.youtube.com/playlist?list=PLucG_ap4Oxzj5TKvdOKc7W10NLMMg319A)

> ### Docs

- [Mobx State Tree Docs](https://mobx-state-tree.js.org/intro/philosophy)
- [State Management with MobX State Tree](https://medium.com/react-native-training/state-management-with-mobx-state-tree-373f9f2dc68a)
- [MobX-state-tree: A step by step guide for React Apps](https://medium.com/@ftangastani/mobx-state-tree-a-step-by-step-guide-for-react-apps-e65716a219d2)

## Why MST

MobX is fast, but doesn't provide any organizational structure out of the box, therefore centralized operations like taking snapshots of the whole state, restoring the state from the snapshot, auto synchronizing separated stores, time travel or hot reloading are either not possible or up to developer to support.

MST supports all of the above mentioned (and more) out of the box by organizing separate stores into a single tree of interactive and interacting nodes.

- [Why you should use MobX State Tree in your next React project](https://dev.to/lloyds-digital/why-you-should-use-mobx-state-tree-in-your-next-react-project-l3)

## Introduction

> ### Installation

- `NPM: npm install mobx mobx-state-tree --save`\
- `Yarn: yarn add mobx mobx-state-tree`

- https://mobx-state-tree.js.org/intro/installation

> ### Overview & Philosophy

mobx-state-tree is a state container that combines the simplicity and ease of mutable data with the traceability of immutable data and the reactiveness and performance of observable data.

Simply put, mobx-state-tree tries to combine the best features of both immutability (transactionality, traceability and composition) and mutability (discoverability, co-location and encapsulation) based approaches to state management; everything to provide the best developer experience possible. Unlike MobX itself, mobx-state-tree is very opinionated about how data should be structured and updated. This makes it possible to solve many common problems out of the box.

Central in MST (mobx-state-tree) is the concept of a living tree. The tree consists of mutable, but strictly protected objects enriched with runtime type information. In other words, each tree has a shape (type information) and state (data). From this living tree, immutable, structurally shared, snapshots are automatically generated.

- https://mobx-state-tree.js.org/intro/philosophy

## Basic Concepts

- https://mobx-state-tree.js.org/concepts/trees

> ### Types, models, trees & state

tree = type + state

Each node in the tree is described by two things: Its type (the shape of the thing) and its data (the state it is currently in).

The simplest tree possible:

```json
import { types } from "mobx-state-tree"

// declaring the shape of a node with the type `Todo`
const Todo = types.model({
    title: types.string
})

// creating a tree based on the "Todo" type, with initial data:
const coffeeTodo = Todo.create({
    title: "Get coffee"
})
```

The types.model type declaration is used to describe the shape of an object. Other built-in types include arrays, maps, primitives, etc. See the [types overview](https://mobx-state-tree.js.org/overview/types).

> ### Actions

By default, nodes can only be modified by one of their actions, or by actions higher up in the tree. Actions can be defined by returning an object from the action initializer function that was passed to actions. The initializer function is executed for each instance, so that self is always bound to the current instance. Also, the closure of that function can be used to store so called volatile state for the instance or to create private functions that can only be invoked from the actions, but not from the outside.

```
const Todo = types
    .model({
        title: types.string
    })
    .actions(self => {
        function setTitle(newTitle) {
            self.title = newTitle
        }

        return {
            setTitle
        }
    })

```

Shorter form if no local state or private functions are involved:

```
const Todo = types
    .model({
        title: types.string
    })
    .actions(self => ({
        // note the `({`, we are returning an object literal
        setTitle(newTitle) {
            self.title = newTitle
        }
    }))
```

- https://mobx-state-tree.js.org/concepts/actions

> ### Derived values

Any fact that can be derived from your state is called a "view" or "derivation". See the [Mobx concepts & principles](https://mobx.js.org/intro/concepts.html) for some background.

```json
import { autorun } from "mobx"

const UserStore = types
    .model({
        users: types.array(User)
    })
    .views(self => ({
        get numberOfChildren() {
            return self.users.filter(user => user.age < 18).length
        },
        numberOfPeopleOlderThan(age) {
            return self.users.filter(user => user.age > age).length
        }
    }))

const userStore = UserStore.create(/* */)

// Every time the userStore is updated in a relevant way, log messages will be printed
autorun(() => {
    console.log("There are now ", userStore.numberOfChildren, " children")
})
autorun(() => {
    console.log("There are now ", userStore.numberOfPeopleOlderThan(75), " pretty old people")
})
```

> ### Snapshots

Snapshots are the immutable serialization, in plain objects, of a tree at a specific point in time. Snapshots can be inspected through getSnapshot(node, applyPostProcess). Snapshots don't contain any type information and are stripped from all actions, etc., so they are perfectly suitable for transportation. Requesting a snapshot is cheap as MST always maintains a snapshot of each node in the background and uses structural sharing.

- https://mobx-state-tree.js.org/concepts/snapshots

> ### Identifiers and references

References and identifiers are a first-class concept in MST. This makes it possible to declare references and keep the data normalized in the background, while you interact with it in a denormalized manner.

- https://mobx-state-tree.js.org/concepts/references

> ### Asynchronous actions

- https://mobx-state-tree.js.org/concepts/async-actions

## Advanced Concepts

- https://mobx-state-tree.js.org/concepts/patches

- [Patches](https://mobx-state-tree.js.org/concepts/patches)
- [Listening to changes](https://mobx-state-tree.js.org/concepts/listeners)
- [Dependency Injection](https://mobx-state-tree.js.org/concepts/dependency-injection)
- [Middleware](https://mobx-state-tree.js.org/concepts/middleware)
- [Reconciliation](https://mobx-state-tree.js.org/concepts/reconciliation)
- [Volatile state](https://mobx-state-tree.js.org/concepts/volatiles)

## API Overview

- https://mobx-state-tree.js.org/overview/types

- [Types overview](https://mobx-state-tree.js.org/overview/types)
- [API Overview](https://mobx-state-tree.js.org/overview/api)
- [Lifecycle hooks overview](https://mobx-state-tree.js.org/overview/hooks)

## Tips

- https://mobx-state-tree.js.org/tips/resources
- [Talks & Blogs](https://mobx-state-tree.js.org/tips/resources)
- [Frequently Asked Questions](https://mobx-state-tree.js.org/tips/faq)
