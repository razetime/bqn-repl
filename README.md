# bqn-repl
Barebones BQN repl using the [Embeddable JS implementation.](https://mlochbaum.github.io/BQN/doc/embed.html). If you'd like a more streamlined environment, the [official site](https://mlochbaum.github.io/BQN/try.html) is better.

Due to technical limitations, assignment related statements are recomputed on every execution. Multiline definitions are not supported, so `⋄` and `,` must be used as statement separators.