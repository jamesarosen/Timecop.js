## What ##

A port of John Trupiano's awesome
[Timecop](https://github.com/travisjeffery/timecop)
Ruby to Javascript.

## How ##

Call `Timecop.install()` once to get started. This replaces `Date` with
`Timecop.MockDate`. After that, you can travel through time at will.

Travel to the morning of October 17, 2010, and allow time to continue advancing:

``` javascript
Timecop.travel(new Date(2010, 10, 17, 11, 45));
```

Travel to the afternoon of January 21, 2012, and keep time frozen then:

``` javascript
Timecop.freeze(new Date(2012, 1, 21, 14, 30));
```

Return to the present:

``` javascript
Timecop.returnToPresent();
```

Finally, to uninstall Timecop and reinstate the native Date constructor:

``` javascript
Timecop.uninstall();
```

## Contributing ##

See [Contributing.md](./Contributing.md).
