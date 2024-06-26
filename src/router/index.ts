import { globalConfig } from "@/config";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "主页",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/search",
      name: "搜索",
      component: () => import("@/views/Search.vue"),
    },
    {
      path: "/editor",
      name: "编辑",
      component: () => import("@/views/Editor.vue"),
    },
    {
      path: "/stared",
      name: "收藏",
      component: () => import("@/views/Stared.vue"),
    },
    {
      path: "/msg",
      name: "信箱",
      component: () => import("@/views/MessageBox.vue"),
    },
    {
      path: "/me",
      name: "我的",
      component: () => import("@/views/Me.vue"),
    },
    {
      path: "/redirect",
      name: "重定向",
      component: () => import("@/views/Redirect.vue"),
    },
    {
      path: "/epsilon",
      name: "空白",
      component: () => import("@/views/Epsilon.vue"),
    },
    {
      path: "/:pathMatch(.+)",
      redirect: "/epsilon",
    },
  ],
});

router.afterEach(() => {
  const { zh, en } = globalConfig.name;
  document.title = `${zh} | ${en}`;
});

export default router;

export function goHome() {
  router.push("/");
}

export function refresh() {
  const { path } = router.currentRoute.value;
  router.push(`/redirect?to=${path}`);
}

export function getName(path?: string) {
  if (!path) path = router.currentRoute.value.path;
  const name = router.getRoutes().filter((r) => r.path == path)[0]?.name;
  if (!name) return "";
  return name.toString();
}

export function isMainView() {
  return ["/", "/stared", "/msg", "/me", "/redirect"].includes(
    router.currentRoute.value.path,
  );
}
