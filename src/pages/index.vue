<template>
  <!--  <div>-->
  <!--    &lt;!&ndash;    <h1>首页</h1>&ndash;&gt;-->

  <!--    <VCarousel :cycle="true"-->
  <!--               interval="3000"-->
  <!--               :show-arrows="false"-->
  <!--               :hide-delimiters="true">-->
  <!--      <VCarouselItem v-for="i in 3"-->
  <!--                     :key="i"-->
  <!--                     style="height: 60vh">-->
  <!--        <h1 class="mx-auto text-center primary-color"-->
  <!--            :style="{-->
  <!--        fontFamily: '方正卡通简体, serif',-->
  <!--        fontSize: '3rem',-->
  <!--        userSelect: 'none'}">-->
  <!--          电子鼻实验平台 轮播图{{ i }}-->
  <!--        </h1>-->
  <!--      </VCarouselItem>-->
  <!--    </VCarousel>-->
  <!--    <div style="height: 30vh">项目简介-->
  <!--      <br>-->
  <!--      根据国际糖尿病联盟（IDF）发布的数据显示，截至2021年，全球约有5.4亿的糖尿病患者（20-79岁）。中国糖尿病患者人数达1.41亿人，发病率高达12.8％，相当于每10个人里就有1个糖尿病患者。-->
  <!--      <br>-->
  <!--      目前，常规的糖尿病的临床诊断及监控主要依靠血样的血糖测定，该方法对于贫血、晕血的患者是糟糕的体验，且不便于糖尿病的持续监测。-->
  <!--      <br>-->
  <!--      由于健康人和糖尿病患者呼出气体成分和含量有差异，因此新兴的无创检测手段———呼气分析，为糖尿病的诊断与生理代谢监控开辟了新途径。-->
  <!--    </div>-->
  <!--  </div>-->
  <div class="img1" :class="{dark: theme.name === 'dark'}"></div>
  <div class="img2" :class="{dark: theme.name === 'dark'}">
    <VCarousel :cycle="true"
               interval="5000"
               :show-arrows="false"
               :hide-delimiters="true"
               :class="{dark: theme.name === 'dark'}">
      <VCarouselItem>
        <div>
          <VRow>
            <div class="mx-auto mt-5" style="width: 1200px;font-size:1.5rem">
              <p>根据国际糖尿病联盟（IDF）发布的数据显示，截至2021年，全球约有5.4亿的糖尿病患者（20-79岁）。
                中国糖尿病患者人数达1.41亿人，发病率高达12.8％，相当于每10个人里就有1个糖尿病患者。</p>
            </div>
          </VRow>
          <VRow>
            <VCol>
              <VImg src="homepage/1.png" class="float-right" :width="700"></VImg>
            </VCol>
            <VCol>
              <VImg src="homepage/2.png" class="float-left" :width="700" style="background: white"></VImg>
              <!--            #e6e6e3-->
            </VCol>
          </VRow>
        </div>
      </VCarouselItem>
      <VCarouselItem>
        <div>
          <VRow>
            <VCol class="d-flex align-center justify-end" style="height: 400px;">
              <div style="width: 500px;font-size: 2rem">
                <p>目前，常规的糖尿病的临床诊断及监控主要依靠血样的血糖测定，
                  该方法对于贫血、晕血的患者是糟糕的体验，且不便于糖尿病的持续监测。</p>
              </div>
            </VCol>
            <VCol>
              <VImg src="homepage/3.png" :width="700"></VImg>
            </VCol>
          </VRow>
        </div>
      </VCarouselItem>
      <VCarouselItem>
        <div>
          <VRow>
            <VCol>
              <VImg src="homepage/4.png" :width="700" class="float-right"></VImg>
            </VCol>
            <VCol class="d-flex align-center" style="height: 500px;">
              <div style="width: 500px;font-size: 2rem">
                <p>由于健康人和糖尿病患者呼出气体成分和含量有差异，因此新兴的无创检测手段———呼气分析，
                  为糖尿病的诊断与生理代谢监控开辟了新途径。</p>
              </div>
            </VCol>
          </VRow>
        </div>
      </VCarouselItem>
    </VCarousel>
  </div>
  <!--  <div class="img3" :class="{dark: theme.name === 'dark'}"></div>-->
</template>
<script setup>
import {useTheme} from "@/store/modules/theme";

const theme = useTheme()
</script>

<style lang="scss" scoped>
.img1 {
  height: 100vh;
  background-image: url('homepage/bg1.png');
  background-size: cover;
}

.img2 {
  height: 100vh;
  background-image: url('homepage/bg2.png');
  background-size: cover;
}

.img3 {
  height: 100vh;
  background-image: url('homepage/bg3.png');
  background-size: cover;
}

p {
  text-indent: 2em;
}
</style>

<!--@formatter:off-->
<route lang="json5">
{
  meta: {
    layout: 'main',
    requireLogin: true,
    allowGuest: true,
  }
}
</route>

