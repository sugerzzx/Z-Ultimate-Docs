# Flex

## flex

flex 是 flex-grow、flex-shrink 和 flex-basis 属性的简写。

- flex-grow 属性定义了弹性项目相对于其他弹性项目进行扩展的量。默认值为 0，表示不扩展。
- flex-shrink 属性定义了弹性项目的缩小比例。仅在宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。默认值为 1，表示完全缩小。
- flex-basis 属性定义了弹性项目在分配多余空间之前的大小。默认值为 auto，即项目本身的大小。

flex:1; 等价于 flex:1 1 0;即 flex-grow:1; flex-shrink:1; flex-basis:0;

## flex-grow

flex-grow 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。

如果所有项目的 flex-grow 属性都为 1，则它们将等分剩余空间（如果有的话）。如果一个项目的 flex-grow 属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍。

## flex-shrink

flex-shrink 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。

如果所有项目的 flex-shrink 属性都为 1，当空间不足时，都将等比例缩小。如果一个项目的 flex-shrink 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。

负值对该属性无效。

## flex-basis

flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。

浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。

它可以设为跟 width 或 height 属性一样的值（比如 350px），则项目将占据固定空间。

## flex:1,max-width:fit-content

flex:1; 会让元素自动填充剩余空间，但是如果元素内容过多，会撑开父元素，这时候可以使用 max-width:fit-content; 让元素自动收缩到内容宽度。
