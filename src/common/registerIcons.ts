// registerIcons.ts
import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export function registerElementPlusIcons(app: App) {
  // 类型安全的图标注册
  Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
    app.component(key, component)
  })
}