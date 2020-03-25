<template>
  <div>
    <footer class="footer">
      <!-- <div class="clearfix"></div> -->
      <div class="icon-row">
        <div class="footer-icon">
          <span class="footer-icon-text">品类齐全，轻松购物</span>
        </div>
        <div class="footer-icon">
          <span class="footer-icon-text">商家直发，极速配送</span>
        </div>
        <div class="footer-icon">
          <span class="footer-icon-text">正品行货，精致服务</span>
        </div>
        <div class="footer-icon">
          <span class="footer-icon-text">天天低价，畅选无忧</span>
        </div>
      </div>
      <div class="service-intro">
        <div class="friend-link">
          <div class="friend-link-item">
            <ul>
              <li v-for="(link, index) in moreLink" :key="index">
                <span :class="[linkItemClass, {'link-last-item': index === 9}]">{{link}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="copyright">
          <p>Copyright © 2020 by xiaosu &nbsp;<span>本项目仅供学习参考</span></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      linkItemClass: 'link-item',
      moreLink: [
        '关于我们', '联系我们', '联系客服', '合作招商', '商家帮助', '营销中心', '销售联盟', '校园社区', '风险监测', '隐私政策'
      ]
    };
  }
};
</script>

<style scoped>
/*****************************底 部 开 始*****************************/
.footer {
  width: 100%;
  height: 170px;
  margin-top: 30px;
}
.icon-row{
  margin-left: 11.3%;
}
.footer-icon {
  margin-left: 17px;
  margin-right: 17px;
  float: left;
}
.footer-icon-child {
  margin-top: 10px;
  overflow: hidden;
  position: absolute;
  width: 36px;
  height: 42px;
}
.footer-icon-text {
  margin-left: 45px;
  color: #444444;
  font-size: 18px;
  font-weight: bold;
  line-height: 64px;
}
.servece-type-info {
  color: #666666;
}
.friend-link {
  display: flex;
  align-items: center;
  width: 908px;
  height: 30px;
  margin: 0px auto;
  color: #666;
  border-top: 1px solid #b2dfdb;
}
.friend-link-item {
  margin: 0px auto;
}
.friend-link-item li {
  padding: 5px 0px;
  float: left;
}
.link-item {
  padding: 0px 8px;
  cursor: pointer;
  border-right: 1px solid #ccc;
}
.copyright {
  width: 100%;
  color: #666;
  line-height: 30px;
  text-align: center;
}
.copyright a{
  color: #232323;
  font-size: 20px;
}
</style>
