<script setup lang="ts">
import BlogCard from "@/components/BlogCard.vue";
import { ref, watch } from "vue";
import type { Blog } from "@/types/Blog";
import { download } from "@/apis/datasource";

const props = defineProps<{
  sourceGetter?: Function;
  attached?: any;
}>();

const total = ref(0);
const blogs = ref<Blog[]>([]);

const isLoading = ref(true);

const pageSize = ref(10);
const page = ref(1);

function sync() {
  isLoading.value = true;
  const fn = props.sourceGetter || download;
  fn(pageSize.value, page.value - 1, props.attached).then((data: any) => {
    total.value = data.total;
    blogs.value = data.blogs;
    isLoading.value = false;
  });
}

watch([props, page], sync, { immediate: true });
</script>

<template>
  <el-skeleton v-if="isLoading" :rows="5" animated />

  <template v-else>
    <el-empty v-if="!total" description="空空如也" />

    <BlogCard
      v-for="b of blogs"
      :blog="b"
      :afterFn="{
        star: sync,
        del: sync,
      }"
      :key="b.id"
    />

    <el-pagination
      v-if="total > pageSize"
      class="pager"
      layout="prev, pager, next"
      :total="total"
      v-model:pageSize="pageSize"
      v-model:currentPage="page"
    />
  </template>
</template>

<style scoped>
.pager {
  justify-content: center;
}
</style>
