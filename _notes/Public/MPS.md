---
title: MPS
feed: show
date: 05-11-2023
format: card
tags:
  - PA
  - M
---
矩阵乘积态（Matrix Product States ，简写MPS），[[张量网络]]中最著名和简单的一种，用于描述一维量子系统中量子态。与传统的[[波函数]]形式不同，矩阵乘积态将量子态表示为一系列[[矩阵]]（或[[张量]]）的乘积。更具体地说，是将一个高维[[张量]]分解为一系列低维[[张量]]的乘积，如图所示：

![[Pasted image 20231219154626.png]]

在这个分解过程中我们可以使用[[奇异值分解]]（Singular Value Decomposition，简写SVD）方法（还有其他的方式，例如QR分解）。但要注意，由于矩阵乘积态是由一系列[[矩阵]]的乘积组成，因此存在许多不同的分解可能性。当使用SVD来进行矩阵乘积态的分解时，从左到右、从右到左，以及同时从两边进行分解，这三种方式会得到不同的分解[[矩阵]]，但都能正确地表示原始的量子态。

#### 矩阵乘积态的高效性
以图中的系统为例，左侧为一个含有6个格点的系统，若每个格点有d个量子态（d也被称为物理维度），因此该系统的复杂度为$d\otimes d \otimes d\otimes d\otimes d\otimes d =\mathcal{O}(d^6)$（因此如果是一个含有N个格点的系统，其复杂度为$\mathcal{O}(d^N)$）。但是如果表示为图右侧的矩阵乘积态形式，则该系统的复杂度为$6 \chi \otimes d \otimes \chi = \mathcal{O}(6d\chi^2)$（如果是一个N格点系统，则为$\mathcal{O}(Nd\chi^2)$），其中$\chi$为键合维度（bond-dimension，也被称为虚拟维度），在图中表示为两个格点间的连线。因此对于复杂的量子系统，右侧的表示方式比左侧更加高效。

我们可以将量子态表示为一系列[[矩阵]]的乘积的形式是因为量子多体系统的[[局部性]]。虽然量子纠缠使得两个距离很远的粒子之间的状态也可以相互影响，但是在实际的物理系统中，粒子间的相互作用主要还是只发生在相邻的粒子间。也正是因为如此，我们才有可能在数学上将量子态的形式表达为MPS的形式。

和[[波函数]]形式相比，虽然MPS形式在数学上需要更多的步骤，但是却在物理结构上大大简化，这也为实现更快更高效的数值求解方法开辟了新的道路。

由于量子理论的发展以及量子计算机的发展，矩阵乘积态在逐渐迁移应用到其它学科，例如[[湍流]]。湍流系统和量子多体系统类似，在流场中直接使用向量表示[[湍流]]的状态虽然直接且简单，但是在数值计算量上则极为庞大，其计算量成指数级增长。但是如果将MPS方法从量子多体系统迁移过来表示湍流系统，通过舍弃哪些对整体流场理解不重要的尺度间的相关性对流场进行编码，那么其计算量的增长不再是指数级的而是多项式级的，这大大减少了计算量。

因此可以说使用MPS编码湍流流场实际上是一种数据压缩形式，它既能够减少存储和计算的需求，也保留了流场的关键信息。