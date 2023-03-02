<template>
  <!-- <div>企业文化</div> -->
  <div class="eci-main-content">
    <div v-if="cliWidth > 768">
      <img
        src="../../../assets/imgs/pc/about/culture.jpg"
        class="top-big-img"
      />
    </div>
    <div v-else>
      <img
        src="../../../assets/imgs/phone/about/culture.jpg"
        class="top-big-img"
      />
    </div>

    <div class="grab-font-content">
      <div class="home-title-six"><div>企业文化</div></div>

      <div class="culture-img">
        <img src="../../../assets/imgs/common/culture/img01.png" />
      </div>
      <div class="first-title">愿景 Vision</div>
      <div class="line"></div>
      <div class="content">
        我们将成为所有新老客户最有价值的商业合作伙伴，成为一流的CAT经销商，一个高度敬业的团队，提供最佳的营销和运营业绩，服务增长和财务业绩，使ECI-METRO处于CAT全球前四分之一领先水平。
      </div>

      <div class="culture-img">
        <img src="../../../assets/imgs/common/culture/img02.png" />
      </div>
      <div class="first-title">使命 Mission</div>
      <div class="line"></div>
      <div class="title">客户为本</div>
      <div class="content">
        <p>
          • 通过为客户提供合适和最具竞争力的产品和解决方案，实现无与伦比的价值
        </p>
        <p>
          • 提供差异化服务；以最佳的回应，提供最具竞争力的成本和最佳的分销渠道
        </p>
      </div>
      <div class="title">人才与文化</div>
      <div class="content">
        <p>
          •
          有效的人才管理系统和流程，为我们的员工提供有效的成长和发展计划，与公司的继任者计划和流程保持一致
        </p>
        <p>• 重新设计和优化360工具，以支持员工的成长和发展</p>
        <p>• 有意义的人员绩效考核体系，使有效的薪酬与业务绩效保持一致</p>
      </div>
      <div class="title">流程与系统</div>
      <div class="content">
        <p>
          •
          数字化提供了更大的灵活性和效率，允许更准确的决策并驱动创新，以支持业务增长
        </p>
        <p>
          •
          精益高效的组织专注于优化资源，通过团队合作和协作实现速度和最大价值创造的流水线流程
        </p>
      </div>
      <div class="title">股东价值</div>
      <div class="content">• 使股东的投资价值最大化</div>

      <div class="culture-img">
        <img src="../../../assets/imgs/common/culture/img03.png" />
      </div>
      <div class="first-title">价值观 Core Values</div>
      <div class="line"></div>
      <div class="title">安全</div>
      <div class="content">
        我们对安全绝不妥协，每个人都要对自己、对身边的人、对我们的客户的安全负责
      </div>
      <div class="title">正直</div>
      <div class="content">我们对工作的伙伴和服务的客户是诚实和值得信赖的</div>
      <div class="title">承诺和责任</div>
      <div class="content">我们每个人都对自己的言行、行为和结果负责</div>
      <div class="title">创新</div>
      <div class="content">我们拥抱变化,并不断寻求新的改进方法</div>
      <div class="title">团队合作</div>
      <div class="content">
        我们互相帮助以获得成功。我们是一个团队，分享我们独特的才能来帮助我们的工作伙伴和我们服务的客户
      </div>
    </div>

    <div class="grab-nav" v-if="cliWidth < 768">
      <Header :isShow="'otherPage'"></Header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import Header from "@/layouts/header/index.vue";

const cliWidth = ref(document.documentElement.clientWidth);
onMounted(() => {
  window.onresize = () => {
    cliWidth.value = document.documentElement.clientWidth;
  };
});
</script>

<style scoped lang="scss">
.home-title-six {
  background: url("../../../assets/imgs/pc/common/titleBack2.png") no-repeat;
  background-size: 100% 100%;
}

.culture-img {
  img {
    width: 100%;
    height: auto;
  }
}

@media screen and (min-width: 1200px) {
  .home-title-six {
    margin-top: 60px;
    margin-bottom: 15px;

    div {
      padding: 10px 5px 14px 10px;
    }
  }

  .culture-img {
    margin-top: 50px;
  }

  .first-title {
    margin-top: 30px;
    font-size: 22px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #1a1a1a;
  }

  .title {
    margin-top: 40px;
    font-size: 20px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #1a1a1a;
  }

  .content {
    margin-top: 18px;
    font-size: 16px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #595959;
    line-height: 32px;
  }
}

@media screen and (min-width: 768px) and (max-width: 1199px) {
  .home-title-six {
    margin-top: 40px;
    margin-bottom: 15px;

    div {
      padding: 10px 5px 14px 10px;
    }
  }

  .culture-img {
    margin-top: 30px;
  }

  .first-title {
    margin-top: 20px;
    font-size: 22px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #1a1a1a;
  }

  .title {
    margin-top: 25px;
    font-size: 20px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #1a1a1a;
  }

  .content {
    margin-top: 10px;
    font-size: 16px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #595959;
    line-height: 32px;
  }
}

@media screen and (max-width: 767px) {
  .home-title-six {
    margin-top: 20px;

    div {
      padding: 6px 3px 9px 5px;
    }
  }

  .culture-img {
    margin-top: 26px;
  }

  .first-title {
    margin-top: 10px;
    font-size: 16px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #1a1a1a;
  }

  .line {
    width: 30px;
    height: 3px;
    margin-top: 8px;
    background-color: #f5c71b;
  }

  .title {
    margin-top: 16px;
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: bold;
    color: #1a1a1a;
  }

  .content {
    margin-top: 6px;
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #595959;
    line-height: 25px;
  }
}
</style>
