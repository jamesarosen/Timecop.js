## What ##

A port of John Trupiano's awesome
[Timecop](https://github.com/jtrupiano/timecop)
Ruby to Javascript.

## How ##

Travel to the morning of October 17, 2010, and allow time to continue advancing:

    Timecop.travel(new Date(2010, 10, 17, 11, 45));

Travel to the afternoon of January 21, 2012, and keep time frozen then:

    Timecop.freeze(new Date(2012, 1, 21, 14, 30))

Return to the present:

    Timecop.return();
