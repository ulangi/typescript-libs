# assert

This library is used with TypeScript support in production code where you want to reduce/infer type of certain variables.

Here is one good example:

```typescript
type User = { userId: string }

// Assume that we have getUser() that returns either null or an User object
funtion getUser(): null | User {
}

// When we know that getUser() will certainly not return null beyond this point,
// use assertExists to reduce the type to User.
const { userId } = assertExists(getUser())
```

### API:
| Method | Explanation |
| --- | --- |
| ```assertExists```| Assert that variable should not be neither null nor undefined.
| ```assertType```| Assert the type of variable using a typeguard function.
| ```assertRequired```| Assert variable to follow a certain Joi schema whose properties are required unless stated otherwise. 
| ```assertOptional```| Assert variable to follow a certain Joi schema whose properties are optional unless stated otherwise.

