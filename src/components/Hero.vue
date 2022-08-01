<template>
<section class="landing bg-tertiary text-white relative">
  
</section>
</template>

<script setup>

</script>

<style scoped>
.landing {
  height:calc(100vh - 100px);
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  padding-bottom: 4vmin;
  width: 100%;
}

.title {
  grid-column: 1/-1;
  grid-row: 1;
  font-family: "Prata", serif;
  width: 100%;
  z-index: 2;
}
.title > .title-inner {
  display: inline-block;
}

@-webkit-keyframes text-clip {
  from {
    clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  }
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}

@keyframes text-clip {
  from {
    clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  }
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}
@-webkit-keyframes outer-left {
  from {
    transform: translateX(50%);
  }
  to {
    transform: none;
  }
}
@keyframes outer-left {
  from {
    transform: translateX(50%);
  }
  to {
    transform: none;
  }
}
@-webkit-keyframes inner-left {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: none;
  }
}
@keyframes inner-left {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: none;
  }
}
.cafe,
.mozart {
  animation: outer-left 1s 1s cubic-bezier(0.5, 0, 0.1, 1) both;
}

.title-inner {
  display: inline-block;
  animation: inner-left 1s 1s ease both;
}

.cafe-inner {
  display: inline-block;
  animation: inner-left 1s 1s ease both, text-clip 1s 0s cubic-bezier(0.5, 0, 0.1, 1) both;
}

.mozart-inner {
  animation: text-clip 1s 0s cubic-bezier(0.5, 0, 0.1, 1) both;
}

.title {
  animation: outer-left 1s 1s ease both;
}

.cafe > .cafe-inner {
  display: inline-block;
}

.mozart {
  display: inline-block;
}

.image {
  grid-row: 1;
  grid-column: 2;
  margin-left: -2rem;
  opacity: 0.7;
  animation: image-in 1s cubic-bezier(0.5, 0, 0.1, 1) 2s backwards;
}
@-webkit-keyframes image-in {
  from {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}
@keyframes image-in {
  from {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}
.image {
  @apply absolute left-[20%] right-0 top-0 bottom-0
}
.image img {
  @apply object-cover;
  display: block;
  width: 100%;
  height: 100%;
}
</style>