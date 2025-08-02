<template>
    <div>
        <h3>该页面展示所有element-plus组件使用记录，<strong>注：全部无数据逻辑</strong></h3>
        
        <el-row>
            <el-button  >按钮</el-button>
            <el-button disabled type="primary">按钮</el-button>
            <el-button disabled type="success">按钮</el-button>
            <el-button type="info">按钮</el-button>
            <el-button type="warning">按钮</el-button>
            <el-button type="danger" size="small">按钮</el-button>
            <el-button type="info" size="large">按钮</el-button>
        </el-row>
        <el-row>
            <el-button plain>按钮</el-button>
            <el-button type="primary" plain>按钮</el-button>
            <el-button type="success" plain>按钮</el-button>
            <el-button type="info" plain>按钮</el-button>
            <el-button type="warning" plain>按钮</el-button>
            <el-button type="danger" plain>按钮</el-button>

        </el-row>
        <el-row>
            <el-button round>按钮</el-button>
            <el-button type="primary" round>按钮</el-button>
            <el-button type="success" round>按钮</el-button>
            <el-button type="info" round>按钮</el-button>
            <el-button type="warning" round>按钮</el-button>
            <el-button type="danger" round>按钮</el-button>
        </el-row>

        <el-row>
            <el-button icon="Search"  />
            <el-button type="primary" icon="Edit" circle />
            <el-button type="success" icon="Check" circle />
            <el-button type="info" icon="Message" circle />
            <el-button type="warning" icon="Star" circle />
            <el-button type="danger" icon="Delete" circle />
        </el-row>

        <el-row>
            <el-button :icon="Search" circle />
            <el-button type="primary" :icon="Edit" circle />
            <el-button type="success" :icon="Check" circle />
            <el-button type="info" :icon="Message" circle />
            <el-button type="warning" :icon="Star" circle />
            <el-button type="danger" :icon="Delete" circle />
        </el-row>

        <el-row>
            <el-button link>链接</el-button>
            <el-button link>文字</el-button>
            <el-button type="success" link>链接</el-button>
            <el-button disabled type="info" link>链接</el-button>
            <el-button type="warning" link>链接</el-button>
            <el-button type="danger" link>链接</el-button>
            <el-button type="primary" link>链接</el-button>
        </el-row>

        <el-row>
            <el-button-group>
                <el-button type="success">按钮</el-button>
                <el-button type="success">按钮</el-button>
            </el-button-group>
        </el-row>

        <el-row>
            <el-button loading>loading</el-button>
            <el-button type="primary" loading>loading</el-button>
            <el-button type="success" loading>loading</el-button>
        </el-row>

        <div>
                <Ten4 />
            </div>

        <One />

        <Two />
        <Three />

        <el-row><el-icon><Moon /></el-icon></el-row>

        <el-row><el-icon><Plus /></el-icon></el-row>

        <el-row :gutter="20">
            <el-col class="col1" :span="6">col列</el-col>
            <el-col class="col1" :span="6">col列</el-col>
            <el-col class="col1" :span="6">col列</el-col>
            <el-col class="col1" :span="6">col列</el-col>
        </el-row>

        <el-row>
            <el-col :tag="'p'" class="col1" :offset="6" :span="6">col列</el-col>
            <el-col class="col1" :offset="6" :span="6">col列</el-col>
        </el-row>

        <el-row :gutter="10">
            <el-col class="col1" :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
            >col列</el-col>
            <el-col class="col1" :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
            >col列</el-col>
            <el-col class="col1" :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
            >col列</el-col>
            <el-col class="col1" :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
            >col列</el-col>
        </el-row>

        <!-- <div>
            <el-link href="https://element-plus.org" disabled target="_blank">default</el-link>
            <el-link type="primary">primary</el-link>
            <el-link type="success">success</el-link>
            <el-link :underline="false" type="warning">warning</el-link>
            <el-link type="danger">danger</el-link>
            <el-link type="info">info</el-link>
        </div> -->

        <el-row>
            <el-text class="mx-1">Default</el-text>
            <el-text class="mx-1" type="primary">Primary</el-text>
            <el-text class="mx-1" type="success">Success</el-text>
            <el-text class="mx-1" type="info">Info</el-text>
            <el-text size="large" class="mx-1" type="warning">Warning</el-text>
            <el-text size="small" class="mx-1" type="danger">Danger</el-text>
        </el-row>
        

        <el-scrollbar height="200px">
            <p v-for="n in 100" :key="n">第{{n}}行</p>
        </el-scrollbar>

        <el-scrollbar>
            <div class="scrollbar-flex-content">
            <p v-for="item in 50" :key="item" class="scrollbar-demo-item">
                {{ item }}
            </p>
            </div>
        </el-scrollbar>

        <Four />

        <el-space wrap direction="horizontal">
            <el-card v-for="i in 3" :key="i" class="box-card" style="width: 250px">
            <template #header>
                <div class="card-header">
                <span>Card name</span>
                <el-button class="button" text>Operation button</el-button>
                </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">
                {{ 'List item ' + o }}
            </div>
            </el-card>
        </el-space>


            <Five />

            <el-card>
                <Six />
            </el-card>

            <el-card>
                <Seven />
            </el-card>

            <el-card>
                <Eight />
            </el-card>

            <el-card>
                <Nine />
            </el-card>

            <el-card>
                <Ten />
            </el-card>
            <el-card>
                <Ten1 />
            </el-card>

            <el-card>
                <Ten2 />
            </el-card>

            <div>
                <Ten3 />
            </div>
           

    </div>
</template>
<script setup lang="ts">
import One from '@/components/el-origin/One.vue'
import Two from '@/components/el-origin/Two.vue';
import Three from '@/components/el-origin/Three.vue';
import Four from '@/components/el-origin/Four.vue'
import Five from '@/components/el-origin/Five.vue'
import Six from '@/components/el-origin/Six.vue';
import Seven from '@/components/el-origin/Seven.vue';
import Eight from  '@/components/el-origin/Eight.vue'
import Nine from "@/components/el-origin/Nine.vue"
import Ten from '@/components//el-origin/Ten.vue';
import Ten1 from '@/components//el-origin/Ten1.vue';
import Ten2 from '@/components//el-origin/Ten2.vue';
import Ten3 from '@/components//el-origin/Ten3.vue';
import Ten4 from '@/components//el-origin/Ten4.vue';
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'

 



</script>
<style lang="scss" scoped>
.col1{
    background-color:#dab6b6;
    border:1px solid #ddd;
}

.scrollbar-flex-content {
  display: flex;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
</style>